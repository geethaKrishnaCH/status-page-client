const useOrganizationAPI = (axios) => {
  const addOrganisationAPI = (data) => {
    return axios({ url: "organizations", method: "POST", data });
  };

  const fetchOrganizationsAPI = (search) => {
    return axios({
      url: `public/organizations`,
      method: "GET",
      params: {
        query: search ? search : undefined,
      },
    });
  };

  return { addOrganisationAPI, fetchOrganizationsAPI };
};

export default useOrganizationAPI;
