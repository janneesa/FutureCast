import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import LoginScreen from "./frontend/layouts/LoginScreen";
import MainScreen from "./frontend/layouts/MainScreen";

import Login from "./frontend/components/login/Login";
import Register from "./frontend/components/login/Register";
import ForgotPassword from "./frontend/components/login/ForgotPassword";

import Home from "./frontend/components/Home";
import Profile from "./frontend/components/profile/Profile";

import Search from "./frontend/components/search/Search";

import Messages from "./frontend/components/Messages";
import Settings from "./frontend/components/settingsComponent/Settings";

import { UserProvider } from "./frontend/components/context/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="bg-background min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginScreen />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>

            <Route path="/app" element={<MainScreen />}>
              <Route index element={<Profile />} />
              <Route path="home" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="search" element={<Search />} />
              <Route path="messages" element={<Messages />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
