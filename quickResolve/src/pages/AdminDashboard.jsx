import React, { useEffect, useState } from 'react'
import ticketSerive from '../appwrite/config';
import { StatCard } from '../components';

function AdminDashboard() {
   const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
    inProgress: 0,
    closed: 0,
  });


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const tickets = await ticketSerive.getAllTickets();

        setStats({
          total: tickets.total,
          open: tickets.documents.filter(t => t.status === "open").length,
          resolved: tickets.documents.filter(t => t.status === "resolved").length,
          inProgress: tickets.documents.filter(t => t.status === "in progress").length,
          closed: tickets.documents.filter(t => t.status === "closed").length,
        });
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

   return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Admin Dashboard
      </h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Tickets" value={stats.total} />
        <StatCard title="Open" value={stats.open} />
        <StatCard title="In Progress" value={stats.inProgress} />
        <StatCard title="resolved" value={stats.resolved} />
         <StatCard title="Closed" value={stats.closed} />
      </div>
    </div>
  );
}

export default AdminDashboard