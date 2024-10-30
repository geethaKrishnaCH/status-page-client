import React from "react";
import HomeServiceView from "./HomeServiceView";
import RecentIncidents from "./RecentIncidents";
import ActiveMaintenanceEvents from "./ActiveMaintenanceEvents";

const HomePage = () => {
  const organizationName = "Your Organization"; // Replace with dynamic organization name if necessary
  const overallServiceStatus = "All Systems Operational"; // Replace with dynamic status

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Organization Info Section */}
      <section className="mb-6">
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800">
            {organizationName}
          </h2>
          <p className="mt-2 text-lg text-blue-600">
            Overall Service Status:{" "}
            <span className="font-bold">{overallServiceStatus}</span>
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="container mx-auto">
        <div className="flex gap-6">
          <div className="w-3/5">
            <HomeServiceView />
          </div>

          <div className="w-2/5">
            <RecentIncidents />
            <div className="mt-2">
              <ActiveMaintenanceEvents />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
