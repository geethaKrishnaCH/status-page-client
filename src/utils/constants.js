import {
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaSearch,
} from "react-icons/fa";

const useUIConfig = () => {
  const SERVICE_STATUS_LIST = [
    {
      label: "Operational",
      code: "OPERATIONAL",
      classes: ["bg-green-100", "text-green-600"],
    },
    {
      label: "Maintenance",
      code: "MAINTENANCE",
      classes: ["bg-yellow-100", "text-yellow-600"],
    },
    {
      label: "Degraded",
      code: "DEGRADED",
      classes: ["bg-orange-100", "text-orange-600"],
    },
    {
      label: "Partial Outage",
      code: "PARTIAL_OUTAGE",
      classes: ["bg-amber-100", "text-amber-600"],
    },
    {
      label: "Major Outage",
      code: "MAJOR_OUTAGE",
      classes: ["bg-red-100", "text-red-600"],
    },
  ];

  const SERVICE_CATEGORY_LIST = [
    "Core Service",
    "API Service",
    "Frontend",
    "Backend",
    "Infrastructure",
  ];

  const INCIDENT_STATUS_LIST = [
    {
      label: "Investigating",
      code: "INVESTIGATING",
      classes: { background: "bg-red-100", textColor: "text-red-600" },
      icon: FaSearch,
    },
    {
      label: "Identified",
      code: "IDENTIFIED",
      classes: { background: "bg-yellow-100", textColor: "text-yellow-600" },
      icon: FaExclamationCircle,
    },
    {
      label: "Monitoring",
      code: "MONITORING",
      classes: { background: "bg-orange-100", textColor: "text-orange-600" },
      icon: FaEye,
    },
    {
      label: "Resolved",
      code: "RESOLVED",
      classes: { background: "bg-green-100", textColor: "text-green-600" },
      icon: FaCheckCircle,
      resolved: true,
    },
  ];
  const ROLES = [
    { code: "ADMINISTRATOR", label: "Administrator" },
    { code: "SERVICE_MANAGER", label: "Service Manager" },
    { code: "VIEWER", label: "Viewer" },
  ];

  const ROLE_ADMINISTRATOR = "ADMINISTRATOR";
  const ROLE_SERVICE_MANAGER = "SERVICE_MANAGER";
  const ROLE_VIEWER = "VIEWER";

  const USER_STATUS = [
    { value: true, label: "Active" },
    { value: false, label: "In Active" },
  ];
  return {
    SERVICE_STATUS_LIST,
    SERVICE_CATEGORY_LIST,
    INCIDENT_STATUS_LIST,
    ROLES,
    USER_STATUS,
    ROLE_ADMINISTRATOR,
    ROLE_SERVICE_MANAGER,
    ROLE_VIEWER,
  };
};

export default useUIConfig;
