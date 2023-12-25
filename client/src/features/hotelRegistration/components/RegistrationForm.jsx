import { Formik } from "formik";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Textarea } from "@material-tailwind/react";
import { Form, Field } from "formik";
import * as Yup from "yup";
import KErrorMessage from "../../../components/form/ErrorMessage";
import useEventCallback from "use-event-callback";
import { useEffect, useRef, useState } from "react";
import { useRegisterHotelMutation } from "../services/hotelRegApiSlice";
import axios from "axios";
import { BASE_URL, IMAGE_BASE_URL } from "../../../data/constants";
import { useSelector } from "react-redux";
import { selectToken } from "../../authentication/services/loginSlice";

import {
  selectHotelName,
  selectDescription,
  selectImages,
  selectLocation,
  updateDescription,
  updateHotelName,
  updateImage,
  updateLocation,
} from "../services/EditHotelFormSlice";
import useGetHotel from "../hooks/useGetHotel";
import { useParams } from "react-router-dom";

const RegistrationForm = ({ isEditForm }) => {
  const {hotel_id}=useParams()
  const select = useSelector(selectToken);
  const initialHotelName=useSelector(selectHotelName)
  const initialLocation=useSelector(selectLocation)
  const initialDescription=useSelector(selectDescription)
  const initialImages=useSelector(selectImages)
  const hotelImages=useGetHotel(hotel_id)

  
  

  const [registerHotel, { isError, isLoading, isSuccess }] =
    useRegisterHotelMutation();
  const _onSave = async (values) => {
    try {
      const { hotelName, location, description, images } = values;

      const formData = new FormData();
      formData.append("hotelName", hotelName);
      formData.append("location", location);
      formData.append("description", description);

      for (var i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const response = await isEditForm?registerHotel(formData):edit;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Formik
      initialValues={{
        hotelName: !isEditForm ? "" : initialHotelName,
        location: !isEditForm ? "" : initialLocation,
        description: !isEditForm ? "" : initialDescription,
        images: isEditForm ? [] : initialImages,
      }}
      validationSchema={Yup.object().shape({
        hotelName: Yup.string()
          .min(8, "username is too short - should be 6 chars minimum")
          .required(),
        location: Yup.string().min(4, "location is required").required(),
        description: Yup.string()
          .min(30, "description should contain atleast 30 characters")
          .max(300, "maximum characters allowed exceeded")
          .required(),
        images: Yup.mixed(),
      })}
      onSubmit={(values) => _onSave(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form
          onSubmit={handleSubmit}
          className={`grid grid-rows-[80px,80px,80px,80px,80px,${isEditForm && '80px'}] grid-cols-[30%,30%] gap-4 border-2 place-content-center  border-black w-full h-[100vh]`}
          action=""
        >

          <div className="row-span-1 col-span-2">
          <h1 className="text-center text-2xl">
            {!isEditForm ? "Hotel Registration" : "Edit Hotel Details"}
          </h1>
          </div>

          <div className=" row-span-1 col-span-2 md:col-span-1 ">
            <FormInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.hotelName}
              error={errors.hotelName && touched.hotelName && errors.hotelName}
              success={!errors.hotelName && touched.hotelName ? true : false}
              type={"text-area"}
              name="hotelName"
              label={"Hotel Name"}
            />
            {/* <KErrorMessage name={'hotelName'}/> */}

          </div>

          <div className="md:col-span-1 col-span-2 border">
          <FormInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.location}
              error={errors.location && touched.location && errors.location}
              success={!errors.location && touched.location ? true : false}
              width={"lg"}
              name="location"
              label="Location"
            />
          </div>
          <div className='row-span-2 col-span-2'>
            <Textarea
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={
                errors.description && touched.description && errors.description
              }
              success={
                !errors.description && touched.description ? true : false
              }
              label="description"
              name="description"
            ></Textarea>
            {/* <FormInput /> */}
          </div>
        { isEditForm===true &&  <div className="row-span-1 col-span-2 ">
              <div className="flex w-[150px]  gap-5 ">
                {
                  hotelImages.map((img)=>{
                    return <img className="w-fit h-fit" key={img} src={IMAGE_BASE_URL+img}/>
                  })
                }
              </div>
          </div>
        }
          <div className="row-span-1 col-span-2 ">
            <FormInput
              onChange={(event) => {
                setFieldValue("images", event.target.files);
              }}
              // onBlur={handleBlur}
              // value={values.images}
              // error={errors.images && touched.images && errors.images}
              // success={!errors.images && touched.images ? true : false}
              type={"file"}
              multiple
              accept=".jpg, .jpeg, .png"
              label="images"
              name="images"
            />
          </div>
          <div className="row-span-1 col-span-2">
            <ButtonDefault bg={"blue"} type={"submit"} loading={isLoading?true:false} value={"submit"} fullwidth/>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
