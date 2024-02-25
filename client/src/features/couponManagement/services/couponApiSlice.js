import { apiSlice } from "../../../services/apiSlice";


const couponApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        addCoupon:builder.mutation({
            query:(data)=>({
             url:`/coupon/add-coupon`,
             method:'post',
             body:data.values
            })
        }),
        getAllCoupons:builder.query({
            query:()=>`/coupon/get-all-coupons-owner`,
            providesTags:['coupons']
        }),
        
        
        getAllCouponsLength:builder.query({
            query:()=>`/coupon/get-all-coupons-owner-length`
        }),
        deListCoupon:builder.mutation({
            query:(data)=>({
                url:`/coupon/delistCoupon/${data.id}`,
                method:'post',
                body:data
            }),
            invalidatesTags:['coupons']
        })
    })
})

export const {
    useAddCouponMutation,useGetAllCouponsQuery,
    useGetAllCouponsLengthQuery,useDeListCouponMutation
} = couponApiSlice;