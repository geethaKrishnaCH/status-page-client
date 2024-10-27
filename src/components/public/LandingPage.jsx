import { useAuth0 } from "@auth0/auth0-react";
import AddOrganisationButton from "./AddOrganizationButton";
import AllOrganizationView from "./AllOrganiZationView";
import SearchOrganization from "./SearchOrganization";

const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  return (
    <div>
      <div className="px-8 flex justify-center gap-4">
        <SearchOrganization />
        <AddOrganisationButton />
      </div>
      <div>
        <AllOrganizationView />
      </div>
    </div>
  );
};
export default LandingPage;
