import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useAddCouponMutation } from "../services/couponApiSlice";
import { useState } from "react";

const TABLE_HEAD = ["Booking Id", "Hotel Name", "User Name", "Status", ""];

const getYesterdayDateString = () => {
  const yesterday = new Date();
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const AddCoupon = () => {
  // const [discountType,setDiscountType]=useState(null)
  const [addCoupon, { isError, isLoading, isSuccess }] = useAddCouponMutation();

  async function _onSave(values) {
    console.log(values);
    await addCoupon({ values });
  }

  return (
    <div className="w-full h-[100vh] px-[20%] pt-[5%] pb-[15%]">
      <Formik
        initialValues={{
          code: "",
          discountAmount: null,
          minimumAmount: null,
          maximumRedemption: null,
          expirationDate: "",
          description: "",
          discountType: "",
        }}
        validationSchema={Yup.object().shape({
          code: Yup.string().min(8).max(20).required(),
          discountAmount: Yup.number().required(),
          minimumAmount: Yup.number().required(),
          maximumRedemption: Yup.number().required(),
          expirationDate: Yup.date().required(),
          description: Yup.string()
            .min(30, "description should contain atleast 30 characters")
            .max(300, "maximum characters allowed exceeded")
            .required("description required"),
          discountType: Yup.string().required(),
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
            action=""
            className="h-full grid grid-rows-7 grid-cols-2"
          >
            <div className="col-span-2 px-5 flex items-center">
              <h2 className="text-center w-full font-bold">Add Coupon</h2>
            </div>
            <div className="col-span-1 px-5 flex items-center">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.code}
                error={errors.code && touched.code && errors.code}
                success={!errors.code && touched.code ? true : false}
                label={!errors.code ? "coupon code" : errors.code}
                name="code"
                className="border-2 rounded-md"
              />
            </div>
            <div className="col-span-1 px-5 flex items-center">
              <Field
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.discountType}
                error={
                  errors.discountType &&
                  touched.discountType &&
                  errors.discountType
                }
                success={
                  !errors.discountType && touched.discountType ? true : false
                }
                as="select"
                label={
                  !errors.discountType ? "coupon code" : errors.discountType
                }
                name="discountType"
                className="w-full h-[45%]  text-[0.8rem] rounded-md bg-white border-[1px] border-gray-400 ps-3"
              >
                <option value="" disabled selected>
                  Coupon Type
                </option>
                <option value="Fixed">Fixed</option>
                <option value="Percentage">Percentage</option>
              </Field>
            </div>

            <div className="col-span-1 px-5 flex items-center">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.discountAmount}
                error={
                  errors.discountAmount &&
                  touched.discountAmount &&
                  errors.discountAmount
                }
                success={
                  !errors.discountAmount && touched.discountAmount
                    ? true
                    : false
                }
                label={
                  !errors.discountAmount
                    ? "Discount Amount"
                    : errors.discountAmount
                }
                type="Number"
                name="discountAmount"
                className="border-2 rounded-md"
              />
            </div>
            <div className="col-span-1 px-5 flex items-center">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.minimumAmount}
                error={
                  errors.minimumAmount &&
                  touched.minimumAmount &&
                  errors.minimumAmount
                }
                success={
                  !errors.minimumAmount && touched.minimumAmount ? true : false
                }
                label={
                  !errors.minimumAmount
                    ? "Minimum Amount"
                    : errors.minimumAmount
                }
                name="minimumAmount"
                min={1000}
                type="Number"
                className="border-2 rounded-md"
              />
            </div>
            <div className="col-span-1 px-5 flex items-center">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.max}
                error={
                  errors.maximumRedemption &&
                  touched.maximumRedemption &&
                  errors.maximumRedemption
                }
                success={
                  !errors.maximumRedemption && touched.maximumRedemption
                    ? true
                    : false
                }
                label={
                  !errors.maximumRedemption
                    ? "Maximum Redemption"
                    : errors.maximumRedemption
                }
                name="maximumRedemption"
                min={1}
                type="Number"
                className="border-2 rounded-md"
              />
            </div>
            <div className="col-span-1 px-5 flex items-center">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.max}
                error={
                  errors.expirationDate &&
                  touched.expirationDate &&
                  errors.expirationDate
                }
                success={
                  !errors.expirationDate && touched.expirationDate
                    ? true
                    : false
                }
                label={
                  !errors.expirationDate
                    ? "Expiration Date"
                    : errors.expirationDate
                }
                min={getYesterdayDateString()}
                type="date"
                name="expirationDate"
                className="border-2 rounded-md"
              />
            </div>
            <div className="col-span-2  px-5 flex items-center">
              <Textarea
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.max}
                error={
                  errors.description &&
                  touched.description &&
                  errors.description
                }
                success={
                  !errors.description && touched.description ? true : false
                }
                label={!errors.description ? "Description" : errors.description}
                name="description"
                className="border-2 rounded-md"
              ></Textarea>
            </div>
            <div className="col-span-2 px-5 flex items-center justify-center ">
              <Button type="submit" className="rounded-md w-[30%] bg-black">
                Submit
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddCoupon;
