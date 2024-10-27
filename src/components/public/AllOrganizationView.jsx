import { useEffect, useState } from "react";
import { fetchOrganizations } from "../../api/services/organization";
import OrganizationCard from "./OrganizationCard";

const AllOrganizationView = ({ searchQuery }) => {
  const [organizations, setOrganizations] = useState([]);
  const getOrganizations = async () => {
    const res = await fetchOrganizations(searchQuery);
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
            <OrganizationCard organization={org} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrganizationView;
