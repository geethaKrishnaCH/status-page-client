import React, { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import AddEventButton from "./AddEventButton";
import IncidentCard from "./IncidentCard";
import IncidentForm from "./IncidentForm";
import useAxios from "../../../stores/axios";
import useIncidentsAPI from "../../../utils/services/incident";
import useAccessContext from "../../../stores/access-control";
import useOrganizationAPI from "../../../utils/services/organization";

function IncidentList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const { orgInfo } = useAccessContext();
  const axiosInstance = useAxios();
  const { addIncident } = useIncidentsAPI(axiosInstance);
  const { fetchOrganizationIncidents } = useOrganizationAPI(axiosInstance);

  const handleAddIncident = async (payload) => {
    await addIncident(payload);
    setIsModalOpen(false);
    getOrganizationIncidents();
  };

  const getOrganizationIncidents = async () => {
    const res = await fetchOrganizationIncidents(orgInfo.organizationId);
    setIncidents(res.data);
  };

  const fetchIncidentUpdates = async (incidentId) => {};

  useEffect(() => {
    if (orgInfo.organizationId) {
      getOrganizationIncidents();
    }
  }, [orgInfo.organizationId]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-slate-800">Incidents</h2>
        <AddEventButton label="Add" onClick={() => setIsModalOpen(true)} />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={"Add Incident"}
        >
          <IncidentForm onSubmit={handleAddIncident} />
        </Modal>
      </div>
      <div className="space-y-4">
        {(!incidents || incidents.length === 0) && (
          <h2 className="py-4 text-lg text-center font-normal italic">
            No Incidents
          </h2>
        )}
        {incidents.map((incident) => (
          <IncidentCard
            key={incident.id}
            incident={incident}
            onUpdate={fetchIncidentUpdates}
          />
        ))}
      </div>
    </div>
  );
}

export default IncidentList;
