import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { SiInstatus } from "react-icons/si";
const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <header className="bg-white">
      <nav className="relative flex items-center justify-between bg-white lg:rounded-md lg:shadow-sm lg:px-8 lg:py-2">
        <div className="flex-shrink-0">
          <Link to={"/"} title="Uptime" className="flex items-center gap-1">
            <SiInstatus size={18} />
            <h2 className="text-2xl font-medium">Uptime</h2>
          </Link>
        </div>
        <div className="hidden lg:flex lg:items-center lg:space-x-10">
          {/* <button className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
            Sign up
          </button> */}

          {!isAuthenticated && (
            <button
              className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
              onClick={loginWithRedirect}
            >
              Sign in
            </button>
          )}

          {isAuthenticated && (
            <button
              className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
              onClick={logout}
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
