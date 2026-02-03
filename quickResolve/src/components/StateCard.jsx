import React from "react";

function StatCard({ title, value }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}

export default StatCard;
