import { useSelector } from "react-redux";
import { useGetAHotelQuery } from "../services/getAHotelApiSlice";
import { selectHotelById } from "../../hotelManagement/services/hotelListSlice";


const useGetHotel=(hotel_id)=>{
    if(!hotel_id) return 
const hotel=useSelector((state)=>selectHotelById(state,hotel_id))
return hotel
}

export default useGetHotel;