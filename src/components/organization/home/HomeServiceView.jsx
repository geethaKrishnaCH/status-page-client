import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../stores/axios";
import useUIConfig from "../../../utils/constants";
import useOrganizationAPI from "../../../utils/services/organization";

function HomeServiceView() {
  const [services, setServices] = useState([]);
  const { organizationId } = useParams();
  const axiosInstance = useAxios();
  const { fetchOrganizationServicesForPublicView } =
    useOrganizationAPI(axiosInstance);
  const { SERVICE_STATUS_LIST } = useUIConfig();

  const getOrganizationServices = async () => {
    if (organizationId) {
      const res = await fetchOrganizationServicesForPublicView(organizationId);
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
    if (organizationId) {
      getOrganizationServices();
    }
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">Services</h2>
      {!services ||
        (services.length === 0 && (
          <h2 className="text-sm mt-4 text-center font-normal italic">
            No Services
          </h2>
        ))}

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.serviceId}
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
