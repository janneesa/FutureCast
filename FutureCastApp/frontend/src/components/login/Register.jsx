import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validateDateofbirth } from "../../validations/RegisterValidation";

import Card from "../Card";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [error, setError] = useState("");
  const [okMessage, setOkMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      username: username,
      password: password,
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
          darkMode: true,
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

    await registerUser(newUser);
  };

  const registerUser = async (newUser) => {
    try {
      const response = await fetch("http://localhost:4000/api/users", {
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
      } else {
        setOkMessage("");
        setError(data.message);
      }
    } catch (error) {
      console.log("Failed to register user", error);
    }
  };

  return (
    <div className="flex-center min-h-screen p-4">
      <Card>
        <div className="card-header">
          <h2>Register for FutureCast</h2>
          <p>Enter your details to create an account</p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Firstname Lastname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phonenumber">Phone Number</label>
                <input
                  id="phonenumber"
                  type="tel"
                  placeholder="123-456-7890"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="dateofbirth">Date of Birth</label>
                <input
                  id="dateofbirth"
                  type="date"
                  value={dateofbirth}
                  onChange={(e) => setDateofbirth(e.target.value)}
                  className="input"
                  required
                />
              </div>
              {okMessage && <p className="text-green-600">{okMessage}</p>}
              {error && <p className="text-red-600">{error}</p>}
              <button type="submit" className="button" onClick={handleSubmit}>
                Register
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="border-t border-gray-300"></div>
            <div className="absolute-center">
              <span className="bg-card dark:bg-darkCard px-2 text-secondaryText dark:text-darkSecondaryText text-sm">
                Or Sign in
              </span>
            </div>
          </div>

          {/* Sign in */}
          <div className="flex-center">
            <Link to="/" className="button-secondary text-center">
              Sign In
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Register;
