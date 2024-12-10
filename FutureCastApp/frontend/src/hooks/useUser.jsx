import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // Mark initialization as complete
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      document.documentElement.classList.toggle(
        "dark",
        user.settings?.preferences?.darkMode
      );
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return { user, setUser, isLoading };
};

export default useUser;
