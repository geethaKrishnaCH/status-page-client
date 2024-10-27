import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gray-100 p-2">
        <Outlet />
      </div>
      {/* <div className="flex flex-grow bg-gray-100">
        <div className="w-1/6">
          <Sidebar />
        </div>
        <div className="w-5/6 p-3"></div>
      </div> */}
    </div>
  );
};

export default Home;
