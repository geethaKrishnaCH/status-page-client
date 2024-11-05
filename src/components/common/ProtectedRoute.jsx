import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAccessContext from "../../stores/access-control";
import { routeConfig } from "../../utils/route-config";
import { matchRoute } from "../../utils/route-matcher";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const allowedRoles = matchRoute(location.pathname, routeConfig);
  const { isAuthenticated } = useAuth0();
  const { userInfo, userInfoLoaded } = useAccessContext();
  const navigate = useNavigate();

  useEffect(() => {
    const hasAccess =
      isAuthenticated &&
      (allowedRoles?.length === 0 ||
        allowedRoles.includes(userInfo.roles?.[0]));
    if (!hasAccess && userInfoLoaded) {
      navigate("/", { replace: true });
    }
  }, [navigate, userInfoLoaded, isAuthenticated]);

  // Render a loading indicator while loading is in progress
  if (!userInfoLoaded) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
