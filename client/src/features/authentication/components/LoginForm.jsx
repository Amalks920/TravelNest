import { Link, useNavigate } from "react-router-dom"
import { ButtonDefault } from "../../../components/form/ButtonDefault"
import { FormInput } from "../../../components/form/FormInput"
import { Auth } from "./Auth"
import { Formik } from "formik"
import * as Yup from 'yup'
import { setCredentials } from "../services/loginSlice"
import { useLoginMutation } from "../../../services/apiAuthSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"



const LoginForm = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [login,{isLoading,isError,isSuccess}]=useLoginMutation()

    const _onSave = async (values) => {
        try {
            values.role='user'
            const userData=await login(values).unwrap()
            console.log(userData)
            dispatch(setCredentials({...userData.data}))
             navigate('/home')
        } catch (error) {
            console.log('error')
            console.log(error)
        }
    }

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string()
                    .required('Required')
                    .min(8, 'Password is too short - should be 8 chars minimum')
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        'Include at least one Uppercase,Lowercase,Number and  a special character'
                    )
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
                isSubmitting
            }) => (


                <form onSubmit={handleSubmit} className="grid grid-rows-7 gap-8 shadow-2xl p-10 pt-20 border-t-2 border-t-gray-100 rounded-3xl">
                    <div><Auth text={'SIGNIN WITH GOOGLE'} /></div>
                    <div><FormInput label={'Email'}
                        name={'email'}
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={errors.email && touched.email && errors.email}
                        success={!errors.email && touched.email ? true : false}
                    /></div>

                    <div className="w-72"><FormInput label={'Password'}
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        error={errors.password && touched.password && errors.password}
                        success={!errors.password && touched.password ? true: false}
                    /></div>

                    <Link to={'/signup'}><p className="  font-light -mt-5 text-black">Don't Have an Account?</p></Link>
                    <div className=" -mt-5"><ButtonDefault type={'submit'} onSubmit={handleSubmit} disabled={isSubmitting} /></div>
                    <Link to={'/verify-email-or-phone'} className="relative bottom-6 left-24"><p className="font-medium  text-sm text-black">Forgot Password?</p></Link>
                </form>
            )}
        </Formik>
    )
}

export default LoginForm