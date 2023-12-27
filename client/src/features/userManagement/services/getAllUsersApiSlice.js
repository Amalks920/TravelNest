import { apiSlice } from "../../../services/apiSlice";


export const getAllUsersApiSlice=apiSlice.injectEndpoints({
        endpoints:builder=>({
            getAllUser:builder.query({
                query:()=> '/user/get-all-users',
                providesTags: ['Users'],
               transformResponse:(response,meta,args)=>response.response 
            })
        })
})


export const {useGetAllUserQuery}=getAllUsersApiSlice;



