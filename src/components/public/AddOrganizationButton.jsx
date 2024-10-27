import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddOrganisationButton = () => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (buttonClicked && isAuthenticated) {
      navigate("/add-organization-form");
    }
  }, [isAuthenticated, buttonClicked]);

  const handleAddOrganization = () => {
    setButtonClicked(true);
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      // Redirect to the form page to add organization
      navigate("/add-organization-form");
    }
  };

  return (
    <button
      onClick={handleAddOrganization}
      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    >
      Add Your Organization
      {isLoading && <>...</>}
    </button>
  );
};

export default AddOrganisationButton;
