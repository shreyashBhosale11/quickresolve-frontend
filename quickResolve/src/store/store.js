import {configureStore} from "@reduxjs/toolkit"
import authSliceReducer from "./authSlice";
import TicketSlice from "./ticketSlice"

const store = configureStore({
    reducer:{
        auth : authSliceReducer,
        ticket: TicketSlice,
    }
})

export default store;