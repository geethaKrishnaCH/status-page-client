import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchOrganization = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {}, [search]);

  return (
    <div className="flex items-center w-5/6 max-w-md  bg-white border rounded-lg shadow-sm">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Organization..."
        className="flex-1 ml-2 px-3 py-2 outline-none bg-transparent"
      />
      <FaSearch className="text-gray-500 mr-3 cursor-pointer" />
    </div>
  );
};

export default SearchOrganization;
