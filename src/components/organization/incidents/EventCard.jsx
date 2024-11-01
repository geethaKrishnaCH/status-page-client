import React from "react";

function EventCard({ title, status }) {
  const statusColor =
    status === "Operational"
      ? "bg-green-100 text-green-600"
      : status === "Maintenance"
      ? "bg-yellow-100 text-yellow-600"
      : status === "Degraded"
      ? "bg-orange-100 text-orange-600"
      : "bg-red-100 text-red-600";

  return (
    <div className="flex justify-between items-center p-3 mb-2 border rounded-lg shadow-sm">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}
      >
        {status}
      </span>
    </div>
  );
}

export default EventCard;
