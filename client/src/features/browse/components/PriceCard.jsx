
import DatePicker from "../../../components/form/DatePicker";
import { Button } from "@material-tailwind/react";
import { selectPrice,selectNoOfRooms, selectTotalPrice, selectCheckedRooms, updateCheckIn, updateCheckOut, selectHotelId, selectTotalNumberOfRoom } from "../services/priceSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import useHandlePayment from "../hooks/useHandlePayment";
import { usePaymentMutation } from "../services/paymentApiSlice";
import { useState } from "react";

const PriceCard=()=>{
// const price=useSelector(selectPrice)
const totalPrice=useSelector(selectTotalPrice)
const roomDetails=useSelector(selectCheckedRooms)
const hotel_id=useSelector(selectHotelId)
const totalNoRooms=useSelector(selectTotalNumberOfRoom)
const [payment,{isError,isLoading,isSuccess,error}]=usePaymentMutation()

const [checkInDate,setCheckInDate]=useState(null)
const [checkOutDate,setCheckOutDate]=useState(null)
const dispatch=useDispatch();
const handlePayment=async (id) =>{
    try {
        const stripe = await loadStripe('pk_test_51McT8uSJpQVF6jBTNlHodKtVtviDTJ5I2ApQv9ag4Nr4iwvzERcDxveeDcbIWA8TYpPIM2XqbYqSjAtlUfa7kldc00nshn8huB');  
        stripe.redirectToCheckout({
            sessionId:id
        });
    } catch (error) {
        console.log(error)
    }
}


    return (

        <div className="grid grid-rows-[300px,100px] grid-cols-[150px,150px] mt-14 sticky m-3 top-0    rounded-lg ">
            <div className="col-span-2">
            <DatePicker
            date={checkInDate}
            setDate={setCheckInDate}
             label={"Check in"}  />
            <DatePicker
            date={checkOutDate}
            setDate={setCheckOutDate}
            label={"Check out"} /> 
            <Button onClick={async ()=>{
            //   handlePayment()
            console.log(hotel_id)
            const response= await  payment({roomDetails,totalPrice,checkInDate,checkOutDate,hotel_id,totalNoRooms});
            console.log(response)
            if(isError) return console.log(error)

            if(isSuccess){
            dispatch(updateCheckIn(checkInDate))
            dispatch(updateCheckOut(checkOutDate))
            handlePayment(response.data.id)
            }
            
            }}
             className="w-full mt-4">Choose Date</Button>

            {/* <div className="mt-6 flex justify-between mx-3">
                <p className="font-bold">Price</p>
                <p className="me-3 font-bold">₹ {price}</p>
            </div> */}
            <div className="mt-6 flex justify-between mx-3">
                <p className="font-bold">Price</p>
                <p className="me-3 font-bold">₹ {totalPrice}</p>
            </div>
                </div>  
            <div className="col-span-2">
            
            
                </div>  
        </div>
     
   
    )
}

export default PriceCard;