import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import LoginScreen from "./frontend/layouts/LoginScreen";
import MainScreen from "./frontend/layouts/MainScreen";

import Login from "./frontend/components/Login";
import Register from "./frontend/components/Register";
import Home from "./frontend/components/Home";
import Profile from "./frontend/components/Profile/Profile";
import Search from "./frontend/components/Search";
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
      const fetchedUser = mockData.user;
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
