import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/ReactToastify.min.css";
import AddOrganisationForm from "./components/AddOrganizationForm";
import Home from "./components/Home";
import Services from "./components/organization/services/OrgainzationServices";
import OrganizationView from "./components/organization/OrganizationView";
import OrganizationHome from "./components/organization/home/OrganizationHome";
import LandingPage from "./components/public/LandingPage";
import TeamManagement from "./components/organization/teams/TeamManagement";
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
          element: <OrganizationView />,
          children: [
            { path: "", element: <OrganizationHome /> },
            { path: "services", element: <Services /> },
            { path: "incidents", element: <Services /> },
            { path: "team", element: <TeamManagement /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
