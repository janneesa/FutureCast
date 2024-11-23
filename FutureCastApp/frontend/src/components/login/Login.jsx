import { useState, useContext, useEffect } from "react";
import Card from "../Card";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Login() {
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // Mock Login
    e.preventDefault();
    // Check if email and password are empty
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    await fetchUser(email, password);
  };

  const fetchUser = async (email, password) => {
    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setUser(data);
        setError("");
        setEmail("");
        setPassword("");
        navigate("/app");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to login");
    }
  };

  return (
    <div className="flex-center min-h-screen p-4">
      {/* Card Title and description */}
      <Card>
        <div className="card-header">
          <h2>Login to FutureCast</h2>
          <p>Enter your email and password to access your account</p>
          <p>Test Credentials:</p>
          <p>m@example.com password</p>
        </div>

        {/* Card Content */}
        <div className="card-content">
          {/* Login Form */}
          <form>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {error && <p className="text-red-600">{error}</p>}
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="button" onClick={handleLogin}>
                Sign In
              </button>
            </div>
          </form>
          {/* Forgot password */}
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="link">
              Forgot password?
            </Link>
          </div>
          {/* Divider */}
          <div className="relative my-4">
            <div className="border-t border-gray-300"></div>
            <div className="absolute-center">
              <span className="bg-card dark:bg-darkCard px-2 text-secondaryText dark:text-darkSecondaryText text-sm">
                Or continue with
              </span>
            </div>
          </div>
          {/* Social login buttons */}
          <div className="flex gap-4">
            <button className="w-full p-2 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 text-primaryText dark:text-darkPrimaryText">
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.774.418-1.305.76-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.467-2.382 1.235-3.222-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.649.242 2.873.118 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.805 5.62-5.475 5.92.43.37.814 1.102.814 2.222 0 1.606-.015 2.896-.015 3.286 0 .319.217.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Github
            </button>
            <button className="w-full p-2 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 text-primaryText dark:text-darkPrimaryText">
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.087-.205-7.72-2.165-10.148-5.144-.423.722-.666 1.561-.666 2.457 0 1.69.861 3.179 2.169 4.055-.8-.026-1.555-.245-2.213-.612v.061c0 2.362 1.679 4.337 3.911 4.779-.409.111-.84.171-1.285.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.396 0-.79-.023-1.175-.067 2.179 1.397 4.768 2.212 7.557 2.212 9.054 0 14.002-7.496 14.002-13.986 0-.21 0-.423-.015-.635.961-.695 1.8-1.562 2.46-2.549z" />
              </svg>
              Twitter
            </button>
          </div>
          {/* Create Account */}
          <div className="card-footer">
            <div className="text-sm text-primaryText dark:text-darkPrimaryText">
              Don't have an account?
            </div>
            <button className="link hover:underline">
              <Link to="/register">Create an account</Link>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Login;
