const useIncidentsAPI = (axios) => {
  const addIncident = (incidentData) => {
    return axios({
      url: `incidents`,
      method: "POST",
      data: incidentData,
    });
  };

  const updateIncident = (incidentData) => {
    return axios({
      url: `incidents`,
      method: "PUT",
      data: incidentData,
    });
  };

  const fetchIncidentUpdates = (incidentId) => {
    return axios({
      url: `incidents/${incidentId}/updates`,
      method: "GET",
    });
  };

  const fetchIncidentUpdatesForPublicView = (incidentId) => {
    return axios({
      url: `public/incidents/${incidentId}/updates`,
      method: "GET",
    });
  };

  return {
    addIncident,
    updateIncident,
    fetchIncidentUpdates,
    fetchIncidentUpdatesForPublicView,
  };
};

export default useIncidentsAPI;
