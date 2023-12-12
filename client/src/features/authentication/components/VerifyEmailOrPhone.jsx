import { Link } from "react-router-dom";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Formik } from "formik";
import * as Yup from 'yup'

const VerifyEmailOrPhone = () => {
    return (
        <Formik
            initialValues={{ username: '', email: '', phone: '', password: '', repassword: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
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

                    <div><FormInput
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={errors.email && touched.email && errors.email}
                        success={!errors.email && touched.email ? true : false}
                        label={'Email'} type={'email'} name={'email'} /></div>

                    <div><Link to={'/forgot-password'}><ButtonDefault type={'submit'} onSubmit={handleSubmit} disabled={isSubmitting} /></Link></div>
                </form>
            )}
        </Formik>
    )
}

export default VerifyEmailOrPhone;