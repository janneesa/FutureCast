import React, { createContext, useState, useEffect } from "react";

// Create UserContext
export const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    if (user) {
      const { email, password, ...userData } = user; // Exclude email and password
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
