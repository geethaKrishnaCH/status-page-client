import { useState } from "react";
import { BiHome } from "react-icons/bi";
import { BsActivity } from "react-icons/bs";
import { FcServices } from "react-icons/fc";
import { GiTeamIdea } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  // Array of link objects
  const links = [
    { path: "", label: "Home", icon: <BiHome /> },
    { path: "services", label: "Services", icon: <FcServices /> },
    { path: "incidents", label: "Incidents", icon: <BsActivity /> },
    { path: "team", label: "Team members", icon: <GiTeamIdea /> },
  ];

  const handleSidebarSelection = (selectedOption) => {
    setSelectedOption(selectedOption);
    navigate(selectedOption);
  };

  return (
    <div className="h-full w-64 bg-gray-50 flex flex-col p-4 overflow-y-auto">
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
