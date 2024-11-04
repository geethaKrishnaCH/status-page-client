import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "./common/Loader";
import Header from "./header/Header";
import { useAuth0 } from "@auth0/auth0-react";
import useUsersAPI from "../utils/services/user";
import useAxios from "../stores/axios";
import useAccessContext from "../stores/access-control";
import { useEffect } from "react";

const Home = () => {
  const axiosInstance = useAxios();
  const { isAuthenticated } = useAuth0();
  const { fetchUserInfoFromToken } = useUsersAPI(axiosInstance);
  const { setUserInfo } = useAccessContext();

  const getUserInfo = async () => {
    const res = await fetchUserInfoFromToken();
    setUserInfo(res.data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      // fetch user information in the organization
      getUserInfo();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <Loader />
      <ToastContainer position="bottom-center" />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="relative flex-grow bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
