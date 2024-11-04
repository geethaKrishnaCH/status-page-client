import { useAuth0 } from "@auth0/auth0-react";
import { SiInstatus } from "react-icons/si";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import ProfileHeader from "./ProfileHeader";
import useAccessContext from "../../stores/access-control";
const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { userInfo } = useAccessContext();
  return (
    <header className="bg-white">
      <nav className="relative flex items-center justify-between bg-white lg:rounded-md lg:shadow-sm lg:px-8 lg:py-2 md:px-4 md:py-2 sm:py-2 sm:px-4">
        <div>
          <Link to={"/"} title="Uptime" className="flex items-center gap-1">
            <SiInstatus
              size={18}
              className="text-blue-500 hover:text-blue-600"
            />
            <h2 className="text-lg font-medium text-blue-500 hover:text-blue-600">
              Uptime
            </h2>
          </Link>
        </div>
        <div className="flex lg:items-center lg:space-x-4 space-x-3">
          <Notification />
          {!isAuthenticated && (
            <button
              className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
              onClick={loginWithRedirect}
            >
              Sign in
            </button>
          )}

          {isAuthenticated && (
            <ProfileHeader userName={userInfo.name} onLogout={logout} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
