import React, { useEffect, useState } from "react";
import useOrganizationAPI from "../../../services/organization";
import useAccessContext from "../../../stores/access-control";
import useAxios from "../../../stores/axios";
import useUIConfig from "../../../utils/constants";

function HomeServiceView() {
  const [services, setServices] = useState([]);
  const { orgInfo } = useAccessContext();
  const axiosInstance = useAxios();
  const { fetchOrganizationServicesForPublicView } =
    useOrganizationAPI(axiosInstance);
  const { SERVICE_STATUS_LIST } = useUIConfig();

  const getOrganizationServices = async () => {
    if (orgInfo.organizationId) {
      const res = await fetchOrganizationServicesForPublicView(
        orgInfo.organizationId
      );
      const tempData = res.data;

      setServices(
        tempData.map((service) => {
          const { label, classes } = SERVICE_STATUS_LIST.find(
            (s) => s.code === service.status
          );
          return { ...service, statusLabel: label, classes: classes.join(" ") };
        })
      );
    }
  };

  useEffect(() => {
    getOrganizationServices();
  }, [orgInfo.organizationId]);

  if (!services || services.length === 0) {
    // return (
    //   <div className="p-4 bg-white rounded-lg shadow-md">
    //     <h2 className="text-2xl text-center font-semibold">No Services</h2>
    //   </div>
    // );
    return null;
  }

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
            <div>
              <h3 className="text-lg font-medium">{service.name}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${service.classes}`}
              >
                {service.statusLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeServiceView;
