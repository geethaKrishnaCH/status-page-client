import {
  FaAngleDown,
  FaAngleRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaServer,
} from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const { name, status } = service;
  const getStatusDetails = (status) => {
    switch (status) {
      case "Operational":
        return {
          icon: <FaCheckCircle className="text-green-500" />,
          color: "bg-green-100",
        };
      case "Degraded Performance":
        return {
          icon: <FaExclamationCircle className="text-yellow-500" />,
          color: "bg-yellow-100",
        };
      default:
        return { icon: null, color: "bg-gray-100" }; // Default case
    }
  };

  const { icon, color } = getStatusDetails(status);

  return (
    <div
      className={`flex items-center justify-between p-4 mb-4 rounded-lg shadow-md ${color}`}
    >
      <div className="flex items-center gap-3">
        <FaAngleRight className="cursor-pointer" />
        <FaServer className="text-gray-700" size={24} />
        <h3 className="text-sm font-semibold">{name}</h3>
      </div>

      <div className="flex gap-3 items-center">
        {icon}
        <p className="text-sm">{status}</p>
      </div>
    </div>
  );
};
export default ServiceCard;
