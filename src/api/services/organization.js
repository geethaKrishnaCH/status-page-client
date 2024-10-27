import axios from "../axios";

export const addOrganisationApi = (data) => {
  return axios({ url: "organization", method: "POST", data });
};

export const fetchOrganizations = (search) => {
  return axios({
    url: `public/organization`,
    method: "GET",
    params: {
      query: search ? search : undefined,
    },
  });
};
