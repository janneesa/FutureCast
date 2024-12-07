import { useState } from "react";

const useRegister = (onSuccess) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [error, setError] = useState("");
  const [okMessage, setOkMessage] = useState("");

  const validateDateofbirth = (dob) => {
    // Example validation: Ensure DOB is not in the future
    const now = new Date();
    const enteredDate = new Date(dob);
    return enteredDate > now ? "Date of birth cannot be in the future" : "";
  };

  const registerUser = async (newUser) => {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const avatarUrl = data.results[0].picture.large;
      if (!avatarUrl) {
        setError("Failed to fetch avatar");
        throw new Error("Failed to fetch avatar");
      }
      newUser.avatar = avatarUrl;
    } catch (error) {
      console.error("Failed to fetch avatar:", error);
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      if (response.ok) {
        setOkMessage("User registered successfully");
        setError("");
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setPhonenumber("");
        setDateofbirth("");
        onSuccess && onSuccess(data);
      } else {
        setOkMessage("");
        setError(data.message);
      }
    } catch (error) {
      console.log("Failed to register user", error);
      setError("An error occurred while registering");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      username,
      password,
      phone_number: phonenumber,
      date_of_birth: dateofbirth,
      bio: "",
      followers: [],
      following: [],
      predictions: [],
      successfulPredictions: [],
      predictionScore: 0,
      avatar: "",
      settings: {
        notifications: {
          email: true,
          push: true,
        },
        preferences: {
          darkMode: false,
        },
      },
    };

    const errors = [validateDateofbirth(newUser.date_of_birth)].filter(
      (error) => error !== ""
    );

    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }

    registerUser(newUser);
  };

  return {
    name,
    setName,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    phonenumber,
    setPhonenumber,
    dateofbirth,
    setDateofbirth,
    error,
    okMessage,
    handleSubmit,
  };
};

export default useRegister;
