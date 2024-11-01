import React, { useEffect, useState } from "react";
import useAccessContext from "../../../stores/access-control";
import useUIConfig from "../../../utils/constants";
import useAxios from "../../../stores/axios";
import useIncidentsAPI from "../../../services/incident";

function IncidentForm({ mode = "create", incident = null }) {
  const [incidentName, setIncidentName] = useState(incident?.name || "");
  const [incidentStatus, setIncidentStatus] = useState(incident?.status || "");
  const [serviceStatus, setServiceStatus] = useState("");
  const [message, setMessage] = useState(incident?.message || "");
  const [selectedServices, setSelectedServices] = useState(
    incident?.services || []
  );
  const { services } = useAccessContext();
  const { SERVICE_STATUS_LIST, INCIDENT_STATUS_LIST } = useUIConfig();
  const axiosInstance = useAxios();
  const { addIncident } = useIncidentsAPI(axiosInstance);

  // For selecting or unselecting a service
  const handleServiceSelection = (service) => {
    if (mode === "update") return; // Disable service selection in update mode if needed
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((s) => s !== service)
        : [...prevSelected, service]
    );
  };

  useEffect(() => {
    if (selectedServices.length === 0) {
      setServiceStatus("");
    }
  }, [selectedServices]);

  const handleSubmit = async () => {
    const payload = {
      incidentName,
      incidentStatus,
      message,
      services: selectedServices,
      serviceStatus,
    };

    if (mode === "create") {
      await addIncident(payload);
      console.log("Creating Incident:", payload);
      // API call for creating the incident
    } else if (mode === "update") {
      console.log("Updating Incident:", payload);
      // API call for updating the incident
    }
  };

  return (
    <div>
      {/* Incident Name Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Incident name
        </label>
        <input
          type="text"
          value={incidentName}
          onChange={(e) => setIncidentName(e.target.value)}
          placeholder="Errors in the admin portal"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={mode === "update"} // Disable if in update mode
        />
      </div>

      {/* Incident Status Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Set Incident Status
        </label>
        <div className="flex border rounded-md overflow-hidden">
          {INCIDENT_STATUS_LIST.map((option) => (
            <button
              key={option.code}
              onClick={() => setIncidentStatus(option.code)}
              className={`flex-1 py-2 text-center border-r ${
                incidentStatus === option.code
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Service Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Services
        </label>
        <div className="grid grid-cols-3 border rounded-md p-2 max-h-32 overflow-y-auto">
          {services.map((service) => (
            <label key={service.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={service.id}
                checked={selectedServices.includes(service.id)}
                onChange={() => handleServiceSelection(service.id)}
                className="mr-2"
                disabled={mode === "update"} // Disable selection in update mode if required
              />
              {service.name}
            </label>
          ))}
        </div>
      </div>

      {/* Service Status Selection */}
      {selectedServices.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Set Status for Selected Services
          </label>
          <div className="flex border rounded-md overflow-hidden">
            {SERVICE_STATUS_LIST.map((option) => (
              <button
                key={option.code}
                onClick={() => setServiceStatus(option.code)}
                className={`flex-1 py-2 text-center border-r ${
                  serviceStatus === option.code
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe the incident details..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {mode === "create" ? "Add Incident" : "Update Incident"}
      </button>
    </div>
  );
}

export default IncidentForm;
