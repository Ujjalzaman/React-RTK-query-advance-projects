import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //endpoints here
        getMessages : builder.query({
            query: (id) =>
            `/messages?coversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=5` 
        }),
        addMessage: builder.mutation({
            query: (data) => ({
                url: '/messages',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const {useGetMessagesQuery, useAddMessageMutation} = messagesApi;