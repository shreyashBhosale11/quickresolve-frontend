import {configureStore} from "@reduxjs/toolkit"
import authSliceReducer from "./authSlice";
import TicketSlice from "./ticketSlice"
import ReplySliceReducer from "./replySlice";

const store = configureStore({
    reducer:{
        auth : authSliceReducer,
        ticket: TicketSlice,
        reply: ReplySliceReducer
    }
})

export default store;