import { useState, useEffect } from "react";
import Modal from "../../common/Modal";
import useAxios from "../../../stores/axios";
import useUsersAPI from "../../../utils/services/user";
import { useAuth0 } from "@auth0/auth0-react";
import { BiSearch } from "react-icons/bi";
import useUIConfig from "../../../utils/constants";

const TeamMembersTable = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth0();
  const axiosInstance = useAxios();
  const { fetchUsers } = useUsersAPI(axiosInstance);
  const { ROLES, USER_STATUS } = useUIConfig();

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    alert(`Updated details for ${selectedMember.name}`);
    closeModal();
  };

  const handleRemove = () => {
    setTeamMembers((prevMembers) =>
      prevMembers.filter((m) => m.id !== selectedMember.id)
    );
    closeModal();
  };

  const handleDeactivate = () => {
    setTeamMembers((prevMembers) =>
      prevMembers.map((m) =>
        m.id === selectedMember.id ? { ...m, status: "Inactive" } : m
      )
    );
    closeModal();
  };

  const getUsers = async () => {
    const res = await fetchUsers();
    setTeamMembers(res.data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUsers();
    }
  }, [isAuthenticated]);

  const filteredTeamMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function formatName(name) {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" ");
  }

  return (
    <div className="flex-1">
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Team Members</h3>
        </div>
        <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative">
              <input
                className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                placeholder="Search for members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                type="button"
              >
                <BiSearch />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col w-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Name
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Email
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Role
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Status
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500"></p>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTeamMembers.length > 0 ? (
              <>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200 py-5">
                      <p className="block font-normal text-sm text-slate-800">
                        {formatName(member.name)}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200 py-5">
                      <p className="text-sm text-slate-500">{member.email}</p>
                    </td>
                    <td className="p-4 border-b border-slate-200 py-5">
                      <p className="text-sm text-slate-500">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {member.roles[0]}
                        </span>
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200 py-5">
                      <p className="text-sm text-slate-500">{member.status}</p>
                    </td>
                    <td className="p-4 border-b border-slate-200 py-5">
                      <button
                        className="text-sm text-blue-500"
                        onClick={() => openModal(member)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Manage Member">
        {selectedMember && (
          <>
            <div className="space-y-2">
              <div className="flex">
                <p className="w-1/2">Name: {selectedMember.name}</p>
                <p className="w-1/2">Email: {selectedMember.email}</p>
              </div>
              <div className="flex">
                <div className="w-1/2">
                  <label>Role:</label>
                  <select
                    className="mt-1 ml-2 px-2 border border-gray-300 rounded-md"
                    value={selectedMember.roles[0]}
                    onChange={(e) => {
                      const updatedRoles = [e.target.value];
                      setSelectedMember((prev) => ({
                        ...prev,
                        roles: updatedRoles,
                      }));
                    }}
                  >
                    {ROLES.map((role) => (
                      <option key={role.code} value={role.code}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="mt-2">Status:</label>
                  <select
                    className="mt-1 ml-2 px-2 border border-gray-300 rounded-md"
                    value={selectedMember.roles[0]}
                    onChange={(e) => {
                      const updatedRoles = [e.target.value];
                      setSelectedMember((prev) => ({
                        ...prev,
                        roles: updatedRoles,
                      }));
                    }}
                  >
                    {USER_STATUS.map((status) => (
                      <option key={status.label} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm flex justify-center space-x-2">
              <button
                onClick={handleUpdate}
                className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update Details
              </button>

              <button
                onClick={handleRemove}
                className="py-2 px-8 bg-red-700 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
    // <div className="flex-1 p-4 bg-gray-50 border rounded-lg shadow-sm">
    //   <h2 className="text-2xl font-semibold mb-4">Team Management</h2>

    //   <input
    //     type="text"
    //     placeholder="Search by name or email..."
    //     value={searchQuery}
    //     onChange={(e) => setSearchQuery(e.target.value)}
    //     className="w-full p-2 border border-gray-300 rounded-md mb-4"
    //   />

    //   <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
    //     <thead>
    //       <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
    //         <th className="p-3 text-left">Name</th>
    //         <th className="p-3 text-left">Email</th>
    //         <th className="p-3 text-left">Roles</th>
    //         <th className="p-3 text-left">Status</th>
    //         <th className="p-3 text-left">Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {filteredTeamMembers.length > 0 ? (
    //         filteredTeamMembers.map((member) => (
    //           <tr key={member.id} className="border-b border-gray-200">
    //             <td className="p-3">
    //               <span className="text-gray-700">{member.name}</span>
    //             </td>
    //             <td className="p-3">
    //               <span className="text-gray-600">{member.email}</span>
    //             </td>
    //             <td className="p-3">
    //               <div className="flex gap-1">
    //                 {member.roles.map((role, index) => (
    //                   <span
    //                     key={index}
    //                     className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
    //                   >
    //                     {role}
    //                   </span>
    //                 ))}
    //               </div>
    //             </td>
    //             <td className="p-3">
    //               <label className="inline-flex items-center">
    //                 <input
    //                   type="checkbox"
    //                   className="form-checkbox h-5 w-5 text-green-500"
    //                   checked={member.status === "Active"}
    //                   onChange={() => {
    //                     const newStatus =
    //                       member.status === "Active" ? "Inactive" : "Active";
    //                     setTeamMembers((prev) =>
    //                       prev.map((m) =>
    //                         m.id === member.id ? { ...m, status: newStatus } : m
    //                       )
    //                     );
    //                   }}
    //                 />
    //                 <span className="ml-2 text-gray-600">{member.status}</span>
    //               </label>
    //             </td>
    //             <td className="p-3 flex space-x-2">
    //               <button
    //                 onClick={() => openModal(member)}
    //                 className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    //               >
    //                 Edit
    //               </button>
    //               <button
    //                 onClick={() => handleDeactivate()}
    //                 className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
    //               >
    //                 Deactivate
    //               </button>
    //               <button
    //                 onClick={() => handleRemove()}
    //                 className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
    //               >
    //                 Remove
    //               </button>
    //             </td>
    //           </tr>
    //         ))
    //       ) : (
    //         <tr>
    //           <td colSpan="5" className="p-3 text-center text-gray-500">
    //             No members found.
    //           </td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>

    // <Modal isOpen={isModalOpen} onClose={closeModal} title="Manage Member">
    //   {selectedMember && (
    //     <>
    //       <div className="space-y-2">
    //         <p>Name: {selectedMember.name}</p>
    //         <p>Email: {selectedMember.email}</p>
    //         <label>
    //           Role:
    //           <select
    //             className="block w-full mt-1 border rounded-md"
    //             value={selectedMember.roles[0]}
    //             onChange={(e) => {
    //               const updatedRoles = [e.target.value];
    //               setSelectedMember((prev) => ({
    //                 ...prev,
    //                 roles: updatedRoles,
    //               }));
    //             }}
    //           >
    //             {["Admin", "Member", "Viewer"].map((role) => (
    //               <option key={role} value={role}>
    //                 {role}
    //               </option>
    //             ))}
    //           </select>
    //         </label>
    //         <label className="flex items-center mt-2">
    //           Status:
    //           <input
    //             type="checkbox"
    //             className="form-checkbox ml-2"
    //             checked={selectedMember.status === "Active"}
    //             onChange={() =>
    //               setSelectedMember((prev) => ({
    //                 ...prev,
    //                 status: prev.status === "Active" ? "Inactive" : "Active",
    //               }))
    //             }
    //           />
    //           <span className="ml-2">{selectedMember.status}</span>
    //         </label>
    //       </div>

    //       <div className="mt-4 flex justify-between space-x-2">
    //         <button
    //           onClick={handleUpdate}
    //           className="flex-1 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    //         >
    //           Update Details
    //         </button>
    //         <button
    //           onClick={handleDeactivate}
    //           className="flex-1 p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
    //         >
    //           Deactivate
    //         </button>
    //         <button
    //           onClick={handleRemove}
    //           className="flex-1 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    //         >
    //           Remove
    //         </button>
    //       </div>
    //     </>
    //   )}
    // </Modal>
    // </div>
  );
};

export default TeamMembersTable;
