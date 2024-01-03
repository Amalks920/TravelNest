import { apiAuthSlice } from "../../../services/apiAuthSlice";


const getRoomsByHotelIdApiSlice=apiAuthSlice.injectEndpoints({
    endpoints:builder=>({
        getAllRoomsOfHotel:builder.query({
            query:(data)=>`/room/get-rooms/${data.hotel_id}`,
            transformResponse:(response)=>response.response
        })
    })
})


export const {useGetAllRoomsOfHotelQuery}=getRoomsByHotelIdApiSlice