import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/ReactToastify.min.css";
import { setupAxiosInterceptors } from "./api/axios";
import AddOrganisationForm from "./components/AddOrganizationForm";
import Home from "./components/Home";
import LandingPage from "./components/public/LandingPage";
import OrganizationView from "./components/public/OrganizationView";
function App() {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setupAxiosInterceptors(getAccessTokenSilently);
  }, [getAccessTokenSilently]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "", element: <LandingPage />, children: [] },
        { path: "add-organization-form", element: <AddOrganisationForm /> },
        { path: "organization/:organizationId", element: <OrganizationView /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
