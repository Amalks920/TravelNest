import { apiSlice } from "../../../services/apiSlice";

const getUserInfoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfoForUser: builder.query({
      query: (data) => `/user/get-user-details-for-user/${data.user_id}`,
    }),
    getWalletDetails: builder.query({
      query: (data) => `/user/get-wallet-details/${data.user_id}`,
    }),
    getWalletHistory: builder.query({
      query: (data) =>
        `/wallet/get-wallet-history/${data.wallet_id}/${data.pageNumber}`,
    }),
    getWalletHistoryLength: builder.query({
      query: (data) => `/wallet/get-wallet-history-length/${data.wallet_id}`,
    }),
  }),
});

export const {
  useGetUserInfoForUserQuery,
  useGetWalletDetailsQuery,
  useGetWalletHistoryQuery,
  useGetWalletHistoryLengthQuery
} = getUserInfoApiSlice;
