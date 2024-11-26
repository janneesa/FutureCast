import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginScreen from "./layouts/LoginScreen";
import MainScreen from "./layouts/MainScreen";

import Login from "./components/login/Login";
import Register from "./components/login/Register";
import ForgotPassword from "./components/login/ForgotPassword";

import Home from "./components/Home";
import Profile from "./components/profile/Profile";

import Search from "./components/search/Search";

import Messages from "./components/messageComponent/Messages";
import Settings from "./components/settingsComponent/Settings";

import { UserProvider } from "./components/context/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="bg-background min-h-screen dark:bg-darkBackground">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginScreen />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>

            <Route path="/app" element={<MainScreen />}>
              <Route index element={<Home />} />
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
