import { Link } from "react-router-dom"
import { ButtonDefault } from "../../../components/form/ButtonDefault"
import { FormInput } from "../../../components/form/FormInput"
import { Auth } from "./Auth"



const LoginForm=()=>{
    return (
        <div className="grid grid-rows-7  gap-8 shadow-lg p-10">
        <div><Auth text={'SIGNIN WITH GOOGLE'}/></div>
        <div><FormInput/></div>
        <div><FormInput/></div>

       <Link to={'/signup'}><p className="font-medium text-sm text-blue-900">Don't Have an Account?</p></Link>
        <div><ButtonDefault/></div>
        <Link to={'/verify-email-or-phone'} className="relative bottom-6 left-2"><p className="font-medium  text-sm text-blue-900">Forgot Password?</p></Link>

       </div>
    )
}

export default LoginForm