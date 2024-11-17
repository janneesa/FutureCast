import React, { useState, useEffect } from "react";
import Card from "../Card";
import Switcher from "../utility/switcher";

function PreferenceSettings() {
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

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
