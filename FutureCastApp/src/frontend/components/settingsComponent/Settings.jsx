import React, { useEffect, useState, useContext } from "react";

import Card from "../Card";
import ProfileSettings from "./ProfileSettings";

import { UserContext } from "../context/UserContext";
import { mockData } from "../../data/MockData";

function Settings() {
  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Profile Settings */}
          <div className="flex justify-center items-center">
            <ProfileSettings />
          </div>
          {/* Stats */}
          <div className="flex justify-center items-center">
            <Card>second</Card>
          </div>
          {/* Predictions and Badges */}
          <div className="flex justify-center items-center">
            <Card>third</Card>
          </div>
          <div className="flex justify-center items-center">
            <Card>fourth</Card>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Settings;
