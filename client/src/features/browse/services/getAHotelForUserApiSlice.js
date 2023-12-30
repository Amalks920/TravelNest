import { apiSlice } from "../../../services/apiSlice";



const getAHotelForUserApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
       getAHotelForUser:builder.query({
        query:(data)=>`/hotel/get-a-hotel-user/${data.hotel_id}`
       })
    })
})



export const {useGetAHotelForUserQuery}=getAHotelForUserApiSlice;