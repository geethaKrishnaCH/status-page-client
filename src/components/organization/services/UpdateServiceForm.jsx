import React, { useState } from "react";
import { toast } from "react-toastify";
import useServicesAPI from "../../../services/service";
import useAxios from "../../../stores/axios";
import useUIConfig from "../../../utils/constants";

function UpdateServiceForm({ service, onClose }) {
  console.log(service);

  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
    category: service.category,
    url: service.url,
    currentStatus: service.status,
  });
  console.log(formData);

  const { SERVICE_STATUS_LIST, SERVICE_CATEGORY_LIST } = useUIConfig();
  const axiosInstance = useAxios();
  const { addService } = useServicesAPI(axiosInstance);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addService(formData);
    onClose(false);
    toast("Service Created");
  };

  const trimInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Service Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={trimInput}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full h-24" // Fixed height for demo
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Select</option>
          {SERVICE_CATEGORY_LIST.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Service URL (Optional)
        </label>
        <input
          name="url"
          value={formData.url}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Current Status
        </label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          name="currentStatus"
          value={formData.currentStatus}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {SERVICE_STATUS_LIST.map((status) => (
            <option key={status.code} value={status.code}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Update Service
        </button>

        <button
          type="submit"
          className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </form>
  );
}

export default UpdateServiceForm;
