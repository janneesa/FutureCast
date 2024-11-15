import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import LoginScreen from "./frontend/layouts/LoginScreen";
import MainScreen from "./frontend/layouts/MainScreen";

import Login from "./frontend/components/login/Login";
import Register from "./frontend/components/login/Register";
import ForgotPassword from "./frontend/components/login/ForgotPassword";

import Home from "./frontend/components/Home";
import Profile from "./frontend/components/Profile/Profile";
import Search from "./frontend/components/search/Search";
import Messages from "./frontend/components/Messages";
import Settings from "./frontend/components/Settings";

import { mockData } from "./frontend/data/MockData";

function App() {
  // User State
  const [user, setUser] = useState(null);

  // getUser Function gets passed down to Login.jsx to handle login.
  // Function is setup in App.jsx because user state is managed here.
  const getUser = async (email, password) => {
    // Logic Here

    // Mock Login
    if (email && password) {
      const users = mockData.users;
      const fetchedUser = users.find(
        (user) => user.email === email && user.password === password
      );
      setUser(fetchedUser);
      return fetchedUser;
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* Login Screen */}
          <Route path="/" element={<LoginScreen />}>
            <Route index element={<Login loginFunction={getUser} />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Home Page */}
          <Route path="/app" element={<MainScreen />}>
            <Route index element={<Profile user={user} />} />
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile user={user} />} />
            <Route path="search" element={<Search />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
