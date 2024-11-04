import { data } from "autoprefixer";

const useUsersAPI = (axios) => {
  const fetchUserInfo = (organizationId) => {
    return axios({
      url: `users/info/${organizationId}`,
      method: "GET",
    });
  };

  const fetchUserInfoFromToken = () => {
    return axios({
      url: `users/info`,
      method: "GET",
    });
  };

  const fetchUsers = () => {
    return axios({
      url: `users`,
      method: "GET",
    });
  };

  const inviteUser = (email) => {
    return axios({
      url: `users/invitations`,
      method: "POST",
      data: { email },
    });
  };

  return { fetchUserInfo, fetchUsers, inviteUser, fetchUserInfoFromToken };
};

export default useUsersAPI;
