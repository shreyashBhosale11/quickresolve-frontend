import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { CreditCard } from 'appwrite'
import ticketSerive from '../appwrite/config'
import { createTicket } from '../store/ticketSlice'

function TicketCard() {
    
    const cards = useSelector((state) =>state.ticket.tickets);
    const dispatch = useDispatch();

   

    

    
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
        return<p>No carde found</p>
    }
    
  return (
    
    <>
        {cards.map((card)=>(
            <div key={card.$id} className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs">
        <a href="#">
            <img className="rounded-base" src={card.attachmentid ? ticketSerive.getFileUrl(card.attachmentid) : "/default-image.jpg"}
  alt={card.title} />
        </a>
        <a href="#">
            <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">{card.title}</h5>
        </a>
        <p className="mb-6 text-body">{card.description}</p>
        <a href="#" className="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
            Read more
            <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
        </a>
    </div>
        ))}

    
    </>

  )
}

export default TicketCard