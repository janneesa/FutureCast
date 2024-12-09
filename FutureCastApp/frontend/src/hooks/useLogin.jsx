import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";
import useToast from "./useToast";

const useLogin = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { showPromiseToast } = useToast();

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      return showPromiseToast(
        Promise.reject(new Error("Please enter email and password")),
        {
          loading: "Checking credentials...",
          error: "Please enter email and password",
        }
      );
    }

    try {
      const loginPromise = fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setUser({ ...data.user, token: data.token });
          navigate("/app");
          return "Login successful!"; // Success message for toast
        } else {
          throw new Error(data.error || data.message || "Login failed");
        }
      });

      showPromiseToast(loginPromise, {
        loading: "Checking credentials...",
        success: (message) => message,
        error: (error) => error.message,
      });
    } catch (error) {
      showPromiseToast(Promise.reject(error), {
        loading: "Checking credentials...",
        error: error.message,
      });
    }
  };

  return { handleLogin };
};

export default useLogin;
