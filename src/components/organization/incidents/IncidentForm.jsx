import React, { useEffect, useState } from "react";
import useAccessContext from "../../../stores/access-control";
import useUIConfig from "../../../utils/constants";

function IncidentForm({ mode = "create", incident = null, onSubmit }) {
  const [incidentData, setIncidentData] = useState({
    id: incident?.id,
    title: incident?.name || "",
    description: incident?.description || "",
    status: incident?.status || "",
    serviceStatus: incident?.serviceStatus || "",
    message: incident?.lastMessage || "",
    selectedServices: incident?.services.map((ser) => ser.id) || [],
  });

  const { services } = useAccessContext();
  const { SERVICE_STATUS_LIST, INCIDENT_STATUS_LIST } = useUIConfig();

  // For selecting or unselecting a service
  const handleServiceSelection = (serviceId) => {
    if (mode === "update") return; // Disable serviceId selection in update mode if needed
    const prevSelected = incidentData.selectedServices;
    const selectedServices = prevSelected.includes(serviceId)
      ? prevSelected.filter((s) => s !== serviceId)
      : [...prevSelected, serviceId];
    setIncidentData((prev) => ({ ...prev, selectedServices }));
  };

  useEffect(() => {
    if (incidentData.selectedServices.length === 0) {
      setIncidentData((prev) => ({ ...prev, serviceStatus: "" }));
    }
  }, [incidentData.selectedServices]);

  const handleSubmit = async () => {
    onSubmit(incidentData);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Incident name
        </label>
        <input
          type="text"
          value={incidentData.title}
          onChange={(e) =>
            setIncidentData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Errors in the admin portal"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={mode === "update"} // Disable if in update mode
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={incidentData.description}
          onChange={(e) =>
            setIncidentData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Describe the incident"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
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
              onClick={() =>
                setIncidentData((prev) => ({ ...prev, status: option.code }))
              }
              className={`flex-1 py-2 text-center border-r ${
                incidentData.status === option.code
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
        <div className="grid grid-cols-3 gap-y-2 border rounded-md p-2 max-h-32 overflow-y-auto">
          {services.map((service) => (
            <label key={service.id} className="flex items-center">
              <input
                type="checkbox"
                value={service.id}
                checked={incidentData.selectedServices.includes(service.id)}
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
      {incidentData.selectedServices.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Set Status for Selected Services
          </label>
          <div className="flex border rounded-md overflow-hidden">
            {SERVICE_STATUS_LIST.map((option) => (
              <button
                disabled={mode === "update"}
                key={option.code}
                onClick={() =>
                  setIncidentData((prev) => ({
                    ...prev,
                    serviceStatus: option.code,
                  }))
                }
                className={`flex-1 py-2 text-center border-r ${
                  incidentData.serviceStatus === option.code
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
          value={incidentData.message}
          onChange={(e) =>
            setIncidentData((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Describe the current status of the incident..."
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
