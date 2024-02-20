import { apiSlice } from "../../../services/apiSlice";


const salesReportApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getSalesReport:builder.query({
            query:(data)=>`/sales/get-all-sales-report-for-admin`,
            keepUnusedDataFor: 1,
        }),
        getSalesReportByDate:builder.mutation({
            query:(data)=>`/sales/get-sales-by-date-admin/${data.startDate}/${data.endDate}`
        })

    })
})

export const {useGetSalesReportQuery,useGetSalesReportByDateMutation}=salesReportApiSlice;