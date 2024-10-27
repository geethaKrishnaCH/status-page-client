import { createContext, useState } from "react";

const UserContext = createContext({ user: {} });

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
