import React, { useState } from "react";
import Card from "./Card";

import { Outlet, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePhonenumberChange = (e) => setPhonenumber(e.target.value);
  const handleDateofbirthChange = (e) => setDateofbirth(e.target.value);

  const validateEmail = (email) => {
    // Email validation logic here
    return true;
  };

  const validateUserName = (username) => {
    // Username validation logic here
    if (username.length < 3) {
      setError("Name must be at least 3 characters long");
      return false;
    } else {
      return true;
    }
  };

  const validatePassword = (password) => {
    // Password validation logic here
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    } else {
      return true;
    }
  };

  const validatePhonenumber = (phonenumber) => {
    // Phonenumber validation logic here
    return true;
  };

  const validateDateofbirth = (dateofbirth) => {
    // Date of birth validation logic here
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      username: username,
      password: password,
      phonenumber: phonenumber,
      dateofbirth: dateofbirth,
    };
    if (
      validateUserName(newUser.name) &&
      validateEmail(newUser.email) &&
      validatePassword(newUser.password) &&
      validatePhonenumber(newUser.phonenumber) &&
      validateDateofbirth(newUser.dateofbirth)
    ) {
      if (registerUser(newUser)) {
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setPhonenumber("");
        setDateofbirth("");
        window.location.href = "/true";
      } else {
        setError("Error registering user");
      }
    }
  };

  const registerUser = (email, password) => {
    // Authenticate user logic here
    return true;
  };

  return (
    <div className="flex-center min-h-screen p-4">
      {/* Card Title and description */}
      <Card>
        <div className="card-header">
          <h2>Register to FutureCast</h2>
          <p>Enter your email and password to register a new account</p>
        </div>

        {/* Card Content */}
        <div className="card-content">
          {/* Login Form */}
          <form>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Firstname Lastname"
                  className="input"
                  required
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="input"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  className="input"
                  required
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="input"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Phone Number</label>
                <input
                  id="phonenumber"
                  type="text"
                  placeholder="Phone Number"
                  className="input"
                  required
                  value={phonenumber}
                  onChange={handlePhonenumberChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Date of Birth</label>
                <input
                  id="dateofbirth"
                  type="date"
                  placeholder="DD-MM-YYYY"
                  className="input"
                  required
                  value={dateofbirth}
                  onChange={handleDateofbirthChange}
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
