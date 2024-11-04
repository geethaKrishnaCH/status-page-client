import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InvitationHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = "http://localhost:5173";

  useEffect(() => {
    // Extract token from URL parameters
    const searchParams = new URLSearchParams(location.search);
    const invitation = searchParams.get("invitation");
    const organization = searchParams.get("organization");
    const organizationName = searchParams.get("organization_name");

    if (invitation && organization && organizationName) {
      const authorizeUrl = `https://${auth0Domain}/authorize?client_id=${clientId}&response_type=code&invitation=${invitation}&redirect_uri=${redirectUri}&organization=${organization}&organization_name=${organizationName}`;
      window.location.href = authorizeUrl;
    } else {
      // Handle case where token is missing or invalid
      navigate("/error");
    }
  }, [location.search, navigate]);

  return null; // Render nothing; purely for redirection
};
export default InvitationHandler;
