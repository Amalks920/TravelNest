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
            query:()=>`/coupon/get-all-coupons-owner`
        }),
        getAllCouponsLength:builder.query({
            query:()=>`/coupon/get-all-coupons-owner-length`
        })
    })
})

export const {useAddCouponMutation,useGetAllCouponsQuery,useGetAllCouponsLengthQuery} = couponApiSlice;