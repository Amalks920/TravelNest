import { apiSlice } from "../../../services/apiSlice";


const getAllHotelsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getAllHotel:builder.query({
            query:()=> '/hotel/get-all-hotels-user',
             transformErrorResponse:(response)=>response.response
        }),
        getAllRoomsInHotel:builder.mutation({
            query:(data)=>({
                url:`/room/get-all-rooms-user/${data.hotel_id}`,
                method:'POST',
                body:data
            })
        })
    })
})



export const {useGetAllHotelQuery,useGetAllRoomsInHotelMutation}=getAllHotelsApiSlice