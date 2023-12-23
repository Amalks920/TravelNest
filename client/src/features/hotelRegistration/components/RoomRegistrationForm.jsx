import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Textarea,Select,Option } from "@material-tailwind/react";
const RoomRegistrationForm=()=>{
    return (
        <>
        <h1 className="absolute top-28 text-2xl">Room Registration</h1>
        <form className="grid grid-rows-11 grid-cols-6 gap-6 border-2 max-w-[50%] mt-12" action="">
           
            <div className="col-span-3">
                <Select label="Room Type">
                <Option>Single</Option>
                <Option>Double</Option>
                <Option>Deuluxe</Option>
                </Select>
            </div>
            <div className="col-span-6 md:col-span-3">
                <FormInput label={'No of Rooms'} /> 
            </div>
            <div className="col-span-6 md:col-span-3">
                <FormInput />
            </div>
            <div  className="col-span-6 md:col-span-3">
                <FormInput/>
            </div>
            <div  className="col-span-6 md:col-span-3">
                <FormInput/>
            </div>
            <div  className="col-span-6 md:col-span-3">
                <FormInput/>
            </div>
            <div  className="col-span-6 md:col-span-3">
                <FormInput/>
            </div>
            <div  className="col-span-6 md:col-span-3">
                <FormInput type={'number'} label={'Price'}/>
            </div>
            <div className="col-span-6 row-span-2">
                <Textarea label={'Description'}></Textarea>
            </div>
            <div className="col-span-6 row-span-2">
                <FormInput type={'file'} label='Images'/>
            </div>
            <div className="">
              <ButtonDefault value={'Submit'} bg={'blue'} type={'submit'}  width={'sm'}/>
            </div>
        </form>
        </>
    )
}

export default RoomRegistrationForm;