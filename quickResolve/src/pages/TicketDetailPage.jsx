import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ReplyInput, ReplyList, UpdateTicket } from "../components";
import ticketSerive from "../appwrite/config";

function TicketDetailPage() {
  const { ticketId } = useParams();

  const ticket = useSelector((state) =>
    state.ticket.tickets.find((t) => t.id === ticketId)
  );

  if (!ticket) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Ticket not found.</p>
      </div>
    );

  }



  return (
    <div className="!max-w-[1600px] mx-auto p-6">

  <div className="flex flex-col lg:flex-row gap-6">
  {/* Left Column - Ticket Details + Update */}
  <div className="lg:w-3/5 flex flex-col gap-6"> {/* increased width */}
    {/* Ticket Details */}
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-gray-800">{ticket.title}</h1> {/* bigger title */}
      <p className="text-gray-700 text-lg">{ticket.description}</p> {/* bigger description */}

      {/* Ticket Document/Image */}
      {ticket.attachmentid && (
        <img
          src={
            ticket.attachmentid
              ? ticketSerive.getFileUrl(ticket.attachmentid)
              : "/default-image.jpg"
          }
          alt="Ticket Document"
          className="mt-4 rounded-lg border w-full object-cover h-96" // bigger height
        />
      )}

      {/* Priority & User Info */}
      <div className="flex items-center justify-between mt-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            ticket.priority === "high"
              ? "bg-red-100 text-red-700"
              : ticket.priority === "medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {ticket.priority.toUpperCase()}
        </span>
        <span className="text-gray-500 text-sm">User ID: {ticket.userId}</span>
      </div>
    </div>

    {/* Update Form */}
    <div className="bg-white shadow-lg rounded-xl p-6">
      <UpdateTicket ticket={ticket} />
    </div>
  </div>

  {/* Right Column - Replies */}
  <div className="lg:w-2/5 flex flex-col bg-white shadow-lg rounded-xl p-4 max-h-[80vh]">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Replies</h2>
    <div className="flex-1 overflow-y-auto space-y-3 px-2">
      <ReplyList ticketId={ticketId} />
    </div>
    <div className="mt-2">
      <ReplyInput ticketId={ticketId} />
    </div>
  </div>
</div>
</div>
);
}

export default TicketDetailPage;
