import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

import useToast from "../../hooks/useToast";
import useSettings from "../../hooks/useSettings";

import Card from "../Card";
import Loading from "../Loading";

function AccountSettings() {
  const { user, setUser } = useContext(UserContext);
  const { showErrorToast, showSuccessToast } = useToast();
  const { updateSettings, error, okMessage } = useSettings();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [user]);

  // Handle success and error toasts
  useEffect(() => {
    if (okMessage) {
      showSuccessToast(okMessage);
    }
    if (error) {
      showErrorToast(error);
    }
  }, [okMessage, error]);

  const saveChangesEmail = async () => {
    // Check if email has changed
    if (!email || email === user.email) {
      showErrorToast("Please enter a new email");
      return;
    }

    const updatedUser = {
      userId: user.id,
      email: email,
    };

    await updateSettings(updatedUser);
  };

  const resetPassword = async () => {
    // Reset password
    await uploadNewPassword();
  };

  const uploadNewPassword = async () => {
    // Reset password
    const token = user.token;

    const updatedUser = {
      userId: user.id,
      password: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await fetch(`/api/users/reset/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Assuming token-based authentication
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccessToast("Settings updated successfully");
      } else {
        showErrorToast(data.message);
      }
    } catch (error) {}
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
          <div className="mt-4 w-32">
            <button className="button" onClick={saveChangesEmail}>
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
