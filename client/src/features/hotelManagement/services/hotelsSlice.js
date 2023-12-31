import { apiSlice } from "../../../services/apiSlice"

export const hotelsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getHotels:builder.query({
            query:(data)=>`/hotel/get-all-hotels/${data.userId}`,
            providesTags:['Hotels']
        })
        
    })
})


export const {useGetHotelsQuery}=hotelsApiSlice