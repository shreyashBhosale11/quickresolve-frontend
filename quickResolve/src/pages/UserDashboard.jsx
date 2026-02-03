import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ticketSerive from "../appwrite/config";
import { StatCard } from "../components/index";

function UserDashboard() {
  const user  = useSelector((state) => state.auth.userData);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; 
    const fetchTickets = async () => {
      try {
        const res = await ticketSerive.getUserTicket({ userId: user.$id });
        setTickets(res.documents);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [user]);
  
  
  // Show loading / fallback if user is null
  if (!user) {
    return (
      <div className="p-6 text-gray-500">
        Loading user information...
      </div>
    );
  }

  // Stats
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const closed = tickets.filter((t) => t.status === "closed").length;

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800">
        Welcome, {user.name}!
      </h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Tickets" value={total} />
        <StatCard title="Open Tickets" value={open} />
        <StatCard title="Closed Tickets" value={closed} />
      </div>

      {/* Create Ticket Button */}
      <div>
        <Link to="/addticket">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Create Ticket
          </button>
        </Link>
      </div>

      {/* Recent Tickets Table */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Tickets</h2>
        {loading ? (
          <p className="text-gray-500">Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-gray-500">You have no tickets yet.</p>
        ) : (
          <table className="w-full table-auto text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">Title</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Created At</th>
                <th className="py-2 px-3">View</th>
              </tr>
            </thead>
            <tbody>
              {tickets.slice(0, 5).map((ticket) => (
                <tr key={ticket.$id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">{ticket.title}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        ticket.status === "open"
                          ? "bg-green-500"
                          : ticket.status === "closed"
                          ? "bg-gray-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    {new Date(ticket.$createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3">
                    <Link
                      to={`/ticket/${ticket.$id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
