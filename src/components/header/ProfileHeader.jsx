import React, { useEffect, useRef, useState } from "react";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { ImProfile } from "react-icons/im";

function ProfileHeader({ userName, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

  // Get user initials
  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={profileRef}>
      {/* Profile Initials Button */}
      <div
        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getUserInitials(userName)}
      </div>

      {/* Popup with Options */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="py-2">
            <li
              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => alert("Navigate to Profile")}
            >
              <FiUser className="text-blue-600" /> Profile
            </li>
            <li
              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => alert("Navigate to Settings")}
            >
              <FiSettings className="text-blue-600" /> Settings
            </li>
            <li
              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer text-red-500"
              onClick={onLogout}
            >
              <FiLogOut className="text-red-500" /> Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
