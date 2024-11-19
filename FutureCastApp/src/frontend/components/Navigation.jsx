import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { UserContext } from "./context/UserContext";

function Navigation() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (searchOpen) {
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    setSearchOpen(!searchOpen);
  };

  const handleSearch = () => {
    navigate("/app/search", { state: { searchWord } });
  };

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primaryText dark:text-darkPrimaryText">
              FutureCast
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/app/home" className="nav-link">
              Home
            </Link>
            <Link to="/app/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/app/search" className="nav-link">
              Search
            </Link>
            <Link to="/app/messages" className="nav-link">
              Messages
            </Link>
            <Link to="/app/settings" className="nav-link">
              Settings
            </Link>
            <Link to="/" onClick={handleLogout} className="nav-link">
              Logout
            </Link>
          </div>
          <div className="hidden lg:flex -ml-28">
            <input
              type="text"
              placeholder="Search on FutureCast"
              className="input"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <button className="button ml-4" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-primaryText hover:text-secondaryText focus:outline-none dark:text-darkPrimaryText"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/app/home"
              className="block nav-link"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/app/profile"
              className="block nav-link"
              onClick={toggleMenu}
            >
              Profile
            </Link>
            <button className="block nav-link" onClick={toggleSearch}>
              Search
            </button>
            <Link
              to="/app/messages"
              className="block nav-link"
              onClick={toggleMenu}
            >
              Messages
            </Link>
            <Link
              to="/app/settings"
              className="block nav-link"
              onClick={toggleMenu}
            >
              Settings
            </Link>
            <Link to="/" className="block nav-link" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </div>
      )}
      {searchOpen && (
        <div className="lg:hidden">
          <div className=" py-2 px-4 flex items-center">
            <input
              type="text"
              placeholder="Search users"
              className="input w-full"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            ></input>
            <div className="ml-2">
              <button className="button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
