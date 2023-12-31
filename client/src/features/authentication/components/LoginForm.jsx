import { Link, useNavigate } from "react-router-dom";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Auth } from "./Auth";
import { Formik } from "formik";
import * as Yup from "yup";
import { selectToken, setCredentials } from "../services/loginSlice";
import { useLoginMutation } from "../../../services/apiAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const LoginForm = ({ role }) => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation();
  const [err, setErr] = useState("");

  const _onSave = async (values) => {
    try {
      values.role = role;
      const userData = await login(values).unwrap();
      console.log(userData);
      dispatch(setCredentials({ ...userData.data }));

      if (isSuccess) {
        console.log(console.log(token));
      }

      if (isError) {
        console.log(error);
        setErr(error);
      }

      navigate(
        role === "user"
          ? "/home"
          : role === "owner"
          ? "/owner/register-hotel"
          : role === "admin"
          ? "/admin/home"
          : null
      );
    } catch (error) {
      console.log("error");
      console.log(error);
      setErr(error?.data?.error || "network error");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email Required"),
        password: Yup.string()
          .required("Required")
          .min(8, "Password is too short - should be 8 chars minimum")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "use mix of uppercase,lowercase,numbers, and symbols"
          ),
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
          className="grid grid-rows-8 gap-8 shadow-2xl  p-10 border-t-2 border-t-gray-100 rounded-3xl"
        >
          <div className="row-span-1">
            {/* <h1 className="text-2xl">TravelNest</h1> */}
            <p className="text-center">{role}</p>
            <p className="text-red-700  text-sm text-center text-[0.8rem]  w-full">
              {err}
            </p>
            {console.log(errors)}
          </div>

          <div className="border-2 flex items-center justify-center">
            <Auth text={"SIGNIN WITH GOOGLE"} />
          </div>
          <div>
            <FormInput
              label={!errors.email ? "Email" : errors.email}
              name={"email"}
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email && errors.email}
              success={!errors.email && touched.email ? true : false}
            />
          </div>

          <div className="w-72">
            <FormInput
              label={!errors.password ? "Password" : errors.password}
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password && errors.password}
              success={!errors.password && touched.password ? true : false}
            />
          </div>

          <Link to={role === "user" ? "/signup" : "/owner/signup"}>
            <p className="  font-light -mt-5 text-blue-500 text-[0.8rem]">
              Don't Have an Account?
            </p>
          </Link>
          <div className=" -mt-5">
            <ButtonDefault
              value="submit"
              type={"submit"}
              onSubmit={handleSubmit}
              disabled={isSubmitting}
            />
          </div>
          <Link
            to={
              role === "user"
                ? "/verify-email"
                : role === "owner"
                ? "/owner/verify-email"
                : "/admin/verify-email"
            }
            className="relative bottom-6 left-20"
          >
            <p className="font-medium text-blue-500 text-[0.8rem]">
              Forgot Password?
            </p>
          </Link>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
