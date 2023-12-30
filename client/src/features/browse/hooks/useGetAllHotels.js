import { useGetAllHotelQuery } from "../services/getAllHotelsApiSlice"

const useGetAllHotels=()=>{
const {data:hotels,isError,isFetching,isLoading,isUninitialized,error}=useGetAllHotelQuery()
console.log(hotels)
    return {
        hotels:hotels?.response,
        isError,
        isFetching,
        isLoading,
        isUninitialized,
        error
    }
}

export default useGetAllHotels