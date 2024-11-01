import InviteMembers from "./InviteMembers";
import TeamMembersList from "./TeamMembersList";

function TeamsPage() {
  return (
    <div className="flex p-6 mx-auto gap-3">
      <TeamMembersList />
      <InviteMembers />
    </div>
  );
}

export default TeamsPage;
