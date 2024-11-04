import React, { useState } from "react";

// Sample maintenance data
const maintenanceEvents = [
  {
    id: 1,
    name: "Database Upgrade",
    description: "Upgrading database to the latest version",
    startTime: "2023-10-30T02:00",
    endTime: "2023-10-30T06:00",
    affectedService: "Service A",
  },
  {
    id: 2,
    name: "Server Maintenance",
    description: "Routine server maintenance",
    startTime: "2023-11-01T01:00",
    endTime: "2023-11-01T05:00",
    affectedService: "Service B",
  },
];

const ActiveMaintenanceEvents = () => {
  const [events, setEvents] = useState(maintenanceEvents);

  if (!events || events.length === 0) {
    // return (
    //   <div className="p-4 bg-white rounded-lg shadow-md">
    //     <h2 className="text-2xl text-center font-semibold">No Incidents</h2>
    //   </div>
    // );
    return null;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Active Maintenance Events</h2>
      {maintenanceEvents.length > 0 ? (
        <ul className="space-y-4">
          {maintenanceEvents.map((event) => (
            <li key={event.id} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{event.name}</h3>
                <span className="text-sm text-gray-500">
                  Affected: {event.affectedService}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{event.description}</p>
              <div className="text-sm text-gray-600">
                <p>Start Time: {new Date(event.startTime).toLocaleString()}</p>
                <p>End Time: {new Date(event.endTime).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No active maintenance events.</p>
      )}
    </div>
  );
};

export default ActiveMaintenanceEvents;
