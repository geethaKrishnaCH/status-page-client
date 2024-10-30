import React, { useState } from "react";

const initialServices = [
  { id: 1, name: "Service A", status: "Operational", availability: 99.9 },
  { id: 2, name: "Service B", status: "Maintenance", availability: 98.5 },
  { id: 3, name: "Service C", status: "Degraded", availability: 95.2 },
  { id: 4, name: "Service D", status: "Outage", availability: 92.3 },
  { id: 5, name: "Service E", status: "Operational", availability: 99.7 },
];

function HomeServiceView() {
  const [services, setServices] = useState(initialServices);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Service Status</h2>
      </div>
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
          >
            {/* Service Info */}
            <div>
              <h3 className="text-lg font-medium">{service.name}</h3>
              <p className="text-sm text-gray-600">
                Availability: {service.availability}%
              </p>
            </div>

            {/* Status Indicator */}
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
            </div>
          </div>
        ))}
      </div>
      <button className="text-blue-500 hover:underline mt-4">View More</button>
    </div>
  );
}

export default HomeServiceView;
