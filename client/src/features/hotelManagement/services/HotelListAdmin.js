import { apiSlice } from "../../../services/apiSlice"

export const hotelsAdminApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getHotelsForAdmin:builder.query({
            query:(data)=>`/hotel/get-all-hotels-admin`,
             providesTags:['Hotels']
        })
        
    })
})


export const {useGetHotelsForAdminQuery}=hotelsAdminApiSlice