import { apiSlice } from "../../../services/apiSlice";


const editRoomDetailsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        editRoomDescription:builder.mutation({
            query:(data)=>({
                url: `/room/edit-room-description/${data._id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags:['get-rooms-of-hotel']
        })
    })
})


export const {useEditRoomDescriptionMutation}=editRoomDetailsApiSlice;