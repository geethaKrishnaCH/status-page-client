import { useEffect, useState } from "react";
import useOrganizationAPI from "../../services/organization";
import useAxios from "../../stores/axios";
import OrganizationCard from "./OrganizationCard";

const AllOrganizationView = ({ searchQuery }) => {
  const [organizations, setOrganizations] = useState([]);
  const axiosInstance = useAxios();
  const { fetchOrganizationsAPI } = useOrganizationAPI(axiosInstance);
  const getOrganizations = async () => {
    const res = await fetchOrganizationsAPI(searchQuery);
    setOrganizations(res.data);
  };
  useEffect(() => {
    getOrganizations();
  }, []);
  return (
    <div className="flex justify-center">
      {(!organizations || organizations.length === 0) && (
        <p className=" mt-24 text-3xl">No Organizations</p>
      )}
      {organizations && organizations.length > 0 && (
        <div className="w-1/2">
          {organizations.map((org) => (
            <OrganizationCard key={org.organizationId} organization={org} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrganizationView;
