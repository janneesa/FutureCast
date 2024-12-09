import { useContext } from "react";
import { UserContext } from "../components/context/UserContext";
import useToast from "./useToast";

const useSettings = () => {
  const { user, setUser } = useContext(UserContext);
  const { showPromiseToast } = useToast(); // Use centralized toast logic

  const updateSettings = async (updatedData) => {
    const token = user.token;

    const updatePromise = fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Assuming token-based authentication
      },
      body: JSON.stringify(updatedData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || errorData.message || "Failed to update settings"
          );
        }
        const updatedUser = await response.json();
        setUser({ ...updatedUser, token });
      })
      .catch((err) => {
        console.error(err);
        throw err; // Pass the error to the toast.promise handler
      });

    showPromiseToast(updatePromise, {
      loading: "Saving changes...",
      success: "Settings updated successfully!",
      error: (error) => error.message || "Failed to update settings",
    });
  };

  return { updateSettings };
};

export default useSettings;
