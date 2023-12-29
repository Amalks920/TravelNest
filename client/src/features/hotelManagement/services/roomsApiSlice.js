import { apiSlice } from "../../../services/apiSlice"

export const roomsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getRooms:builder.query({
            query:(data)=>{
                console.log(data._id)
               return  `/room/get-rooms-list/${data?._id}`
            },
            transformErrorResponse:(response)=>response.response
        })
        
    })
})


export const {useGetRoomsQuery}=roomsApiSlice