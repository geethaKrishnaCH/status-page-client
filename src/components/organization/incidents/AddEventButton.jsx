import React from "react";

function AddEventButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600"
    >
      {label}
    </button>
  );
}

export default AddEventButton;
