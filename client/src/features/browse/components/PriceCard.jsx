
import DatePicker from "../../../components/form/DatePicker";
import { Button } from "@material-tailwind/react";
import { selectPrice,selectNoOfRooms } from "../services/priceSlice";
import { useSelector } from "react-redux";

const PriceCard=()=>{
const price=useSelector(selectPrice)

    return (

        <div className="grid grid-rows-[300px,100px] grid-cols-[150px,150px] mt-14 sticky m-3 top-0    rounded-lg ">
            <div className="col-span-2">
            <DatePicker label={"Check in"} />
            <DatePicker label={"Check out"} /> 
            <Button className="w-full mt-4">Choose Date</Button>
            <div className="mt-6 flex justify-between mx-3">
                <p className="font-bold">Price</p>
                <p className="me-3 font-bold">₹ {price}</p>
            </div>
            <div className="mt-6 flex justify-between mx-3">
                <p className="font-bold">Price</p>
                <p className="me-3 font-bold">₹ {price}</p>
            </div>
                </div>  
            <div className="col-span-2">
            
            
                </div>  
        </div>
     
   
    )
}

export default PriceCard;