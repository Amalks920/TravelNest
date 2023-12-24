import { useParams } from "react-router-dom";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Textarea, Select, Option } from "@material-tailwind/react";
import { Formik } from "formik";
import { useAddRoomMutation } from "../services/roomRegApiSlice";
import * as Yup from "yup";
const RoomRegistrationForm = () => {
  const { hotel_id } = useParams();
  const [addRoom, { isError, isLoading, isSuccess }] = useAddRoomMutation();
  console.log(hotel_id);
  const _onSave = async (values) => {
    try {
      const {
        roomType,
        noOfRooms,
        amenities,
        rate,
        size,
        bathroomType,
        description,
        images,
      } = values;
      console.log(images)
      let formData = new FormData();

      formData.append("roomType", roomType);
      formData.append("noOfRooms", noOfRooms);
      formData.append("amenities", amenities);
      formData.append("rate", rate);
      formData.append("size", size);
      formData.append("bathroomType", bathroomType);
      formData.append("description", description);
      formData.append('hotel_id',hotel_id)
      console.log(formData['hotel_id'])
      for (var i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      console.log(formData);
      const response = await addRoom(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="absolute top-28 text-2xl">Room Registration</h1>
      <Formik
        initialValues={{
          roomType: "single",
          noOfRooms: null,
          amenities: null,
          rate: null,
          size: null,
          bathroomType: "en-suite",
          description: "",
          images: [],
        }}
        validationSchema={Yup.object().shape({
          //   roomType: Yup.object({
          //     value: Yup.string().required(),
          //   }),
          noOfRooms: Yup.number().required(),
          rate: Yup.number().required(),
          size: Yup.number().required(),
          //   bathroomType: Yup.object({
          //     value: Yup.string().required(),
          //   }),
          amenities: Yup.string().required(),
          description: Yup.string()
            .min(30, "description should contain atleast 30 characters")
            .max(300, "maximum characters allowed exceeded")
            .required(),
          images: Yup.mixed().required(),
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
          <form
            onSubmit={handleSubmit}
            className="grid grid-rows-11 grid-cols-6 gap-6 border-2 max-w-[50%] mt-12"
            action=""
          >
            <div className="col-span-3">
              <Select
                as="select"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.roomType}
                error={errors.roomType && touched.roomType && errors.roomType}
                success={!errors.roomType && touched.roomType ? true : false}
                name="roomType"
                label="Room Type"
              >
                <Option value="single">Single</Option>
                <Option value="double">Double</Option>
              </Select>
            </div>
            <div className="col-span-6 md:col-span-3">
              <FormInput
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.noOfRooms}
                error={
                  errors.noOfRooms && touched.noOfRooms && errors.noOfRooms
                }
                success={!errors.noOfRooms && touched.noOfRooms ? true : false}
                name="noOfRooms"
                label={"No of Rooms"}
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <FormInput
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.amenities}
                error={
                  errors.amenities && touched.amenities && errors.amenities
                }
                success={!errors.amenities && touched.amenities ? true : false}
                name="amenities"
                label={"amenities"}
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <FormInput
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.rate}
                error={errors.rate && touched.rate && errors.rate}
                success={!errors.rate && touched.rate ? true : false}
                name="rate"
                label={"Rate Per Room"}
              />
            </div>
            
            <div className="col-span-6 md:col-span-3">
              <FormInput
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.size}
                error={errors.size && touched.size && errors.size}
                success={!errors.size && touched.size ? true : false}
                name="size"
                label={"Size of the room in square units"}
              />
            </div>
            <div className="col-span-3">
              <Select
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bathroomType}
                error={
                  errors.bathroomType &&
                  touched.bathroomType &&
                  errors.bathroomType
                }
                success={
                  !errors.bathroomType && touched.bathroomType ? true : false
                }
                as="select"
                name="bathroomType"
                label="Bathroom Type"
              >
                <Option value="en-suite">En-suite</Option>
                <Option value="bathtub">Bathtub</Option>
                <Option value="shower">Shower</Option>
              </Select>
            </div>
            <div className="col-span-6 row-span-2">
              <Textarea
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={
                  errors.description &&
                  touched.description &&
                  errors.description
                }
                success={
                  !errors.description && touched.description ? true : false
                }
                label={"Description"}
              ></Textarea>
            </div>
            <div className="col-span-6 row-span-2">
              <FormInput
                onChange={(event) => {
                  setFieldValue("images", event.target.files);
                }}
                name='images'
                type={"file"}
                multiple
                accept=".jpg, .jpeg, .png"
                label="Images"
              />
            </div>
            <div className="">
              <ButtonDefault
                value={"Submit"}
                bg={"blue"}
                type={"submit"}
                width={"sm"}
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RoomRegistrationForm;
