import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";
import useToast from "./useToast";

const useGoogleRegister = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { showPromiseToast } = useToast();

  const registerGoogleUser = async (googleUser) => {
    const response = await fetch("/api/users/google-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(googleUser),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to authenticate with Google");
    }

    setUser({ ...data.user, token: data.token });
    navigate("/app");
    return "User authenticated successfully!";
  };

  const handleGoogleRegister = (googleUser) => {
    const registrationPromise = registerGoogleUser(googleUser);

    return showPromiseToast(registrationPromise, {
      loading: "Authenticating user...",
      success: "User authenticated successfully!",
      error: (error) => error.message,
    });
  };

  return { handleGoogleRegister };
};

export default useGoogleRegister;
