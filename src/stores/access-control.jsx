import { createContext, useContext, useState } from "react";

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
  setServices: () => {},
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
  const [services, setServices] = useState([]);

  return (
    <AccessControlContext.Provider
      value={{
        userInfo,
        orgInfo,
        setUserInfo,
        setOrgInfo,
        services,
        setServices,
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
