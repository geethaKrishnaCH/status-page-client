import React, { useEffect, useState } from "react";
import useOrganizationAPI from "../../../utils/services/organization";
import useUIConfig from "../../../utils/constants";
import { useParams } from "react-router-dom";
import useAxios from "../../../stores/axios";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "../../common/Modal";
import IncidentUpdates from "../incidents/IncidentUpdates";

function RecentIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const { organizationId } = useParams();
  const axiosInstance = useAxios();
  const { fetchOrganizationIncidentsForPublicView } =
    useOrganizationAPI(axiosInstance);
  const { INCIDENT_STATUS_LIST } = useUIConfig();

  const handleToggleDetails = (incident) => {
    setShowDetails(!showDetails);
    setSelectedIncident(incident);
  };

  const getOrganizationIncidents = async () => {
    if (organizationId) {
      const res = await fetchOrganizationIncidentsForPublicView(organizationId);
      const tempData = res.data;

      setIncidents(
        tempData.map((incident) => {
          const { label, classes } = INCIDENT_STATUS_LIST.find(
            (s) => s.code === incident.status
          );
          return { ...incident, label, classes };
        })
      );
    }
  };

  useEffect(() => {
    if (organizationId) {
      getOrganizationIncidents();
    }
  }, [organizationId]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">
        Recent Incidents
      </h2>
      {!incidents ||
        (incidents.length === 0 && (
          <h2 className="text-sm mt-4 text-center font-normal italic">
            No Incidents
          </h2>
        ))}
      <div className="space-y-4">
        {incidents.map((incident, index) => (
          <div key={index} className="bg-gray-50 border rounded-md p-4">
            <h3 className="font-medium text-lg">{incident.name}</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span
                  className={`h-2 w-2 rounded-full mr-2 ${incident.classes.background}`}
                ></span>
                <p
                  className={`text-sm font-medium ${incident.classes.textColor}`}
                >
                  Status: {incident.label}
                </p>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Last updated: {incident.lastUpdated}
              </p>
            </div>
            <p className="my-3 text-sm text-slate-800">
              {incident.description}
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
                  onClick={() => handleToggleDetails(incident)}
                >
                  <FaInfoCircle className="text-white" title="View Details" />
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title={"Incident Updates Timeline"}
        isOpen={showDetails}
        onClose={() => handleToggleDetails(null)}
      >
        <IncidentUpdates incidentId={selectedIncident?.id} />
      </Modal>
    </div>
  );
}

export default RecentIncidents;
