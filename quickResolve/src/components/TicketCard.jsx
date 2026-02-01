import React from "react"
import ticketSerive from "../appwrite/config"
import { useNavigate } from "react-router-dom"





function TicketCard({ ticket }) {

  const navigate = useNavigate();
const onView = ()=>{
  
  navigate(`/ticket/${ticket.id}`)
  
}

  return (
    <div 
      className="
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-xl
        shadow-sm
        overflow-hidden
        flex flex-col
        transition-all
        hover:shadow-md hover:-translate-y-1
      "
    >
      {/* Image */}
      <img
        className="w-full h-44 object-cover"
        src={
          ticket.attachmentid
            ? ticketSerive.getFileUrl(ticket.attachmentid)
            : "/default-image.jpg"
        }
        alt={ticket.title}
      />

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h5 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
          {ticket.title}
        </h5>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {ticket.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs mb-4">
          {/* Priority */}
          <span
            className={`px-2 py-1 rounded-full font-medium
              ${
                ticket.priority === "high"
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                  : ticket.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                  : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
              }
            `}
          >
            {ticket.priority || "low"} priority
          </span>

          {/* Status */}
          <span
            className={`px-2 py-1 rounded-full font-medium
              ${
                ticket.status === "open"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }
            `}
          >
            {ticket.status || "open"}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Created: {new Date(ticket.createdAt).toLocaleDateString()}
          </span>

          <button onClick={onView}
            className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            View
            <svg
              className="w-4 h-4 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TicketCard
