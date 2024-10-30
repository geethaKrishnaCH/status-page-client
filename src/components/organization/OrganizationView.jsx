import { Outlet } from "react-router-dom";
import Sidebar from "./OrganizationSidebar";

const OrganizationView = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0">
      <div className="flex flex-grow h-full">
        <Sidebar />
        <div className="px-4 py-2 flex-grow overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OrganizationView;
