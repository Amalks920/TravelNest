import { Link } from "react-router-dom";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { CheckboxDefault } from "../../../components/form/CheckboxDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Auth } from "./Auth";

const SignupForm=()=>{
return (

   <div className="grid grid-rows-7  gap-8 shadow-lg p-10">
    <div><Auth text={'SIGNIN WITH GOOGLE'}/></div>
    <div><FormInput/></div>
    <div><FormInput/></div>
    <div><FormInput/></div>
    <div><FormInput/></div>
    <div><FormInput/></div>
    <Link to={'/login'}><p className="font-medium text-sm text-blue-900">Already Have an Account?</p></Link>
    <div><ButtonDefault/></div>
   </div>

)
}

export default SignupForm;