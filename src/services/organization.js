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

  const fetchOrganizationInfo = (organizationId) => {
    return axios({
      url: `public/organizations/${organizationId}`,
      method: "GET",
    });
  };

  const fetchOrganizationServices = (organizationId) => {
    return axios({
      url: `organizations/${organizationId}/services`,
      method: "GET",
    });
  };

  const fetchOrganizationServicesForPublicView = (organizationId) => {
    return axios({
      url: `public/organizations/${organizationId}/services`,
      method: "GET",
    });
  };

  return {
    addOrganisationAPI,
    fetchOrganizationsAPI,
    fetchOrganizationInfo,
    fetchOrganizationServices,
    fetchOrganizationServicesForPublicView,
  };
};

export default useOrganizationAPI;
