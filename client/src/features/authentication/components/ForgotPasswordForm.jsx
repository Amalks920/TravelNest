import { Link } from "react-router-dom";
import { FormInput } from "../../../components/form/FormInput";
import { ButtonDefault } from "../../../components/form/ButtonDefault";

const ForgotPasswordForm=()=>{
    return (
        <div className="grid grid-rows-7  gap-8 shadow-lg p-10">
        <div><FormInput/></div>
        <div><FormInput/></div>
        <div><Link to={'/verify-email-or-phone'}><ButtonDefault/></Link></div>
       </div>
    )
}

export default ForgotPasswordForm;