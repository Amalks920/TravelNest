import { apiSlice } from "../../../services/apiSlice"




const cancelBookingApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        cancelBooking:builder.mutation({
            query:(data)=>({
                url:`/booking/cancel-booking/${data.booking_id}`,
                method:'POST',
                body:{status:data.status,totalNoOfRooms:data.totalNoOfRooms,
                    room_id:data.room_id,user_id:data.user_id,amount:data.amount}
            }),
            invalidatesTags:['single-booking-details']
        })
    })
})


export const {useCancelBookingMutation}=cancelBookingApiSlice;