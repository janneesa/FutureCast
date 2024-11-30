import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginScreen from "./layouts/LoginScreen";
import MainScreen from "./layouts/MainScreen";

import Login from "./components/login/Login";
import Register from "./components/login/Register";
import ForgotPassword from "./components/login/ForgotPassword";

import Home from "./components/Home";
import MyProfile from "./components/profile/MyProfile";

import Search from "./components/search/Search";

import Messages from "./components/Messages";
import Settings from "./components/settingsComponent/Settings";

import { UserProvider } from "./components/context/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="bg-background min-h-screen dark:bg-darkBackground">
        <Toaster
          containerStyle={{
            top: 70,
          }}
        />
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
              <Route path="profile/:userId" element={<MyProfile />} />
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
