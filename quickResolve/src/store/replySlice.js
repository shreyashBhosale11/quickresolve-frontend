import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    replies: [],
};

const ReplySlice = createSlice({
    name: "Reply",
    initialState,
    reducers: {

        // SET replies (when fetched) OR ADD reply (when created)
        createReply: (state, action) => {
            if (Array.isArray(action.payload)) {
                // setting replies from Appwrite
                state.replies = action.payload.map(reply => ({
                    id: reply.$id,
                    ticketId: reply.ticketId,
                    message: reply.message,
                    sendersId: reply.sendersId,
                    sendersRole: reply.sendersRole,
                    createdAt: reply.$createdAt,
                }));
            } else {
                // adding single reply
                const { ticketId, message, senderId, senderRole } = action.payload;

                state.replies.push({
                    id: Date.now(), // temp UI id
                    ticketId,
                    message,
                    senderId,
                    senderRole,
                    createdAt: new Date().toISOString(),
                });
            }
        },

        // CLEAR replies when changing ticket
        clearReplies: (state) => {
            state.replies = [];
        },
    },
});

const ReplySliceReducer =ReplySlice.reducer;

export const { createReply, clearReplies } = ReplySlice.actions;
export default ReplySliceReducer;
