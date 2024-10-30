import React from "react";

function RecentIncidents() {
  const incidents = [
    { id: 1, title: "Outage in Service A", date: "2023-10-29" },
    { id: 2, title: "Degraded Performance in Service B", date: "2023-10-30" },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Recent Incidents</h2>
      <div className="space-y-4">
        {incidents.map((incident, index) => (
          <div key={index} className="bg-gray-50 border rounded-md p-4">
            <h3 className="font-bold text-lg">{incident.title}</h3>
            <p className="text-gray-500">{incident.date}</p>
            <p className="mt-2">{incident.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentIncidents;
