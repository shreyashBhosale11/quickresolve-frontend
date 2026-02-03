import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ticketSerive from "../appwrite/config";
import { StatCard } from "../components/index";

function AgentDashboard() {
  const agent = useSelector((state) => state.auth.userData); // agent info from redux
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!agent) return;

    const fetchTickets = async () => {
      try {
        // Fetch tickets assigned to this agent
        const res = await ticketSerive.getAgentTicket({ agentId: agent.$id });
        setTickets(res.documents);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [agent]);

  // Show fallback if agent is not yet loaded
  if (!agent) {
    return (
      <div className="p-6 text-gray-500">
        Loading agent information...
      </div>
    );
  }

  // Stats
  const total = tickets.length;
const open = tickets.filter(t => t.status === "open").length;
const inProgress = tickets.filter(t => t.status === "in progress").length;
const closed = tickets.filter(t => t.status === "closed").length;


  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800">
        Agent Dashboard
      </h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
  <StatCard title="Total Tickets" value={total} />
  <StatCard title="Open" value={open} />
  <StatCard title="In Progress" value={inProgress} />
  <StatCard title="Closed" value={closed} />
</div>


   
      {/* Recent Tickets Table */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Assigned Tickets</h2>
        {loading ? (
          <p className="text-gray-500">Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-gray-500">No tickets assigned yet.</p>
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

export default AgentDashboard;
