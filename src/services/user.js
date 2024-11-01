const useUsersAPI = (axios) => {
  const fetchUserInfo = (organizationId) => {
    return axios({
      url: `user/${organizationId}`,
      method: "GET",
    });
  };

  return { fetchUserInfo };
};

export default useUsersAPI;
