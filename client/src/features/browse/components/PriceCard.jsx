
import DatePicker from "../../../components/form/DatePicker";
import { Button } from "@material-tailwind/react";


const PriceCard=()=>{

    return (

        <div className="grid grid-rows-[300px,100px] grid-cols-[150px,150px] mt-14 sticky ps-7  top-0   rounded-lg ">
            <div className="col-span-2">
            <DatePicker label={"Check in"} />
            <DatePicker label={"Check out"} /> 
            <Button className="w-full mt-4">Choose Date</Button>
                </div>  
            <div className="col-span-2">
            
                </div>  
        </div>
   
    )
}

export default PriceCard;