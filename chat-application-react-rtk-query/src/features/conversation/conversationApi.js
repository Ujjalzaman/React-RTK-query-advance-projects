import { apiSlice } from "../api/apiSlice";
import { messagesApi } from '../messages/messagesApi';
import io from 'socket.io-client';

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //endpoints here
        getConversations: builder.query({
            query: (email) =>
                `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=5`,
            transformResponse(apiResponse, meta){
                const totalCount = meta.response.headers.get('X-Total-Count');
                return {
                    data: apiResponse,
                    totalCount
                }
            },
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                //create socket 
                const socket = io("http://localhost:9000", {
                    reconnectionDelay: 1000,
                    reconnection: true,
                    reconnectionAttemps: 10,
                    transports: ["websocket"],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false,
                });

                try {
                    await cacheDataLoaded;
                    socket.on("conversation", (data) => {
                        updateCachedData((draft) => {
                            const conversation = draft.find((c) => c.id == data?.data?.id)
                            if (conversation?.id) {
                                conversation.message = data?.data?.message;
                                conversation.timestamp = data?.data?.timestamp;
                            } else {
                                conversation.push(data.data)
                            }
                        })
                    })
                } catch (err) { }
                await cacheEntryRemoved;
                socket.close();

            }
        }),
        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) =>
                `/conversations?participants_like=${userEmail}-${participantEmail}&&${participantEmail}-${userEmail}`
        }),
        addConversation: builder.mutation({
            query: ({ sendar, data }) => ({
                url: '/conversations',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const conversation = await queryFulfilled;
                if (conversation?.data?.id) {
                    //silently entry to message table
                    const users = arg.data.users;
                    const senderUser = users.find((user) => user.email === arg.sender)
                    const receiverUser = users.find((user) => user.email !== arg.sender)
                    dispatch(messagesApi.endpoints.addMessage.initiate({
                        conversationId: conversation.data.id,
                        sender: senderUser,
                        receiver: receiverUser,
                        message: arg.data.message,
                        timestamp: arg.data.timestamp
                    }))
                }
            }
        }),
        editConversation: builder.mutation({
            query: ({ id, data, sender }) => ({
                url: `/conversations/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                //Optimistic cashe update
                const pathResult = dispatch(apiSlice.util.updateQueryData("getConversations", arg.sender, (draft) => {
                    let draftConversation = draft.find((c) => c.id == arg.id)
                    draftConversation.message = arg.data.message;
                    draftConversation.timestamp = arg.data.timestamp;

                }));
                // End Optimistic
                try {
                    const conversation = await queryFulfilled;
                    if (conversation?.data?.id) {
                        //silently entry to message table
                        const users = arg.data.users;
                        const senderUser = users.find((user) => user.email === arg.sender)
                        const receiverUser = users.find((user) => user.email !== arg.sender)


                        const res = await dispatch(messagesApi.endpoints.addMessage.initiate({
                            conversationId: conversation?.data.id,
                            sender: senderUser,
                            receiver: receiverUser,
                            message: arg.data.message,
                            timestamp: arg.data.timestamp
                        })).unwrap()
                        // start Pessimistic cache
                        dispatch(apiSlice.util.updateQueryData(
                            "getMessages",
                            res.conversationId.toString(),
                            (draft) => {
                                draft.push(res)
                            }));
                    }
                } catch (err) {
                    pathResult.undo();
                }
            }
        }),
    })
});

export const { useGetConversationsQuery, useGetConversationQuery, useAddConversationMutation, useEditConversationMutation } = conversationApi;