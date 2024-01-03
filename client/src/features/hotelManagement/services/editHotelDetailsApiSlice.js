import { apiSlice } from "../../../services/apiSlice";


const editHotelDetailsApiSlice=apiSlice.injectEndpoints({
   endpoints:builder=>({
    editHotelDetails:builder.mutation({
        query:(data)=>({
            url: `/hotel/edit-hotel-details/${data._id}`,
            method: "PUT",
            body: data
        })
    })
   })
})


export const {useEditHotelDetailsMutation}=editHotelDetailsApiSlice;