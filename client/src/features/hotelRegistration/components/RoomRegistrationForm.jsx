import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";

const RoomRegistrationForm=()=>{
    return (
        <form className="grid grid-rows-6 gap-6" action="">
            <div>
                <FormInput width={"lg"}/>
            </div>
            <div>
                <FormInput/> 
            </div>
            <div>
                <FormInput/>
            </div>
            <div>
                <FormInput/>
            </div>
            <div>
                <FormInput/>
            </div>
            <div>
                <FormInput/>
            </div>
            <div>
                <FormInput/>
            </div>
            <div>
                <FormInput/>
            </div>
            <div>
                <FormInput type={'file'}/>
            </div>
            <div>
               <ButtonDefault bg={'blue'}/>
            </div>
        </form>
    )
}

export default RoomRegistrationForm;