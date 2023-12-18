import { Input } from "@material-tailwind/react";
import { Formik } from "formik";


 
export function FormInput(props) {
  function handleChange(){}
  return (
    // w-72
    <div className="w-96">

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