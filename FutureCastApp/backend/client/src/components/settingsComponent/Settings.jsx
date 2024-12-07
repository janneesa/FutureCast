import React, { useState } from "react";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import PreferenceSettings from "./PreferenceSettings";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {/* Grid layout for large screens */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="flex justify-center items-start">
            <ProfileSettings />
          </div>
          <div className="flex justify-center items-start">
            <AccountSettings />
          </div>
          <div className="flex justify-center items-start">
            <NotificationSettings />
          </div>
          <div className="flex justify-center items-start">
            <PreferenceSettings />
          </div>
        </div>

        {/* Buttons layout for small screens */}
        <div className="lg:hidden">
          <div className="flex justify-around mb-4">
            <button
              className="button-ghost"
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className="button-ghost"
              onClick={() => setActiveTab("account")}
            >
              Account
            </button>
            <button
              className="button-ghost"
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </button>
            <button
              className="button-ghost"
              onClick={() => setActiveTab("preferences")}
            >
              Preferences
            </button>
          </div>

          <div className="flex justify-center">
            {activeTab === "profile" && <ProfileSettings />}
            {activeTab === "account" && <AccountSettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "preferences" && <PreferenceSettings />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
