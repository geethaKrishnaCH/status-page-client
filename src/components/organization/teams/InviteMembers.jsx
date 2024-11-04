import { useState } from "react";
import useAxios from "../../../stores/axios";
import useUsersAPI from "../../../utils/services/user";
import { toast } from "react-toastify";

const InviteMembers = () => {
  const [email, setEmail] = useState("");
  const axiosInstance = useAxios();
  const { inviteUser } = useUsersAPI(axiosInstance);
  // Handle inviting new team members
  const handleInvite = async () => {
    if (email.trim()) {
      await inviteUser(email);
      toast.success("Invitation sent!");
      setEmail("");
    }
  };
  return (
    <div className="w-1/3">
      <div className="p-4 bg-white border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Invite Team Member</h2>
        <div className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
