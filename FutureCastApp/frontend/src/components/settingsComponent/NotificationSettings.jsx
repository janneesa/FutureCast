import React, { useState, useContext, useEffect } from "react";
import Card from "../Card";
import Switcher from "../utility/switcher";
import Loading from "../Loading";
import { UserContext } from "../context/UserContext";

function NotificationSettings() {
  const { user, setUser } = useContext(UserContext);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const [error, setError] = useState("");
  const [okMessage, setOkMessage] = useState("");

  useEffect(() => {
    if (user) {
      setEmailNotifications(user.settings.notifications.email);
      setPushNotifications(user.settings.notifications.push);
    }
  }, [user]);

  const saveChanges = async () => {
    const updatedUser = { ...user };
    updatedUser.settings.notifications.email = emailNotifications;
    updatedUser.settings.notifications.push = pushNotifications;

    try {
      const response = await fetch(
        `http://localhost:4000/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setOkMessage("Settings updated successfully");
        setError("");
      }
    } catch (error) {
      setError("Failed to update settings");
      setOkMessage("");
      console.error(error);
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <Card>
      <div className="card-header">
        <h2>Notification Settings</h2>
        <p>Manage your notification preferences</p>
      </div>
      <div className="card-content">
        <div className="flex justify-between items-center">
          <h5>Email Notifications</h5>
          <Switcher
            isChecked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <h5>Push Notifications</h5>
          <Switcher
            isChecked={pushNotifications}
            onChange={() => setPushNotifications(!pushNotifications)}
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        {okMessage && <p className="ok-text">{okMessage}</p>}
        <div className="mt-4 w-32">
          <button className="button" onClick={saveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </Card>
  );
}

export default NotificationSettings;
