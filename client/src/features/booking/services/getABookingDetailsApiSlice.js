import { apiSlice } from "../../../services/apiSlice";


const getABookingDetailsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getABookingDetailsForUser:builder.query({
            query:(data)=>`/booking/get-a-booking-for-user/${data.booking_id}`,
            providesTags:['single-booking-details']
        }),
        
    })
})


export const {useGetABookingDetailsForUserQuery}=getABookingDetailsApiSlice;