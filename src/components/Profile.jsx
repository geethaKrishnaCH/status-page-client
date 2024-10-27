import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
  return (
    <article>
      {user?.profile && <img src={user.profile} alt={user?.name} />}
      {user &&
        Object.keys(user).map((key) => (
          <li key={key}>
            {key}: {user[key]}
          </li>
        ))}
    </article>
  );
};

export default Profile;
