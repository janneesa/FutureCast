import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) {
      const { password, ...userData } = user; // Exclude password
      localStorage.setItem("user", JSON.stringify(userData));
      document.documentElement.classList.toggle(
        "dark",
        user.settings?.preferences?.darkMode
      );
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return { user, setUser };
};

export default useUser;
