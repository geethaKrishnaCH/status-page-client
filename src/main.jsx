import { Auth0Provider } from "@auth0/auth0-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AccessControlProvider } from "./stores/access-control.jsx";
import { AxiosProvider } from "./stores/axios.jsx";
import { LoaderProvider } from "./stores/loader.jsx";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      cacheLocation="localstorage"
      authorizationParams={{
        audience: audience,
        redirect_uri: window.location.origin,
      }}
    >
      <LoaderProvider>
        <AxiosProvider>
          <AccessControlProvider>
            <App />
          </AccessControlProvider>
        </AxiosProvider>
      </LoaderProvider>
    </Auth0Provider>
  </StrictMode>
);
