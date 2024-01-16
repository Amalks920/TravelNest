import { Option, Select, Spinner } from "@material-tailwind/react";
import { useGetBookingsOfUserQuery } from "../services/getBookingsOfUserApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../../authentication/services/loginSlice";
import { IMAGE_BASE_URL } from "../../../data/constants";
import { Link } from "react-router-dom";


const  BookingDetails=()=>{
    const user_id=useSelector(selectUserId)
    const {data:bookings,isError,isLoading,isSuccess}=useGetBookingsOfUserQuery({user_id});
   // console.log(bookings.response)

    

    if(isLoading) return <Spinner/>
    return (
       <div className="grid grid-flow-row grid-cols-3 shadow-md border-2 w-[80%] p-5 pb-14 rounded-md">
        <div className="col-span-1 flex p-5">
           <h2 className="font-bold text-2xl">Booking History</h2> 
        </div>
        <div className="col-span-2 flex justify-end p-5">
        <div className="w-72">
        <Select label="Select Status" size="sm">
        <Option>CheckIn</Option>
        <Option>CheckOut</Option>
        <Option>Paid</Option>
      </Select>
      </div>
        </div>
{

    bookings.response.map(({checkIn,checkOut,hotelName,status,totalNoOfRooms,hotelImages,totalAmount,_id},index)=>{

  
   return  <>
        <div className="col-span-1 flex justify-center items-center p-7">
           <img src={IMAGE_BASE_URL+hotelImages[0]} alt="" width={150} className="rounded-md" />
        </div>
        <div className="col-span-1 flex flex-col justify-center items-left gap-3">
           <h2 className="font-bold">{hotelName}</h2> 
           <h2 className="text-[0.5rem]">{checkIn} - {checkOut}</h2>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center gap-2">
            <h2 className="font-bold text-sm">{status}</h2>
            <h2 className="font-bold text-sm">₹{totalAmount}</h2>
            <Link to={`/single-booking-details/${_id}`} className="text-red-500 text-sm ms-10 cursor-pointer">View Details?</Link>
        </div>
        {/* <div className="col-span-1 flex justify-center items-center">
            lkdj
        </div> */}
    </>

      })

}
       </div>
    )
}

export default BookingDetails;