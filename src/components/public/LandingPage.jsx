import AddOrganisationButton from "./AddOrganizationButton";
import AllOrganizationView from "./AllOrganizationView";
import SearchOrganization from "./SearchOrganization";

const LandingPage = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0">
      <div className="px-8 py-2 flex justify-center gap-3">
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
