// TeamMemberCard.js
import React from "react";

const TeamMemberCard = ({ member, onEdit }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 border rounded-lg shadow-sm bg-white space-y-3 md:space-y-0 md:space-x-4">
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
        <p className="text-sm text-gray-500">{member.email}</p>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Status:</span> {member.status}
        </div>

        {/* Roles displayed as badges */}
        <div className="flex flex-wrap gap-2 mt-2">
          {member.roles.map((role, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-shrink-0">
        <button
          onClick={() => onEdit(member)}
          className="px-4 py-2 text-blue-600 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
        >
          Manage
        </button>
      </div>
    </div>
  );
};

export default TeamMemberCard;
