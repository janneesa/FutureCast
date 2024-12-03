import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Card from "../Card";
import Switcher from "../utility/switcher";
import Loading from "../Loading";
import useToast from "../../hooks/useToast";
import useSettings from "../../hooks/useSettings";

function PreferenceSettings() {
  const { user } = useContext(UserContext); // Access user data from useSettings hook
  const { updateSettings, error, okMessage } = useSettings(); // Use the update logic from the hook
  const { showSuccessToast, showErrorToast } = useToast();

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

  // Handle success and error toasts
  useEffect(() => {
    if (okMessage) {
      showSuccessToast(okMessage);
    }
    if (error) {
      showErrorToast(error);
    }
  }, [okMessage, error]);

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
