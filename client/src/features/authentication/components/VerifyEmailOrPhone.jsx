import { Link } from "react-router-dom";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";

const VerifyEmailOrPhone=()=>{
    return (
        <div className="grid grid-rows-7  gap-8 shadow-lg p-10">
        <div><FormInput/></div>
        <div><Link to={'/forgot-password'}><ButtonDefault/></Link></div>
       </div>
    )
}

export default VerifyEmailOrPhone;