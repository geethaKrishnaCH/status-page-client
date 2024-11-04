import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import useOrganizationAPI from "../../../utils/services/organization";
import useUsersAPI from "../../../utils/services/user";
import useAccessContext from "../../../stores/access-control";
import useAxios from "../../../stores/axios";
import Sidebar from "./OrganizationSidebar";

const OrganizationLayout = () => {
  const { organizationId } = useParams();
  const axiosInstance = useAxios();
  const { isAuthenticated } = useAuth0();
  const { userInfo, orgInfo, setUserInfo, setOrgInfo, getServiceNames } =
    useAccessContext();
  const { fetchOrganizationInfo } = useOrganizationAPI(axiosInstance);
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

  useEffect(() => {
    localStorage.setItem("organizationId", organizationId);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // fetch user information in the organization
      if (!!organizationId && organizationId === orgInfo.organizationId) {
        getUserInfo();
        getServiceNames(organizationId);
      }
    }
  }, [isAuthenticated, organizationId, orgInfo.organizationId]);

  useEffect(() => {
    if (organizationId) {
      getOrganizationInfo();
    }
  }, [organizationId]);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0">
      <div className="flex flex-grow h-full">
        {isAuthenticated &&
          userInfo.organizationId === orgInfo.organizationId && (
            <div className="h-full w-1/6 bg-gray-50 overflow-y-auto">
              <Sidebar />
            </div>
          )}

        <div className="px-4 py-2 flex-grow w-5/6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OrganizationLayout;
