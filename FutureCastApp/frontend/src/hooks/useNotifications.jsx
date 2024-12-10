import { useState, useEffect, useContext } from "react";
import { UserContext } from "../components/context/UserContext";
import useToast from "./useToast";

const useNotifications = () => {
  const { user, setUser } = useContext(UserContext);
  const { showErrorToast, showSuccessToast } = useToast();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      setNotifications(user.notifications);
    }
  }, [user]);

  const addNotification = async (userId, message) => {
    try {
      const response = await fetch(`/api/users/addNotification/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to add notification");
      }

      const data = await response.json();
      setNotifications((prev) => [...prev, message]);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const clearNotifications = async () => {
    try {
      const response = await fetch(`/api/users/clearNotifications/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear notifications");
      }

      const data = await response.json();
      setNotifications([]);
      setUser((prev) => ({ ...prev, notifications: [] }));
      showSuccessToast(data.message);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return {
    notifications,
    addNotification,
    clearNotifications,
  };
};

export default useNotifications;
