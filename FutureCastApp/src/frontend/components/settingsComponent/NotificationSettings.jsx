import React, { useState } from "react";
import Card from "../Card";
import Switcher from "../utility/switcher";

function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const saveChanges = () => {
    console.log("Changes saved successfully!");
    console.log("Email Notifications:", emailNotifications);
    console.log("Push Notifications:", pushNotifications);
  };

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
