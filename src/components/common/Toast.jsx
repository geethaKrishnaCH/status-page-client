import React, { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-dismiss after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={`fixed top-5 right-5 p-4 text-white rounded-lg shadow-lg ${
        typeStyles[type] || typeStyles.info
      }`}
    >
      <span>{message}</span>
      <button className="ml-4" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Toast;
