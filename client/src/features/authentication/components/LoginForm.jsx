import { Link } from "react-router-dom"
import { ButtonDefault } from "../../../components/form/ButtonDefault"
import { FormInput } from "../../../components/form/FormInput"
import { Auth } from "./Auth"
import { Formik } from "formik"
import * as Yup from 'yup'



const LoginForm = () => {

    const _onSave = (values) => {
        console.log(values)
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


                <form onSubmit={handleSubmit} className="grid grid-rows-7  gap-8 shadow-2xl p-10">
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

                    <div><FormInput label={'Password'}
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        error={errors.password && touched.password && errors.password}
                        success={!errors.password && touched.password ? true: false}
                    /></div>

                    <Link to={'/signup'}><p className="font-medium text-sm text-blue-900">Don't Have an Account?</p></Link>
                    <div><ButtonDefault type={'submit'} onSubmit={handleSubmit} disabled={isSubmitting} /></div>
                    <Link to={'/verify-email-or-phone'} className="relative bottom-6 left-2"><p className="font-medium  text-sm text-blue-900">Forgot Password?</p></Link>

                </form>
            )}
        </Formik>
    )
}

export default LoginForm