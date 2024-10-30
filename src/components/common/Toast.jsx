import React, { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-dismiss after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    warning: "bg-yellow-600",
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
