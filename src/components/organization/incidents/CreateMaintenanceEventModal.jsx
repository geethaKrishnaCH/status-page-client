import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAccessContext from "../../../stores/access-control";

function CreateMaintenanceEventModal() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const { services } = useAccessContext();

  const handleServiceSelection = (service) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((s) => s !== service)
        : [...prevSelected, service]
    );
  };

  const handleSubmit = () => {
    const maintenanceEventData = {
      eventName,
      eventDate,
      duration,
      description,
      affectedServices: selectedServices,
    };
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Event Name
        </label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Scheduled Database Maintenance"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Flex container for Event Date and Duration */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <DatePicker
            selected={eventDate}
            onChange={(date) => setEventDate(date)}
            dateFormat="MMMM d, yyyy" // Customize date format as needed
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Select event date"
          />
        </div>
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (in hours)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="2"
            min={1}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the maintenance event..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Affected Services
        </label>
        <div className="grid grid-cols-3 border rounded-md p-2 max-h-32 overflow-y-auto">
          {services.map((service) => (
            <label key={service.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={service.name}
                checked={selectedServices.includes(service.id)}
                onChange={() => handleServiceSelection(service.id)}
                className="mr-2"
              />
              {service.name}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Create Maintenance Event
      </button>
    </div>
  );
}

export default CreateMaintenanceEventModal;
