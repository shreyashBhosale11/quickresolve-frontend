import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   tickets:[],
}

const TicketSlice = createSlice({
    name: "Ticket",
    initialState,
    reducers:{
// slice
createTicket: (state, action) => {
  if (Array.isArray(action.payload)) {
    
    state.tickets = action.payload.map(ticket => ({
      id: ticket.$id,
      title: ticket.title,
      description: ticket.description,
      userId: ticket.userId,
      priority: ticket.priority,
      agentId: ticket.agentId || null,
      status: ticket.status,
      attachmentid: ticket.attachmentid || null,
    }));
  } else {
   
    const { title, description, userId, priority, attachmentid } = action.payload;
    state.tickets.push({
      id: Date.now(),
      title,
      description,
      userId,
      priority,
      agentId: null,
      status: 'open',
      attachmentid,
    });
  }
}
,

        updateTicket:(state , action )=>{

            const {id , updates} = action.payload

            const ticket = state.tickets.find(
                (ticket)=> ticket.id === id
            )

            if(ticket){
                Object.assign(ticket, updates)
            }
            

        },

        deleteTicket:(state , action)=>{
            const id = action.payload;
            state.tickets = state.tickets.filter((ticket) =>ticket.id !== id)
            
        }

    }
})

export const  {createTicket , updateTicket ,deleteTicket} = TicketSlice.actions;

export default TicketSlice.reducer;