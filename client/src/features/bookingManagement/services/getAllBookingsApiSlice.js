import { apiSlice } from "../../../services/apiSlice";


const getAllBookingsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getAllBookings:builder.query({
            query:(data)=>`/booking/get-all-bookings-owner/${data.hotel_id}`
        })
    })
})


export const {useGetAllBookingsQuery}=getAllBookingsApiSlice;