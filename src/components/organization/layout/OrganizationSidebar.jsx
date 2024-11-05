import { useEffect, useState } from "react";
import { BiHome } from "react-icons/bi";
import { BsActivity } from "react-icons/bs";
import { FcServices } from "react-icons/fc";
import { GiTeamIdea } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState("");

  // Array of link objects
  const links = [
    { path: "", label: "Home", icon: <BiHome /> },
    { path: "services", label: "Services", icon: <FcServices /> },
    { path: "incidents", label: "Incidents", icon: <BsActivity /> },
    { path: "teams", label: "Team members", icon: <GiTeamIdea /> },
  ];

  useEffect(() => {
    // Extract last part of path, for example "services" from "/services"
    const currentPath = location.pathname.split("/").pop();

    // Find the matching option based on the current path
    const selected = links.find((link) => link.path === currentPath);

    // If a match is found, set it as the selected option
    if (selected) {
      setSelectedOption(selected.path);
    }
  }, [location.pathname, links]);

  const handleSidebarSelection = (selectedOption) => {
    setSelectedOption(selectedOption);
    navigate(selectedOption);
  };

  return (
    <div className="p-4">
      <ul className="flex flex-col space-y-1">
        {links.map(({ path, label, icon }) => (
          <li
            key={path}
            className={`p-2 rounded-md cursor-pointer ${
              selectedOption === path ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <div
              onClick={() => handleSidebarSelection(path)}
              className="flex items-center space-x-2"
            >
              {icon}
              <span>{label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
