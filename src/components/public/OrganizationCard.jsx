import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrganizationCard = ({ organization }) => {
  const { organizationId, name, displayName } = organization;
  const navigate = useNavigate();
  return (
    <div
      className="max-w-full flex items-center justify-between bg-white shadow-lg rounded-lg p-4 mx-auto my-4 transition-transform transform hover:shadow-2xl hover:bg-gray-100 cursor-pointer"
      onClick={() => navigate(`/organization/${organizationId}`)}
    >
      <div className="text-lg font-semibold text-gray-800">{displayName}</div>
      <FaChevronRight className="text-gray-500 text-2xl" />
    </div>
  );
};

export default OrganizationCard;
