import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useOrganizationAPI from "../utils/services/organization";
import useAxios from "../stores/axios";

const AddOrganisationForm = () => {
  const [organisation, setOrganisation] = useState({
    displayName: "",
    name: "",
  });
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { addOrganisationAPI } = useOrganizationAPI(axiosInstance);

  const handleSubmit = async () => {
    const res = await addOrganisationAPI(organisation);
    const orgId = res.data.organizationId;
    toast.success("Created Successfully");
    navigate(`/organization/${orgId}`);
  };

  return (
    <div className="flex justify-center pt-3 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
          Add Your Organization
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="displayName"
              className="block text-sm text-gray-700 font-medium mb-2"
            >
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={organisation.displayName}
              onChange={(e) =>
                setOrganisation({
                  ...organisation,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="Enter organization name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm text-gray-700 font-medium mb-2"
            >
              Organization Code
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={organisation.name}
              onChange={(e) =>
                setOrganisation({
                  ...organisation,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="Enter organization code"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOrganisationForm;
