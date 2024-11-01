import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/ReactToastify.min.css";
import AddOrganisationForm from "./components/AddOrganizationForm";
import Home from "./components/Home";
import OrganizationHome from "./components/organization/home/OrganizationHome";
import IncidentMaintenancePage from "./components/organization/incidents/IncidentPage";
import OrganizationServices from "./components/organization/services/OrgainzationServices";
import TeamsPage from "./components/organization/teams/TeamsPage";
import LandingPage from "./components/public/LandingPage";
import OrganizationLayout from "./components/organization/layout/OrganizationLayout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "", element: <LandingPage />, children: [] },
        { path: "add-organization", element: <AddOrganisationForm /> },
        {
          path: "organization/:organizationId",
          element: <OrganizationLayout />,
          children: [
            { path: "", element: <OrganizationHome /> },
            { path: "services", element: <OrganizationServices /> },
            { path: "incidents", element: <IncidentMaintenancePage /> },
            { path: "team", element: <TeamsPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
