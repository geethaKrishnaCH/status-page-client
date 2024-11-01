import React from "react";
import useAccessContext from "../../../stores/access-control";
import ActiveMaintenanceEvents from "./ActiveMaintenanceEvents";
import HomeServiceView from "./HomeServiceView";
import RecentIncidents from "./RecentIncidents";
import useUIConfig from "../../../utils/constants";

const OrganizationHome = () => {
  const { orgInfo } = useAccessContext();
  const { displayName, status } = orgInfo;
  const { SERVICE_STATUS_LIST } = useUIConfig();

  const orgConf = SERVICE_STATUS_LIST.find((s) => s.code === status);

  let label;
  let classes;

  if (orgConf) {
    label = orgConf.label;
    classes = orgConf.classes;
    classes = classes.join(" ");
  } else {
    label = "N/A";
  }
  return (
    <div className="max-w-7xl mx-auto p-6">
      <section className="mb-6">
        <div className={`border rounded-lg p-4 shadow-md ${classes}`}>
          <h2 className="text-2xl font-semibold">{displayName}</h2>
          <p className="mt-2 text-lg">
            Overall Service Status: <span className="font-bold">{label}</span>
          </p>
        </div>
      </section>

      <div className="container mx-auto">
        <div className="flex gap-3">
          <div className="w-3/5">
            <HomeServiceView />
          </div>

          <div className="w-2/5">
            <RecentIncidents />
            <div className="mt-2">
              <ActiveMaintenanceEvents />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationHome;
