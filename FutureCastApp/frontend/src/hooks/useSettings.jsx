import { useContext, useState } from "react";
import { UserContext } from "../components/context/UserContext";

const useSettings = () => {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [okMessage, setOkMessage] = useState(false);

  const updateSettings = async (updatedData) => {
    setError(null); // Clear previous errors
    setOkMessage(false); // Clear previous success messages

    const token = user.token;

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Assuming token-based authentication
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser({ ...updatedUser, token });
        setOkMessage("Settings updated successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update settings");
        setOkMessage(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return { updateSettings, error, okMessage };
};

export default useSettings;
