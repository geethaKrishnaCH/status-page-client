import React, { useEffect, useState } from "react";
import useUIConfig from "../../../utils/constants";
import useAxios from "../../../stores/axios";
import useIncidentsAPI from "../../../utils/services/incident";

function IncidentUpdates({ incidentId, publicView = true }) {
  const [updates, setUpdates] = useState([]);
  const axiosInstance = useAxios();
  const { fetchIncidentUpdates, fetchIncidentUpdatesForPublicView } =
    useIncidentsAPI(axiosInstance);
  const getIncidentUpdates = async () => {
    if (publicView) {
      const res = await fetchIncidentUpdatesForPublicView(incidentId);
      setUpdates(res.data);
    } else {
      const res = await fetchIncidentUpdates(incidentId);
      setUpdates(res.data);
    }
  };
  useEffect(() => {
    if (!!incidentId) {
      getIncidentUpdates();
    }
  }, [incidentId]);
  return (
    <div className="p-4 mx-auto">
      <div className="relative">
        {updates.map((update, index) => (
          <IncidentUpdateCard update={update} key={index} />
        ))}
      </div>
    </div>
  );
}

function IncidentUpdateCard({ update }) {
  const { INCIDENT_STATUS_LIST } = useUIConfig();

  const updateConfig = INCIDENT_STATUS_LIST.find(
    (inc) => inc.code === update.status
  );

  return (
    <div className="my-2 p-2 border rounded-lg bg-gray-50">
      <div className="flex justify-between items-center">
        <span
          className={`flex gap-2 items-center justify-between ${updateConfig.classes.background} ${updateConfig.classes.textColor} px-2 py-1 rounded-full text-xs font-semibold`}
        >
          <updateConfig.icon />
          {updateConfig.label}
        </span>
        <span className="text-xs text-gray-500">{update.timestamp}</span>
      </div>
      <p className="text-sm text-gray-500 mt-1 p-2">{update.message}</p>
    </div>
  );
}

export default IncidentUpdates;
