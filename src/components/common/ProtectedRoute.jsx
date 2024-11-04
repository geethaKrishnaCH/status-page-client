import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAccessContext from "../../stores/access-control";
import { routeConfig } from "../../utils/route-config";
import { matchRoute } from "../../utils/route-matcher";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const allowedRoles = matchRoute(location.pathname, routeConfig);
  const { isAuthenticated } = useAuth0();
  const { userInfo } = useAccessContext();
  const [localLoading, setLocalLoading] = useState(true);
  const navigate = useNavigate();

  const hasAccess =
    !localLoading &&
    (allowedRoles?.length === 0 || allowedRoles.includes(userInfo.roles?.[0]));

  useEffect(() => {
    if (isAuthenticated && !!userInfo.name) {
      setLocalLoading(false);
    }
  }, [[isAuthenticated, userInfo.name]]);

  useEffect(() => {
    if (!localLoading && !hasAccess) {
      navigate("/", { replace: true });
    }
  }, [localLoading, hasAccess, navigate]);

  // Render a loading indicator while loading is in progress
  if (localLoading) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
