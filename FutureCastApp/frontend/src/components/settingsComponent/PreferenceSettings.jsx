import React, { useState, useEffect, useContext } from "react";
import Card from "../Card";
import Switcher from "../utility/switcher";
import Loading from "../Loading";

import { UserContext } from "../context/UserContext";

function PreferenceSettings() {
  const { user } = useContext(UserContext);
  // Load dark mode preference from localStorage
  const [darkmode, setDarkmode] = useState(() => {
    const savedPreference = localStorage.getItem("darkmode");
    return savedPreference ? JSON.parse(savedPreference) : false;
  });

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save dark mode preference to localStorage
    localStorage.setItem("darkmode", JSON.stringify(darkmode));
  }, [darkmode]);

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
          <Switcher
            isChecked={darkmode}
            onChange={() => setDarkmode(!darkmode)}
          />
        </div>
      </div>
    </Card>
  );
}

export default PreferenceSettings;
