import { apiSlice } from "../../../services/apiSlice"




const cancelBookingApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        cancelBooking:builder.mutation({
            query:(data)=>({
                url:`/booking/cancel-booking/${data.booking_id}`,
                method:'POST',
                body:{status:data.status}
            })
        })
    })
})


export const {useCancelBookingMutation}=cancelBookingApiSlice;