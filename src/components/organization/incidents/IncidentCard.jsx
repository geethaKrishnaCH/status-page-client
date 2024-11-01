import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "../../common/Modal";
import IncidentForm from "./IncidentForm";
import IncidentUpdates from "./IncidentUpdates";

const IncidentCard = ({ incident }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleDetails = () => setShowDetails(!showDetails);

  const statusColor = {
    Operational: "text-green-600",
    Degraded: "text-yellow-600",
    Outage: "text-red-600",
  };

  return (
    <div className="p-5 border border-gray-200 rounded-xl shadow-lg bg-white">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-gray-800">{incident.name}</h3>

        <div className="flex items-center">
          <span
            className={`h-2 w-2 rounded-full mr-2 ${
              incident.status === "Operational"
                ? "bg-green-500"
                : incident.status === "Degraded"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></span>
          <p className={`text-sm font-medium ${statusColor[incident.status]}`}>
            Status: {incident.status}
          </p>
        </div>

        <p className="text-xs text-gray-500">
          Last updated: {incident.lastUpdated}
        </p>

        <div>
          <p className="text-sm font-semibold text-gray-700">
            Affected Services:
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {incident.services.map((service, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 text-xs font-semibold text-gray-700 bg-blue-100 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            className="flex gap-2 items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
            onClick={handleToggleDetails}
          >
            <FaInfoCircle className="text-white" title="View Details" />
            Details
          </button>

          <button
            type="button"
            className="flex gap-2 items-center bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            Update
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={"Add Incident"}
          >
            <IncidentForm incident={incident} mode="update" />
          </Modal>
        </div>
      </div>

      <Modal
        title={"Incident Updates Timeline"}
        isOpen={showDetails}
        onClose={handleToggleDetails}
      >
        <IncidentUpdates updates={incident.updates} />
      </Modal>
    </div>
  );
};

export default IncidentCard;
