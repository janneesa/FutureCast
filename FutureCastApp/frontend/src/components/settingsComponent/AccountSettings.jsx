import Card from "../Card";
import Loading from "../Loading";

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

import {
  validateEmail,
  validatePassword,
  checkPasswordMatch,
} from "../../validations/RegisterValidation";

function AccountSettings() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [emailOk, setEmailOk] = useState("");
  const [passwordOk, setPasswordOk] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [user]);

  const saveChanges = async () => {
    // Check if email has changed
    if (email.toLowerCase() !== user.email.toLowerCase()) {
      const validationError = validateEmail(email);
      if (validationError) {
        setEmailError(validationError);
        setEmailOk("");
        return;
      }
      // Save changes
      console.log("Saving changes");
      setEmailError("");
      await uploadNewEmail();
      setEmailOk("Email updated successfully");
    } else {
      setEmailOk("Email is same");
    }
  };

  const uploadNewEmail = async () => {};

  const resetPassword = async () => {
    const validationError = validatePassword(newPassword);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    const matchError = checkPasswordMatch(user.id, password);
    if (matchError) {
      setPasswordError(matchError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Reset password
    await uploadNewPassword();
  };

  const uploadNewPassword = async () => {
    // Reset password
    console.log("Resetting password");
    setPasswordError("");
    setPasswordOk("Password updated successfully");
  };

  if (!user) {
    return <Loading></Loading>; // Fallback UI while user data is being loaded
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
      {/* Account Settings */}
      <Card>
        <div className="card-header">
          <h2>Account Settings</h2>
          <p>Manage your account details and security</p>
        </div>
        <div className="card-content">
          {/* Email */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                placeholder={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>
          </div>
          {/* Save Button */}
          {emailError && <p className="text-red-600 mt-4">{emailError}</p>}
          {emailOk && <p className="text-green-600 mt-4">{emailOk}</p>}
          <div className="mt-4 w-32">
            <button className="button" onClick={saveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </Card>

      {/* Reset Password */}
      <Card>
        <div className="card-header">
          <h2>Reset Password</h2>
        </div>
        <div className="card-content">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Current Password</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                placeholder="********"
                onChange={(e) => setNewPassword(e.target.value)}
                className="input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                placeholder="********"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
              />
            </div>
          </div>
          {/* Save Button */}
          {passwordError && (
            <p className="text-red-600 mt-4">{passwordError}</p>
          )}
          {passwordOk && <p className="text-green-600 mt-4">{passwordOk}</p>}
          <div className="mt-4 w-32">
            <button className="button" onClick={resetPassword}>
              Save Changes
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default AccountSettings;
