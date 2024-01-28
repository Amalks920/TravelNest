import { apiSlice } from "../../../services/apiSlice";

 const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `/chat`,
        method: "post",
        body: data,
      }),
      invalidatesTags:['messages']
    }),
    getMessages: builder.query({
      query: (data) => `/chat/${data.recipient_id}/${data.user_id}`,
      providesTags:['messages']
    }),
    getConversations: builder.query({
      query: (data) => `/chat/conversations/${data.user_id}`,
      providesTags:['messages']
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useSendMessageMutation,
  useGetMessagesQuery,
} = chatApiSlice;
