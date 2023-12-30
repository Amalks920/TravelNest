import { useGetAHotelForUserQuery } from "../services/getAHotelForUserApiSlice";


const useGetAHotel=(hotel_id)=>{
    console.log(hotel_id)
const {data:hotel,isError,isFetching,isLoading,isSuccess}=useGetAHotelForUserQuery({hotel_id})


return {
    hotel,
    isError,
    isFetching,
    isLoading,
    isSuccess 
}
}

export default useGetAHotel;