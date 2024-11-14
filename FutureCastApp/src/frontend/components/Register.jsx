import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "./Card";
import {
  validateEmail,
  validateUserName,
  validatePassword,
  validatePhonenumber,
  validateDateofbirth,
} from "../validations/RegisterValidation";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePhonenumberChange = (e) => setPhonenumber(e.target.value);
  const handleDateofbirthChange = (e) => setDateofbirth(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      username: username,
      password: password,
      phonenumber: phonenumber,
      dateofbirth: dateofbirth,
    };

    const errors = [
      validateEmail(newUser.email),
      validateUserName(newUser.username),
      validatePassword(newUser.password),
      validatePhonenumber(newUser.phonenumber),
      validateDateofbirth(newUser.dateofbirth),
    ].filter((error) => error !== "");

    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }

    try {
      const response = await registerUser(newUser);

      if (response) {
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setPhonenumber("");
        setDateofbirth("");
        navigate("/");
        alert("User registered successfully");
      } else {
        setError("Error registering user");
      }
    } catch (error) {
      setError("Registration failed. Please try again later.");
    }
  };

  const registerUser = async (newUser) => {
    // Register user logic here
    return true;
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
                  onChange={handleNameChange}
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
                  onChange={handleEmailChange}
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
                  onChange={handleUsernameChange}
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
                  onChange={handlePasswordChange}
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
                  onChange={handlePhonenumberChange}
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
                  onChange={handleDateofbirthChange}
                  className="input"
                  required
                />
              </div>
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
              <span className="bg-white px-2 text-gray-600 text-sm">
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
