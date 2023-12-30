import { apiSlice } from "../../../services/apiSlice";


const getAllHotelsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getAllHotel:builder.query({
            query:()=> '/hotel/get-all-hotels-user',
             transformErrorResponse:(response)=>response.response
        })
    })
})



export const {useGetAllHotelQuery}=getAllHotelsApiSlice