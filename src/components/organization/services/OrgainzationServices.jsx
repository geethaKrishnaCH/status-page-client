import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa"; // Importing icons
import { toast } from "react-toastify";
import useOrganizationAPI from "../../../utils/services/organization";
import useServicesAPI from "../../../utils/services/service";
import useAccessContext from "../../../stores/access-control";
import useAxios from "../../../stores/axios";
import useUIConfig from "../../../utils/constants";
import Modal from "../../common/Modal";
import MaintenanceList from "../incidents/MaintenanceList";
import AddServiceForm from "./AddServiceForm";
import UpdateServiceForm from "./UpdateServiceForm";

function OrganizationServices() {
  const [services, setServices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const axiosInstance = useAxios();
  const { orgInfo, getServiceNames, userInfo } = useAccessContext();
  const { addService, updateService } = useServicesAPI(axiosInstance);
  const { fetchOrganizationServices } = useOrganizationAPI(axiosInstance);
  const { SERVICE_STATUS_LIST, ROLE_ADMINISTRATOR, ROLE_SERVICE_MANAGER } =
    useUIConfig();

  const handleSubmit = async (formData) => {
    await addService(formData);
    setIsAddModalOpen(false);
    getServiceNames(orgInfo.organizationId);
    toast.success("Service Created");
    await getOrganizationServices();
  };

  const handleServiceUpdate = async (formData) => {
    await updateService(formData);
    setSelectedService(null);
    getServiceNames(orgInfo.organizationId);
    toast.success("Service Updated");
    await getOrganizationServices();
  };

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

  const editEnable = userInfo.roles?.filter(
    (role) => role === ROLE_ADMINISTRATOR || role == ROLE_SERVICE_MANAGER
  );

  return (
    <div className="px-6 py-4 mx-auto">
      <div className="flex gap-3 justify-center">
        <div className="w-3/5 bg-white rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-slate-800">Services</h2>
            {editEnable && (
              <>
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
                  <AddServiceForm
                    onClose={setIsAddModalOpen}
                    onSubmit={handleSubmit}
                  />
                </Modal>
              </>
            )}
          </div>
          <div className="space-y-4">
            {(!services || services.length === 0) && (
              <h2 className="py-4 text-lg text-center font-normal italic">
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
                    onClick={() => setSelectedService(service)}
                    className="ml-2 text-gray-600 hover:text-blue-500"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Modal
            isOpen={!!selectedService}
            onClose={() => setSelectedService(null)}
            title={"Update Service"}
          >
            <UpdateServiceForm
              service={selectedService}
              onSubmit={handleServiceUpdate}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default OrganizationServices;
