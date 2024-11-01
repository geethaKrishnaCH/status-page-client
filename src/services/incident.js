const useIncidentsAPI = (axios) => {
  const addIncident = (incidentData) => {
    return axios({
      url: `incidents`,
      method: "POST",
      data: incidentData,
    });
  };

  return { addIncident };
};

export default useIncidentsAPI;
