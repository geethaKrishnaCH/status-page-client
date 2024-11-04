import React, { useState } from "react";
import useServicesAPI from "../../../utils/services/service";
import useAxios from "../../../stores/axios";
import useUIConfig from "../../../utils/constants";

function UpdateServiceForm({ service, onSubmit }) {
  const [formData, setFormData] = useState({
    serviceId: service.serviceId,
    name: service.name,
    description: service.description,
    category: service.category,
    url: service.url,
    currentStatus: service.status,
  });

  const { SERVICE_STATUS_LIST, SERVICE_CATEGORY_LIST } = useUIConfig();
  const axiosInstance = useAxios();
  const { addService } = useServicesAPI(axiosInstance);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
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

      <div className="flex justify-center gap-3">
        <button
          type="submit"
          className="px-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Update
        </button>

        <button
          type="submit"
          className="px-6 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </form>
  );
}

export default UpdateServiceForm;
