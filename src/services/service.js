const useServicesAPI = (axios) => {
  const addService = (serviceData) => {
    return axios({
      url: `services`,
      method: "POST",
      data: serviceData,
    });
  };

  return { addService };
};

export default useServicesAPI;
