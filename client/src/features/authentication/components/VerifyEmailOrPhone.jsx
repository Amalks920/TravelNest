import { Link } from "react-router-dom";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Formik } from "formik";
import * as Yup from 'yup'
import { useVerifyEmailMutation } from "../services/verifyEmailApiSlice";
import { useDispatch } from "react-redux";

const VerifyEmailOrPhone = () => {

    const [verifyEmail,{isError,isLoading,isSuccess}]=useVerifyEmailMutation()

    const  _onSave= async (values)=>{    
        try {
            
            const response=await verifyEmail(values).unwrap()
             console.log(response)
        } catch (error) {
            console.log('err--------->');
            console.log(error)
        }
    }


    return (
        <Formik
            initialValues={{ email: ''}}
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
                <form  onSubmit={handleSubmit} className="grid grid-rows-7  gap-8 shadow-2xl p-10 border-t-2 border-t-gray-100">
                    <p className="text-center font-bold">Enter Email/Phone</p>
                    <div><FormInput
                        label={'Email'} type={'email'} name={'email'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={errors.email && touched.email && errors.email}
                        success={!errors.email && touched.email ? true : false}
                         /></div>

                    <div><ButtonDefault  type={'submit'} onSubmit={handleSubmit} disabled={isSubmitting} /></div>
                </form>
            )}
        </Formik>
    )
}

export default VerifyEmailOrPhone;