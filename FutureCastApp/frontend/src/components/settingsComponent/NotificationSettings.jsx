import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Card from "../Card";
import Switcher from "../utility/Switcher";
import Loading from "../Loading";
import useSettings from "../../hooks/useSettings";

function NotificationSettings() {
  const { updateSettings } = useSettings();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const { user } = useContext(UserContext); // Assuming user context provides user info

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

    await updateSettings(updatedUser);
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
