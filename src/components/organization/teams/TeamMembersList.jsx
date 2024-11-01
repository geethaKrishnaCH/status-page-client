import { useState } from "react";
import Modal from "../../common/Modal";

// Sample team data for demonstration
const initialTeamMembers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Member" },
  { id: 3, name: "Charlie Lee", email: "charlie@example.com", role: "Viewer" },
  { id: 4, name: "Dana Scully", email: "dana@example.com", role: "Member" },
];

const TeamMembersList = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to filter team members based on search query
  const filteredTeamMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    // Logic to update member details
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

  return (
    <div className="flex-1">
      <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Team Management</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        {/* Team Members List */}
        <ul className="space-y-3">
          {filteredTeamMembers.length > 0 ? (
            filteredTeamMembers.map((member) => (
              <li
                key={member.id}
                className="flex justify-between items-center p-3 border rounded-lg shadow-sm"
              >
                <div>
                  <h3 className="text-lg font-medium">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.email}</p>
                  <p className="text-sm text-gray-500">Role: {member.role}</p>
                  <p className="text-sm text-gray-500">
                    Status: {member.status}
                  </p>
                </div>
                <button
                  onClick={() => openModal(member)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No members found.</p>
          )}
        </ul>

        {/* Modal for managing member */}
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Manage Member">
          {selectedMember && (
            <>
              <p>Name: {selectedMember.name}</p>
              <p>Email: {selectedMember.email}</p>
              <p>Role: {selectedMember.role}</p>
              <p>Status: {selectedMember.status}</p>

              <div className="mt-4 space-y-3">
                <button
                  onClick={handleUpdate}
                  className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update Details
                </button>
                <button
                  onClick={handleDeactivate}
                  className="w-full p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Deactivate Member
                </button>
                <button
                  onClick={handleRemove}
                  className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove Member
                </button>
              </div>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default TeamMembersList;
