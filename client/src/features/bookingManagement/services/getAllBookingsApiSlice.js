import { apiSlice } from "../../../services/apiSlice";


const getAllBookingsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getAllBookings:builder.query({
            query:(data)=>`/booking/get-all-bookings-owner/${data.hotel_id}?pageNumber=${data.pageNumber}`
        }),
        getAllBookingsLength:builder.query({
            query:(data)=>`/booking/get-all-bookings-length-owner/${data.hotel_id}`
        })
    })
})


export const {useGetAllBookingsQuery,useGetAllBookingsLengthQuery}=getAllBookingsApiSlice;