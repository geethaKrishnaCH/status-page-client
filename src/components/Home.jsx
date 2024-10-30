import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./header/Header";

const Home = () => {
  return (
    <div>
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
