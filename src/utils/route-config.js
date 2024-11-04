export const routeConfig = {
  "^/add-organization$": [],
  "^/organization/[^/]+/services$": [
    "ADMINISTRATOR",
    "SERVICE_MANAGER",
    "VIEWER",
  ],
  "^/organization/[^/]+/incidents$": [
    "ADMINISTRATOR",
    "SERVICE_MANAGER",
    "VIEWER",
  ],
  "^/organization/[^/]+/teams$": ["ADMINISTRATOR"],
};
