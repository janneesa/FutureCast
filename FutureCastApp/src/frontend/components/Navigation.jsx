import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-between h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold text-primaryText">FutureCast</div>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link
              to="/true/home"
              className="text-primaryText hover:text-secondaryText"
            >
              Home
            </Link>
            <Link
              to="/true/profile"
              className="text-primaryText hover:text-secondaryText"
            >
              Profile
            </Link>
            <Link
              to="/true/search"
              className="text-primaryText hover:text-secondaryText"
            >
              Search
            </Link>
            <Link
              to="/true/messages"
              className="text-primaryText hover:text-secondaryText"
            >
              Messages
            </Link>
            <Link
              to="/true/settings"
              className="text-primaryText hover:text-secondaryText"
            >
              Settings
            </Link>
            <Link to="/" className="text-primaryText hover:text-secondaryText">
              Logout
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-primaryText hover:text-secondaryText focus:outline-none"
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="block text-primaryText hover:text-secondaryText"
            >
              Home
            </a>
            <a
              href="/profile"
              className="block text-primaryText hover:text-secondaryText"
            >
              Profile
            </a>
            <a
              href="/search"
              className="block text-primaryText hover:text-secondaryText"
            >
              Search
            </a>
            <a
              href="/messages"
              className="block text-primaryText hover:text-secondaryText"
            >
              Messages
            </a>
            <a
              href="/settings"
              className="block text-primaryText hover:text-secondaryText"
            >
              Settings
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
