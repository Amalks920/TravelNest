import { Formik } from "formik";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Textarea } from "@material-tailwind/react";
import { Form, Field } from "formik";
import * as Yup from 'yup'
import KErrorMessage from "../../../components/form/ErrorMessage";
import useEventCallback from "use-event-callback";
import { useEffect, useRef } from "react";
import { useRegisterHotelMutation } from "../services/hotelRegApiSlice";
import axios from "axios";
import { BASE_URL } from "../../../data/constants";

const RegistrationForm = () => {


    const [registerHotel, { isError, isLoading, isSuccess }] = useRegisterHotelMutation()

    const _onSave = async (values) => {
        try {
            const {hotelName,location,description,images}=values

           const formData=new FormData()
            formData.append('hotelName',hotelName)
            formData.append('location',location)
            formData.append('description',description)

            for(var i=0;i<images.length;i++){
                formData.append('images',images[i])
            }
            

           //.log(values)
        //    const response = await axios.post(BASE_URL+'/hotel/add-hotel', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   });
        //   console.log(response)
           const response = await registerHotel(formData)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Formik
            initialValues={{ hotelName: '', location: '', description: '', images: [] }}
            validationSchema={Yup.object().shape({
                hotelName: Yup.string().min(8, 'username is too short - should be 6 chars minimum').required(),
                location: Yup.string().min(4, 'location is required').required(),
                description: Yup.string().min(30, 'description should contain atleast 30 characters').max(300, 'maximum characters allowed exceeded').required(),
                images: Yup.mixed()
            })}
            onSubmit={(values) => _onSave(values)}
        >{
                ({
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (


                    <Form onSubmit={handleSubmit}  className="grid grid-rows-12 gap-6  p-20 mb-8 w-fit" action="">
                        <h1 className="text-center text-2xl">Hotel Registration</h1>
                        <div className="w-[50vw] row-span-1 flex gap-4">

                            <FormInput
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.hotelName}
                                error={errors.hotelName && touched.hotelName && errors.hotelName}
                                success={!errors.hotelName && touched.hotelName ? true : false}
                                width={"lg"} type={'text-area'} name="hotelName" label={'Hotel Name'} />
                            {/* <KErrorMessage name={'hotelName'}/> */}
                            <FormInput
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.location}
                                error={errors.location && touched.location && errors.location}
                                success={!errors.location && touched.location ? true : false}
                                width={"lg"} name="location" label="Location" />
                        </div>
                        <div>
                            <Textarea
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                error={errors.description && touched.description && errors.description}
                                success={!errors.description && touched.description ? true : false}
                                label="description" name="description"></Textarea>
                            {/* <FormInput /> */}
                        </div>
                        <div className="row-span-2 w-[50%]">
                            <FormInput
                                onChange={
                                    (event) => {

                                        setFieldValue('images', event.target.files)

                                    }
                                }
                                // onBlur={handleBlur}
                                // value={values.images}
                                // error={errors.images && touched.images && errors.images}
                                // success={!errors.images && touched.images ? true : false}
                                type={'file'} multiple accept=".jpg, .jpeg, .png" label="images" name='images' />
                        </div>
                        <div className="w-1/4 ml-72">
                            <ButtonDefault bg={'blue'} type={'submit'} />
                        </div>
                    </Form>
                )
            }
        </Formik>
    )
}

export default RegistrationForm;
