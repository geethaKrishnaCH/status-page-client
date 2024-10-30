import React, { useState } from "react";
import { FaEdit } from "react-icons/fa"; // Importing icons
import AddServiceForm from "./AddServiceForm";

// Sample service data
const initialServices = [
  { id: 1, name: "Service A", status: "Operational", availability: 99.9 },
  { id: 2, name: "Service B", status: "Maintenance", availability: 98.5 },
  { id: 3, name: "Service C", status: "Degraded", availability: 95.2 },
  { id: 4, name: "Service D", status: "Outage", availability: 92.3 },
  { id: 5, name: "Service E", status: "Operational", availability: 99.7 },
];

function Services() {
  const [services, setServices] = useState(initialServices);

  const handleStatusUpdate = (id) => {
    const updatedStatus = prompt("Enter new status for the service:");
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id
          ? { ...service, status: updatedStatus || service.status }
          : service
      )
    );
  };

  return (
    <div className="px-8 py-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold">Service Status</h2>
        <AddServiceForm />
      </div>
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
          >
            <div>
              <h3 className="text-lg font-medium">{service.name}</h3>
              <p className="text-sm text-gray-600">
                Availability: {service.availability}%
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  service.status === "Operational"
                    ? "bg-green-100 text-green-600"
                    : service.status === "Maintenance"
                    ? "bg-yellow-100 text-yellow-600"
                    : service.status === "Degraded"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {service.status}
              </span>
              <button
                onClick={() => handleStatusUpdate(service.id)}
                className="ml-2 text-gray-600 hover:text-blue-500"
              >
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
