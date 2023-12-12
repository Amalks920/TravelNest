import { Input } from "@material-tailwind/react";
import { Formik } from "formik";


 
export function FormInput(props) {
  function handleChange(){}
  return (
    <div className="w-72">

      <Input {...props}
       onChange={props.onChange}
       onBlur={props.onBlur}
       value={props.value}
       error={props.error}
       success={props.success}
         />
      
    </div>
    
  );
}