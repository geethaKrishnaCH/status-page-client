import { useState } from "react";

const InviteMembers = () => {
  const [inviteEmail, setInviteEmail] = useState("");

  // Handle inviting new team members
  const handleInvite = () => {
    if (inviteEmail) {
      setTeam((prevTeam) => [
        ...prevTeam,
        {
          id: team.length + 1,
          name: inviteEmail,
          email: inviteEmail,
          role: "Member",
        },
      ]);
      setInviteEmail("");
    }
  };
  return (
    <div className="w-1/3">
      <div className="p-4 bg-white border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Invite Team Member</h2>
        <div className="flex flex-col gap-3">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Enter email address"
            className="p-2 border rounded-lg"
          />
          <button
            onClick={handleInvite}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg"
          >
            Invite
          </button>
          <p className="text-sm text-gray-500">
            An invitation will be sent to this email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InviteMembers;
