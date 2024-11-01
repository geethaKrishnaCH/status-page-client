import React, { useState } from "react";
import Modal from "../../common/Modal";
import AddEventButton from "./AddEventButton";
import IncidentCard from "./IncidentCard";
import IncidentForm from "./IncidentForm";

const incidentData = [
  {
    id: 1,
    name: "Database Connectivity Issue",
    status: "Degraded",
    lastUpdated: "2024-10-31 12:30 PM",
    services: ["Database Service", "API Gateway", "Authentication Service"],
    updates: [
      {
        status: "operational",
        message: "All systems are functional.",
        timestamp: "2024-10-30T08:00:00Z",
      },
      {
        status: "maintenance",
        message: "Scheduled maintenance is in progress.",
        timestamp: "2024-10-30T12:00:00Z",
      },
      {
        status: "degraded",
        message: "Some systems are experiencing delays.",
        timestamp: "2024-10-30T14:00:00Z",
      },
      {
        status: "outage",
        message: "Major outage affecting multiple services.",
        timestamp: "2024-10-30T16:00:00Z",
      },
    ],
  },
];

function IncidentList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Current Incidents</h2>
        <AddEventButton label="Add" onClick={() => setIsModalOpen(true)} />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={"Add Incident"}
        >
          <IncidentForm />
        </Modal>
      </div>
      {incidentData.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} />
      ))}
    </div>
  );
}

export default IncidentList;
