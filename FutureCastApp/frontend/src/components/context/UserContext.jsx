import React, { createContext } from "react";
import useUser from "../../hooks/useUser";

// Create UserContext
export const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
  const { user, setUser, isLoading } = useUser();

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
