
import DatePicker from "../../../components/form/DatePicker";
import { Button } from "@material-tailwind/react";
import { selectPrice,selectNoOfRooms, selectTotalPrice, selectCheckedRooms, updateCheckIn, updateCheckOut, selectHotelId, selectTotalNumberOfRoom, selectCheckIn, selectCheckOut } from "../services/priceSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import useHandlePayment from "../hooks/useHandlePayment";
import { usePaymentMutation } from "../services/paymentApiSlice";
import { useState } from "react";
import { Formik } from "formik";

const PriceCard=({open,setOpen})=>{
const price=useSelector(selectPrice)
const selectedCheckInDate=useSelector(selectCheckIn)
const selectedCheckOutDate=useSelector(selectCheckOut)

const totalPrice=useSelector(selectTotalPrice)
const roomDetails=useSelector(selectCheckedRooms)
const hotel_id=useSelector(selectHotelId)
const totalNoRooms=useSelector(selectTotalNumberOfRoom)
const [payment,{isError,isLoading,isSuccess,error}]=usePaymentMutation()

console.log('select','select')
console.log(selectedCheckInDate,selectedCheckOutDate)
const [checkInDate,setCheckInDate]=useState(selectedCheckInDate)
const [checkOutDate,setCheckOutDate]=useState(selectedCheckOutDate)
console.log(checkInDate,checkOutDate)
console.log(selectedCheckInDate,selectedCheckOutDate)
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
        <Formik
        initialValues={{
         checkInDate:selectedCheckInDate,
            checkOutDate:selectedCheckOutDate
        }}
        >
             {({
        values,
        errors,
        touched,
        handleChange, 
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className="grid grid-rows-[300px,100px] grid-cols-[150px,150px] mt-14 sticky m-3 top-0    rounded-lg ">
            <div className="col-span-2">


            <DatePicker
            
           // min={new Date(Date.now()).toISOString().split('T')[0]}
            datePassed={selectedCheckInDate}
            setDate={setCheckInDate}
            name='checkInDate'
             label={"Check in"}  />
             <div className="mt-4">
            <DatePicker
             datePassed={selectedCheckOutDate}
            //  setDate={setCheckOutDate}
            name='checkOutDate'
            label={"Check out"} />
            </div>
            <Button onClick={async ()=>{
            //   handlePayment()
            
            
            console.log(totalNoRooms)
            const response= await  payment({roomDetails,totalPrice,checkInDate:selectedCheckInDate,checkOutDate:selectedCheckOutDate,hotel_id,totalNoRooms});
            console.log(response)
            if(isError) return console.log(error)

            if(isSuccess){
            dispatch(updateCheckIn(checkInDate))
            dispatch(updateCheckOut(checkOutDate))
            handlePayment(response.data.id)
            console.log(id)
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
      )}
        </Formik>
   
    )
}

export default PriceCard;