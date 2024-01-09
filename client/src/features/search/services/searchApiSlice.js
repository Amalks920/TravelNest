import { apiSlice } from "../../../services/apiSlice";


const searchApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        searchByLocation:builder.mutation({
            query:(data)=>`/search?location=${data.location}&checkIn=${data.checkIn}&checkout=${data.checkOut}`,
        })
    })
})



export const {useSearchByLocationMutation}=searchApiSlice;