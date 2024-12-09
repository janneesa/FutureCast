import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Card from "../Card";
import Switcher from "../utility/Switcher";
import Loading from "../Loading";
import useSettings from "../../hooks/useSettings";

function PreferenceSettings() {
  const { user } = useContext(UserContext); // Access user data from useSettings hook
  const { updateSettings } = useSettings(); // Use the update logic from the hook

  const [darkmode, setDarkmode] = useState(true);

  // Populate initial state for dark mode preference
  useEffect(() => {
    if (user) {
      setDarkmode(user.settings?.preferences?.darkMode || false);
    }
  }, [user]);

  const handleSwitch = () => {
    const updatedPreferences = {
      ...user.settings.preferences,
      darkMode: !darkmode,
    };

    const updatedData = {
      settings: {
        ...user.settings,
        preferences: updatedPreferences,
      },
    };

    updateSettings(updatedData); // Call hook to update settings
    setDarkmode(!darkmode); // Update local state for instant feedback
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
      </div>
    </Card>
  );
}

export default PreferenceSettings;
