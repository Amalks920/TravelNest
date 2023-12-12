import {FormInput} from "../components/form/FormInput"

const HotelRegistration=()=>{
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
        </form>
    )
}

export default HotelRegistration;