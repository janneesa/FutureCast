import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";
import useToast from "./useToast";

const useRegister = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { showPromiseToast } = useToast();

  const validateDateofbirth = (dob) => {
    const now = new Date();
    const enteredDate = new Date(dob);
    return enteredDate > now ? "Date of birth cannot be in the future" : "";
  };

  const registerUser = async (newUser) => {
    // Fetch a random avatar
    const avatarResponse = await fetch("https://randomuser.me/api/");
    const avatarData = await avatarResponse.json();
    const avatarUrl = avatarData.results[0]?.picture.large || "";

    if (!avatarUrl) {
      throw new Error("Failed to fetch avatar");
    }

    newUser.avatar = avatarUrl;

    // Register user
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || "Failed to register user");
    }

    if (response.ok) {
      setUser({ ...data.user, token: data.token });
      navigate("/app");
      return "User registered successfully!";
    }
  };

  const handleRegister = (newUser) => {
    const errors = [validateDateofbirth(newUser.date_of_birth)].filter(Boolean);
    if (errors.length > 0) {
      return showPromiseToast(Promise.reject(new Error(errors.join(", "))), {
        loading: "Validating inputs...",
        error: (error) => error.message,
      });
    }

    const registrationPromise = registerUser(newUser);

    return showPromiseToast(registrationPromise, {
      loading: "Registering user...",
      success: "User registered successfully!",
      error: (error) => error.message,
    });
  };

  return { handleRegister };
};

export default useRegister;
