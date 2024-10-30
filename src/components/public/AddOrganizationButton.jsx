import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddOrganisationButton = () => {
  const { isAuthenticated, loginWithRedirect, isLoading, error } = useAuth0();
  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (buttonClicked && isAuthenticated) {
      navigate("/add-organization");
    }
  }, [isAuthenticated, buttonClicked]);

  const handleAddOrganization = () => {
    setButtonClicked(true);
    if (!isAuthenticated) {
      loginWithRedirect({ organization: "org_SM1HIBa0xvbmte67" });
    } else {
      navigate("/add-organization");
    }
  };

  return (
    <button
      onClick={handleAddOrganization}
      className="px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    >
      Add Your Organization
    </button>
  );
};

export default AddOrganisationButton;
