import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "../../common/Modal";
import IncidentForm from "./IncidentForm";
import IncidentUpdates from "./IncidentUpdates";
import useUIConfig from "../../../utils/constants";
import useAxios from "../../../stores/axios";
import useIncidentsAPI from "../../../utils/services/incident";

const IncidentCard = ({ incident, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosInstance = useAxios();
  const { updateIncident } = useIncidentsAPI(axiosInstance);
  const { INCIDENT_STATUS_LIST } = useUIConfig();
  const incidentConfig = INCIDENT_STATUS_LIST.find(
    (inc) => inc.code === incident.status
  );

  const isResovled = incidentConfig.resolved;

  const handleToggleDetails = () => setShowDetails(!showDetails);

  const handleUpdateIncident = async (incidentData) => {
    console.log(incidentData);
    await updateIncident(incidentData);
    onUpdate(incidentData.id);
    setIsModalOpen(false);
  };

  return (
    <div className="p-5 border border-gray-200 rounded-xl shadow-lg bg-white">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            {incident.name}
          </h3>
          <div className="flex items-center">
            <span
              className={`h-2 w-2 rounded-full mr-2 ${incidentConfig.classes.background}`}
            ></span>
            <p
              className={`text-sm font-medium ${incidentConfig.classes.textColor}`}
            >
              Status: {incidentConfig.label}
            </p>
          </div>
        </div>
        <p className="text-sm w-4/5 text-gray-500">{incident.description}</p>
        <p className="text-xs text-gray-500">
          Last updated: {incident.lastUpdated}
        </p>

        <div className="flex justify-between items-center">
          <div className="w-3/5">
            <p className="text-sm font-semibold text-gray-700">
              Affected Services:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {incident.services.map((service, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 text-xs font-semibold text-gray-700 bg-blue-100 rounded-full"
                >
                  {service.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end w-2/5 gap-3 mt-4">
            <button
              type="button"
              className="flex gap-2 items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
              onClick={handleToggleDetails}
            >
              <FaInfoCircle className="text-white" title="View Details" />
              Details
            </button>

            {!isResovled && (
              <>
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
                  <IncidentForm
                    incident={incident}
                    mode="update"
                    onSubmit={handleUpdateIncident}
                  />
                </Modal>
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        title={"Incident Updates Timeline"}
        isOpen={showDetails}
        onClose={handleToggleDetails}
      >
        <IncidentUpdates incidentId={incident.id} publicView={false} />
      </Modal>
    </div>
  );
};

export default IncidentCard;
