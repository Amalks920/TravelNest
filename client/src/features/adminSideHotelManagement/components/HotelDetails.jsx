import { useParams } from "react-router-dom";
import { useGetAllHotelDetailsQuery } from "../../userManagement/services/getAllHotelDetailsApiSlice";
import { HotelTable } from "./HotelTable";
import { OwnerTable } from "./ownerTable";
import RoomDetails from "../../hotelManagement/components/RoomsDetails";
import { RoomsTable } from "./RoomsTable";
import { Button } from "@material-tailwind/react";

const HotelDetails=()=>{
const {_id}=useParams()

  const {data:hotels,isError,isFetching,isLoading,isSuccess}=useGetAllHotelDetailsQuery({_id})



  const {hotel_details,room_details}=isSuccess? hotels:[]
 
console.log(room_details)
 
  if(isSuccess) return (
  <div className="w-full h-[100%] flex flex-col justify-between items-center gap-20 m-28">

            <div className=" w-full px-6 ">
              <HotelTable data={hotel_details}/>
            </div>
            <div className=" w-full px-6">
                <OwnerTable data={hotel_details}/>
            </div>
            {room_details.length!==0 && <div className=" w-full px-6">
                <RoomsTable data={room_details}/>
            </div>}
            <div className="flex justify-center mt-16"><Button color="green" className="">Approve</Button></div>

        </div>
    
    )
}

export default HotelDetails;