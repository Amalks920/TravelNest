import { apiSlice } from "../../../services/apiSlice";


const paymentApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        payment:builder.mutation({
            query:(data)=>({
                url: `/payment/payment`,
                method: "POST",
                body: data,       
            })
        })
    })
})


export const {usePaymentMutation}=paymentApiSlice

