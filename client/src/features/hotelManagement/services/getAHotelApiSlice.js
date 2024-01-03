import { apiSlice } from "../../../services/apiSlice";


const getAHotelApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getAHotelForAdmin:builder.query({
            query:(data)=>`hotel/get-a-hotel-for-owner/${data.hotel_id}`,
            transformResponse:(response)=>response.response
        })
    })
})


export const {useGetAHotelForAdminQuery}=getAHotelApiSlice