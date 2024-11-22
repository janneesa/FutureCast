import { Outlet, Link } from "react-router-dom";
import Navigation from "../components/Navigation";

function MainScreen() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
export default MainScreen;
