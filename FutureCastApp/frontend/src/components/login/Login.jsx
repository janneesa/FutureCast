import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import useLogin from "../../hooks/useLogin";

import { useGoogleLogin } from "@react-oauth/google";
import useGoogleRegister from "../../hooks/useGoogleRegister";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleUser, setGoogleUser] = useState(null);
  const { handleLogin } = useLogin();
  const { handleGoogleRegister } = useGoogleRegister();

  useEffect(() => {
    if (googleUser) {
      handleGoogleRegister(googleUser);
    }
  }, [googleUser]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        if (!userInfoResponse.ok) {
          throw new Error("Failed to fetch user info");
        }

        const userInfo = await userInfoResponse.json();
        setGoogleUser({
          email: userInfo.email,
          name: userInfo.name,
          username: userInfo.email.split("@")[0],
          avatar: userInfo.picture,
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    handleLogin(email, password); // Pass email and password to the hook
  };

  return (
    <div className="flex-center min-h-screen p-4">
      <Card>
        <div className="card-header">
          <h2>Login to FutureCast</h2>
          <p>Enter your email and password to access your account</p>
        </div>

        <div className="card-content">
          <form>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
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
              <button type="submit" className="button" onClick={handleClick}>
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="link">
              Forgot password?
            </Link>
          </div>
          <div className="relative my-4">
            <div className="border-t border-gray-300"></div>
            <div className="absolute-center">
              <span className="bg-card dark:bg-darkCard px-2 text-secondaryText dark:text-darkSecondaryText text-sm">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex justify-center w-full">
            {/* Custom Button for Google Login */}
            <button className="button" onClick={() => googleLogin()}>
              Sign in with Google
            </button>
          </div>
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
