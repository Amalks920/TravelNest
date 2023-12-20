import { Link, useNavigate } from "react-router-dom";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { CheckboxDefault } from "../../../components/form/CheckboxDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Auth } from "./Auth";
import { Formik } from "formik";
import * as  Yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
//import signup from "../services/signup";
import { getSignupStatus,getSignupError,selectData,createUser } from "../services/signupSlice";

const SignupForm = ({ role }) => {
   
   const error=useSelector(getSignupError)
   const status=useSelector(getSignupStatus)

   const dispatch=useDispatch()
   const navigate=useNavigate()

   const _onSave = (values) => {
      dispatch(createUser(values))
  }


  if(status==="pending"){
   return (
      <h1>Loading.....</h1>
   )
  }else if(status==='succeeded'){
      navigate('/login')
  }


   return (
    
      <Formik
         initialValues={{ username: '', email: '', phone: '', password: '', repassword: '' }}
         validationSchema={Yup.object({
            username: Yup.string()
               .min(6, 'username is too short - should be 6 chars minimum'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string(),
            password: Yup.string()
               .required('Required')
               .min(8, 'Password is too short - should be 8 chars minimum')
               .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  'Include at least one Uppercase,Lowercase,Number and  a special character'
               ),
            repassword: Yup.string()
               .required('Required')
               .min(8, 'Password is too short - should be 8 chars minimum')
               .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  'Include at least one Uppercase,Lowercase,Number and  a special character'
               )

         })}
         onSubmit={(values) =>{
            _onSave(values)
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
            isSubmitting
         }) => (

            <form onSubmit={handleSubmit} className="grid grid-rows-7  gap-8 shadow-2xl p-10 ">
               
               <h1 className="text-2xl font-bold text-center">{role}</h1>
               <p className="text-red-600 border-2 text-center">{error}</p>
               <div><Auth text={'SIGNIN WITH GOOGLE'} /></div>
               <div><FormInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  error={errors.username && touched.username && errors.username}
                  success={!errors.username && touched.username ? true : false}
                  label={'username'} type={'text'} name={'username'} /></div>

               <div><FormInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={errors.email && touched.email && errors.email}
                  success={!errors.email && touched.email ? true : false}
                  label={'Email'} type={'email'} name={'email'} /></div>

               <div><FormInput 
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={values.phone}
                                 error={errors.phone && touched.phone && errors.phone}
                                 success={!errors.phone && touched.phone ? true : false}
               label={'Phone'} type={'phone'} name={'phone'} /></div>

               <div><FormInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password && touched.password && errors.password}
                  success={!errors.password && touched.password ? true : false}
                  label={'password'} type={'password'} name={'password'} /></div>

               <div><FormInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.repassword}
                  error={errors.repassword && touched.repassword && errors.repassword}
                  success={!errors.repassword && touched.repassword ? true : false}
                  label={'Re Enter Password'} type={'password'} name={'repassword'} /></div>

               <Link to={'/login'}><p className="font-medium text-sm text-blue-900">Already Have an Account?</p></Link>
               <div><ButtonDefault type={'submit'} onSubmit={handleSubmit} disabled={isSubmitting}/></div>
            </form>
         )}
      </Formik>
   )
}

export default SignupForm;