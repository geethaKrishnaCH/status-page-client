import React, { useState, useRef, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Database update scheduled for tomorrow." },
    { id: 2, message: "API service experiencing slowdowns." },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const notificationRef = useRef(null);

  // Close the popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleNotificationPopup = () => setIsOpen(!isOpen);

  return (
    <div
      ref={notificationRef}
      onClick={toggleNotificationPopup}
      className="relative cursor-pointer "
    >
      <div className="hover:opacity-85">
        <IoNotificationsOutline className="text-2xl text-gray-600" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
            {notifications.length}
          </span>
        )}
      </div>

      {/* Notification Dropdown Popup */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded-lg overflow-hidden z-10">
          <h3 className="p-3 font-semibold text-gray-700 border-b">
            Notifications
          </h3>
          {notifications.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="p-3 text-sm text-gray-600 hover:bg-gray-100"
                >
                  {notification.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-3 text-sm text-gray-500">No new notifications</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
