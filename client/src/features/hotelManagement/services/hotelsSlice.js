import { apiSlice } from "../../../services/apiSlice"

export const hotelsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getHotels:builder.query({
            query:()=>'/hotel/get-all-hotels',
            providesTags:['Hotels']
        })
        
    })
})


export const {useGetHotelsQuery}=hotelsApiSlice