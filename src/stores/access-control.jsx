import { createContext, useContext, useState } from "react";
import useAxios from "./axios";
import useOrganizationAPI from "../utils/services/organization";

const AccessControlContext = createContext({
  userInfo: {
    name: "",
    userId: "",
    organizationId: "",
    permissions: [],
    roles: [],
  },
  orgInfo: { organizationId: "", name: "", displayName: "", status: "" },
  setUserInfo: () => {},
  setOrgInfo: () => {},
  services: [],
  getServiceNames: () => {},
});

export const AccessControlProvider = ({ children }) => {
  // defining the app state
  const [userInfo, setUserInfo] = useState({
    name: "",
    userId: "",
    permissions: [],
    roles: [],
  });
  const [orgInfo, setOrgInfo] = useState({
    organizationId: "",
    name: "",
    displayName: "",
    status: "",
  });
  // organization service names
  // {id: 1, name: ""}
  const axiosInstance = useAxios();
  const [services, setServices] = useState([]);
  const { fetchOrganizationServices } = useOrganizationAPI(axiosInstance);

  const getServiceNames = async (organizationId) => {
    const res = await fetchOrganizationServices(organizationId);
    setServices(res.data.map((s) => ({ name: s.name, id: s.serviceId })));
  };

  return (
    <AccessControlContext.Provider
      value={{
        userInfo,
        orgInfo,
        setUserInfo,
        setOrgInfo,
        services,
        getServiceNames,
      }}
    >
      {children}
    </AccessControlContext.Provider>
  );
};

const useAccessContext = () => {
  return useContext(AccessControlContext);
};

export default useAccessContext;
