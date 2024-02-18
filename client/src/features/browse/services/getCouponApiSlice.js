import { apiSlice } from "../../../services/apiSlice";


const getCouponApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getAllCoupons:builder.query({
            query:()=>`/coupon/get-all-coupon-owner`
        })
    })
})


export const {useGetAllCouponsQuery}=getCouponApiSlice;