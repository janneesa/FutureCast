import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginScreen from "./frontend/layouts/LoginScreen";
import MainScreen from "./frontend/layouts/MainScreen";

import Login from "./frontend/components/Login";
import Profile from "./frontend/components/Profile";
import Prediction from "./frontend/components/Prediction";

function App() {
  const predictionx = {
    id: 1,
    user: "Alice",
    avatar:
      "https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b",
    prediction:
      "By 2025, renewable energy will account for 50% of global electricity production.",
    agrees: 120,
    disagrees: 30,
    comments: 15,
    lastVoteDate: "2024-12-31",
  };

  return (
    <div className="bg-background min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* Login Screen */}
          <Route path="/" element={<LoginScreen />}>
            <Route index element={<Login />} />
          </Route>

          {/* Home Page */}
          <Route path="/true" element={<MainScreen />}>
            <Route index element={<Profile />} />
            <Route path="home" element={<Prediction {...predictionx} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="search" element={<Prediction {...predictionx} />} />
            <Route path="messages" element={<Prediction {...predictionx} />} />
            <Route path="settings" element={<Prediction {...predictionx} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
