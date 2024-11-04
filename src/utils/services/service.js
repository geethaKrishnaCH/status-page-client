const useServicesAPI = (axios) => {
  const addService = (serviceData) => {
    return axios({
      url: `services`,
      method: "POST",
      data: serviceData,
    });
  };

  const updateService = (serviceData) => {
    return axios({
      url: `services`,
      method: "PUT",
      data: serviceData,
    });
  };

  return { addService, updateService };
};

export default useServicesAPI;
