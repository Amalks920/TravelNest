import { PencilIcon } from "@heroicons/react/24/solid";
import useGetRoomsDetails from "../hooks/useGetRoomsDetails";
import RoomDetailsAccordian from "./RoomDetailsAccordian";

const RoomDetailsSection = ({ hotel_id }) => {
  const { rooms, isError, isFetching, isLoading, isSuccess } =
    useGetRoomsDetails(hotel_id);

     if(isLoading) return <h1>Loading....</h1>

     
  return (
    <div className="flex flex-grow flex-col">

  
      <div className="flex flex-col">
        <h1 className="font-bold text-xl text-center  w-full">Room Details</h1>
        {
            rooms?.map((room,index)=>{
                return <RoomDetailsAccordian key={room?._id} room={room} />
            })
            
        }
      </div>
    </div>
  );
};

export default RoomDetailsSection;
