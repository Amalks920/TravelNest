import { apiSlice } from "../../../services/apiSlice"

export const roomsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getRooms:builder.query({
            query:(data)=>{
                console.log(data._id)
               return  `/room/get-rooms/${data?._id}`
            }
        })
    })
})


export const {useGetRoomsQuery}=roomsApiSlice