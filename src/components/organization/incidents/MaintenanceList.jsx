import React, { useState } from "react";
import EventCard from "./EventCard";
import AddEventButton from "./AddEventButton";
import Modal from "../../common/Modal";
import CreateMaintenanceEventModal from "./CreateMaintenanceEventModal";

const dummyMaintenanceEvents = [
  { id: 1, title: "Server Upgrade", status: "Maintenance" },
  { id: 2, title: "Database Optimization", status: "Operational" },
  { id: 3, title: "Database Optimization", status: "Operational" },
];

function MaintenanceList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState(dummyMaintenanceEvents);
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Maintenance Events</h2>
        <AddEventButton label="Add" onClick={() => setIsModalOpen(true)} />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={"Add Maintenance Event"}
        >
          <CreateMaintenanceEventModal />
        </Modal>
      </div>
      {events.map((event) => (
        <EventCard key={event.id} title={event.title} status={event.status} />
      ))}
    </div>
  );
}

export default MaintenanceList;
