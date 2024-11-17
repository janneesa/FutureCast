import React from "react";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import PreferenceSettings from "./PreferenceSettings";
import Card from "../Card";

function Settings() {
  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Profile Settings */}
          <div className="flex justify-center items-start">
            <ProfileSettings />
          </div>
          {/* Account Settings */}
          <div className="flex justify-center items-start">
            <AccountSettings />
          </div>
          {/* Predictions and Badges */}
          <div className="flex justify-center items-start">
            <NotificationSettings />
          </div>
          <div className="flex justify-center items-start">
            <PreferenceSettings />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
