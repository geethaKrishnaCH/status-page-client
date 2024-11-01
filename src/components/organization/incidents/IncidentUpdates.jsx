import React from "react";

function IncidentUpdates({ updates }) {
  return (
    <div className="p-4 mx-auto">
      <div className="relative">
        {updates.map((update, index) => (
          <div key={index} className="my-2 p-2 border rounded-lg bg-gray-50">
            <div className="flex justify-between items-center">
              <span>{update.status}</span>
              <span className="text-xs text-gray-500">
                {new Date(update.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-600 mt-1">{update.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncidentUpdates;
