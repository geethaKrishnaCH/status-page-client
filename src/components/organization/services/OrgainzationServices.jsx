import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa"; // Importing icons
import AddServiceForm from "./AddServiceForm";
import useAxios from "../../../stores/axios";
import useOrganizationAPI from "../../../services/organization";
import useUIConfig from "../../../utils/constants";
import useAccessContext from "../../../stores/access-control";
import Modal from "../../common/Modal";
import UpdateServiceForm from "./UpdateServiceForm";
import MaintenanceList from "../incidents/MaintenanceList";

function OrganizationServices() {
  const [services, setServices] = useState([]);
  const { orgInfo } = useAccessContext();
  const axiosInstance = useAxios();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { fetchOrganizationServices } = useOrganizationAPI(axiosInstance);
  const { SERVICE_STATUS_LIST } = useUIConfig();

  const getOrganizationServices = async () => {
    const res = await fetchOrganizationServices(orgInfo.organizationId);
    const tempData = res.data;

    setServices(
      tempData.map((service) => {
        const { label, classes } = SERVICE_STATUS_LIST.find(
          (s) => s.code === service.status
        );
        return { ...service, statusLabel: label, classes: classes.join(" ") };
      })
    );
  };

  useEffect(() => {
    if (orgInfo.organizationId) {
      getOrganizationServices();
    }
  }, [orgInfo.organizationId]);

  return (
    <div className="px-6 py-4 mx-auto">
      <div className="flex gap-3">
        <div className="w-3/5 bg-white rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-semibold">Services</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add
            </button>
            <Modal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              title={"Add Service"}
            >
              <AddServiceForm onClose={setIsAddModalOpen} />
            </Modal>
          </div>
          <div className="space-y-4">
            {(!services || services.length === 0) && (
              <h2 className="py-4 text-2xl text-center font-semibold">
                No Services
              </h2>
            )}
            {services.map((service) => (
              <div
                key={service.serviceId}
                className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
              >
                <div>
                  <h3 className="text-lg font-medium">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${service.classes}`}
                  >
                    {service.statusLabel}
                  </span>
                  <button
                    onClick={() => setIsUpdateModalOpen(true)}
                    className="ml-2 text-gray-600 hover:text-blue-500"
                  >
                    <FaEdit />
                  </button>
                  <Modal
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    title={"Update Service"}
                  >
                    <UpdateServiceForm
                      service={service}
                      onClose={setIsUpdateModalOpen}
                    />
                  </Modal>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/5">
          <MaintenanceList />
        </div>
      </div>
    </div>
  );
}

export default OrganizationServices;
