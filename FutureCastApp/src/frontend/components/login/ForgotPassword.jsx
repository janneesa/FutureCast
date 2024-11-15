import Card from "../Card";
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    // Logic Here
  };

  return (
    <div className="flex-center min-h-screen p-4">
      <Card>
        <div className="card-header">
          <h2>Forgot password</h2>
          <p>Enter your email to reset password</p>
        </div>
        <div className="card-content">
          <form>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="input"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>

              <button type="submit" className="button" onClick={handleSubmit}>
                Send Reset Link
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
export default ForgotPassword;
