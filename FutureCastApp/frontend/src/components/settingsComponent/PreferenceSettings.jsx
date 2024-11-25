import { UserContext } from "../context/UserContext";

import React, { useState, useEffect, useContext } from "react";
import Card from "../Card";
import Switcher from "../utility/switcher";
import Loading from "../Loading";

function PreferenceSettings() {
  const { user, setUser } = useContext(UserContext);
  const [darkmode, setDarkmode] = useState(true);

  const [error, setError] = useState("");
  const [okMessage, setOkMessage] = useState("");

  useEffect(() => {
    if (user) {
      setDarkmode(user.settings.preferences.darkMode);
    }
  }, [user]);

  const handleSwitch = async () => {
    const updatedUser = { ...user };
    updatedUser.settings.preferences.darkMode = !darkmode;

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
        <h2>Preferences</h2>
        <p>Manage your preferences</p>
      </div>
      <div className="card-content">
        <div className="flex justify-between items-center">
          <h5>Dark Mode</h5>
          <Switcher isChecked={darkmode} onChange={handleSwitch} />
        </div>
        {error && <div className="error-text">{error}</div>}
        {okMessage && <div className="ok-text">{okMessage}</div>}
      </div>
    </Card>
  );
}

export default PreferenceSettings;
