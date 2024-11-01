import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import useOrganizationAPI from "../../../services/organization";
import useUsersAPI from "../../../services/user";
import useAccessContext from "../../../stores/access-control";
import useAxios from "../../../stores/axios";
import Sidebar from "./OrganizationSidebar";

const OrganizationLayout = () => {
  const { organizationId } = useParams();
  const axiosInstance = useAxios();
  const { isAuthenticated } = useAuth0();
  const { userInfo, orgInfo, setUserInfo, setOrgInfo, setServices } =
    useAccessContext();
  const { fetchOrganizationInfo, fetchOrganizationServices } =
    useOrganizationAPI(axiosInstance);
  const { fetchUserInfo } = useUsersAPI(axiosInstance);

  const getOrganizationInfo = async () => {
    if (organizationId) {
      const res = await fetchOrganizationInfo(organizationId);
      setOrgInfo(res.data);
    }
  };

  const getUserInfo = async () => {
    const res = await fetchUserInfo(organizationId);
    setUserInfo(res.data);
  };

  const getServiceNames = async () => {
    const res = await fetchOrganizationServices(organizationId);
    setServices(res.data.map((s) => ({ name: s.name, id: s.serviceId })));
  };

  useEffect(() => {
    if (isAuthenticated) {
      // fetch user information in the organization
      getUserInfo();
      if (organizationId) {
        getServiceNames();
      }
    }
  }, [isAuthenticated, organizationId]);

  useEffect(() => {
    getOrganizationInfo();
  }, [organizationId]);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0">
      <div className="flex flex-grow h-full">
        {isAuthenticated &&
          userInfo.organizationId === orgInfo.organizationId && <Sidebar />}

        <div className="px-4 py-2 flex-grow overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OrganizationLayout;
