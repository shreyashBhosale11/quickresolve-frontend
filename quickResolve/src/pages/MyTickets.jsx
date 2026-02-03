import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ticketService from '../appwrite/config';
import { createTicket } from '../store/ticketSlice';
import TicketCard from '../components/TicketCard';

function MyTickets() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticket.tickets);
  const role = useSelector((state )=> state.auth.role)
  const user = useSelector((state) => state.auth.userData);
  const [myTickets, setMyTickets] = useState([]);
 

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user || !user.$id) return;
      let response;
      if (role === 'agent') {
        response = await ticketService.getAgentTicket({ agentId: user.$id });
      } else {
        response = await ticketService.getUserTicket({ userId: user.$id });
      }

      if (response?.documents) {
        dispatch(createTicket(response.documents));
        setMyTickets(response.documents);
      }
    };
    fetchTickets();
  }, [dispatch, user ,role]);

  if (!myTickets || myTickets.length === 0)
    return <div className="text-center py-16 text-gray-500">You have no tickets</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1">{role==="agent" ?<div>Assigned Ticket</div> :<div>My Ticket</div>}</h2>
      <p className="text-sm text-gray-600 mb-6">Track and manage your submitted tickets</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.$id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

export default MyTickets;
