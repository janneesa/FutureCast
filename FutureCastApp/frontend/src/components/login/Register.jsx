import { Link } from "react-router-dom";

import Card from "../Card";

import useRegister from "../../hooks/useRegister";
import useToast from "../../hooks/useToast";
import { useEffect } from "react";

function Register() {
  const {
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
  } = useRegister();
  const { showErrorToast, showSuccessToast } = useToast();

  useEffect(() => {
    if (okMessage) {
      showSuccessToast(okMessage);
    }
  }, [okMessage]);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

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
              <button type="submit" className="button">
                Register
              </button>
            </div>
          </form>

          <div className="relative my-4">
            <div className="border-t border-gray-300"></div>
            <div className="absolute-center">
              <span className="bg-card dark:bg-darkCard px-2 text-secondaryText dark:text-darkSecondaryText text-sm">
                Or Sign in
              </span>
            </div>
          </div>

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
