import { useGetAHotelForUserQuery } from "../services/getAHotelForUserApiSlice";


const useGetAHotel=(hotel_id)=>{
    console.log(hotel_id)
const {data:hotel,isError,isFetching,isLoading,isSuccess,isUninitialized}=useGetAHotelForUserQuery({hotel_id})


return {
    hotel,
    isError,
    isFetching,
    isLoading,
    isSuccess ,
    isUninitialized
}
}

export default useGetAHotel;