import { Link, useNavigate } from "react-router-dom";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { CheckboxDefault } from "../../../components/form/CheckboxDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Auth } from "./Auth";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
//import signup from "../services/signup";
import {
  getSignupStatus,
  getSignupError,
  selectData,
  createUser,
} from "../services/signupSlice";
import { Spinner } from "@material-tailwind/react";

const SignupForm = ({ role }) => {
  const error = useSelector(getSignupError);
  const status = useSelector(getSignupStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _onSave = (values) => {
    values.role = role;
    dispatch(createUser(values));
  };

  if (status === "pending") {
    return <Spinner/>
  } else if (status === "succeeded") {
    navigate(
      role === "user"
        ? "/login"
        : role === "owner"
        ? "/owner/login"
        : role === "admin"
        ? "/admin/login"
        : null
    );
  }

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        phone: "",
        password: "",
        repassword: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(6, "username is too short - should be 6 chars minimum")
          .required(),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is Required"),
        phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Invalid phone number')
        .required('Phone is required'),
        
        password: Yup.string()
          .required("Password is Required")
          .min(8, "Password should be 8 chars minimum")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "at least one Uppercase,Lowercase,Number and a special character"
          ),
        repassword: Yup.string()
          .required("Password Required")
          .oneOf([Yup.ref("password")], "Passwords does not match"),
      })}
      onSubmit={(values) => {
        _onSave(values);
        //signup(values)
      }}
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
          className="grid grid-rows-7   gap-8 shadow-2xl p-10 w-[27%] rounded-md"
        >
          <h2 className="grid-row-1 text-[2rem] font-bold text-center 
         bg-black 
         bg-clip-text
          "> TravelNest</h2>

        {error &&  <p className="text-red-600 text-center text-[0.8rem]">
            {error}
          </p>}
          <div >
            <FormInput
            className={'rounded-none'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              error={errors.username && touched.username && errors.username}
              success={!errors.username && touched.username ? true : false}
              label={!errors.username ? "username" : errors.username}
              type={"text"}
              name={"username"}
            />
          </div>

          <div>
            <FormInput
            className={'rounded-none'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email && errors.email}
              success={!errors.email && touched.email ? true : false}
              label={!errors.email ? "Email" : errors.email}
              type={"email"}
              name={"email"}
            />
          </div>

          <div>
            <FormInput
            className={'rounded-none'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              error={errors.phone && touched.phone && errors.phone}
              success={!errors.phone && touched.phone ? true : false}
              label={!errors.phone ? "Phone" : errors.phone}
              type={"phone"}
              name={"phone"}
            />
          </div>

          <div>
            <FormInput
            className={'rounded-none '}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password && errors.password}
              success={!errors.password && touched.password ? true : false}
              label={!errors.password ? "password" : errors.password}
              type={"password"}
              name={"password"}
            />
          </div>

          <div>
            <FormInput
            className={'rounded-none border-blue-400'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.repassword}
              error={
                errors.repassword && touched.repassword && errors.repassword
              }
              success={!errors.repassword && touched.repassword ? true : false}
              label={
                !errors.repassword ? "Re Enter Password" : errors.repassword
              }
              type={"password"}
              name={"repassword"}
            />
          </div>

          <Link to={"/login"}>
            <p className="font-medium text-sm text-black">
              Already Have an Account?
            </p>
          </Link>
          <div>
            <ButtonDefault
            className=' h-[50px] rounded-md w-[100%] bg-black'
              type={"submit"}
              onSubmit={handleSubmit}
              value={"submit"}
              disabled={isSubmitting}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SignupForm;
