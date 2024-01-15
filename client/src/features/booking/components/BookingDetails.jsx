import { Option, Select } from "@material-tailwind/react";
import { useGetBookingsOfUserQuery } from "../services/getBookingsOfUserApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../../authentication/services/loginSlice";


const  BookingDetails=()=>{
    const user_id=useSelector(selectUserId)
    const {data:bookings,isError,isLoading,isSuccess}=useGetBookingsOfUserQuery({user_id});
    console.log(bookings)
    return (
       <div className="grid grid-flow-row grid-cols-4 shadow-2xl w-[80%]">
        <div className="col-span-2 flex p-5">
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

    <>
        <div className="col-span-1 flex justify-center items-center">
            lkdj
        </div>
        <div className="col-span-1 flex justify-center items-center">
            lkdj
        </div>
        <div className="col-span-1 flex justify-center items-center">
            lkdj
        </div>
        <div className="col-span-1 flex justify-center items-center">
            lkdj
        </div>
    </>

       </div>
    )
}

export default BookingDetails;