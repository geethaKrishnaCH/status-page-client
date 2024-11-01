import React from "react";

function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg lg:w-1/2 md:w-2/3 w-full h-[80vh] shadow-lg overflow-hidden flex flex-col">
        <div className="flex justify-between items-center px-6 py-3 border-b">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
