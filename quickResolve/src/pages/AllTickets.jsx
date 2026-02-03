
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import ticketSerive from '../appwrite/config'
import { createTicket } from '../store/ticketSlice'
import TicketCard from '../components/TicketCard'

   
function AllTickets() {
     
    const cards = useSelector((state) =>state.ticket.tickets);
    const dispatch = useDispatch();
    const role = useSelector((state) => state.auth.role);

   
  
    useEffect(() => {
    const fetchTickets = async () => {
        const response = await ticketSerive.getAllTickets();
        if (response?.documents) {
        dispatch(createTicket(response.documents));
        }
    }



        fetchTickets();

            },[ dispatch])

    if(!cards || cards.length === 0){
        return(
              <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                No tickets found
            </div>
        )
    }
return (
    <div>
      <h2 className="text-2xl font-semibold mb-1">Your Tickets</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Track and manage all support requests
      </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cards.map((ticket) => (
                <div key={ticket.$id}>
                <TicketCard key={ticket.$id} ticket={ticket} />
                </div>
            ))}
            </div>
    </div>
  )
}

export default AllTickets