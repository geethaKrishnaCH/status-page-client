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
      classes: ["bg-green-100", "text-green-600"],
    },
    {
      label: "Identified",
      code: "IDENTIFIED",
      classes: ["bg-yellow-100", "text-yellow-600"],
    },
    {
      label: "Monitoring",
      code: "MONITORING",
      classes: ["bg-orange-100", "text-orange-600"],
    },
    {
      label: "Resolved",
      code: "RESOLVED",
      classes: ["bg-amber-100", "text-amber-600"],
    },
  ];
  return { SERVICE_STATUS_LIST, SERVICE_CATEGORY_LIST, INCIDENT_STATUS_LIST };
};

export default useUIConfig;
