import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { UserContext } from "./context/UserContext";

function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const profileLink = user ? `/app/profile/${user.id}` : null;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".relative")) {
        setSearchResults([]);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (searchOpen) {
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    setSearchOpen(!searchOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchResults([]);
    navigate("/app/search", { state: { searchWord } });
  };

  const handleChange = (value) => {
    fetchSearchResults(value);
    console.log(searchResults);
  };

  const handleNavigate = () => {
    navigate("/app/home");
  };

  const fetchSearchResults = async (searchWord) => {
    if (searchWord === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(`/api/users/search/${searchWord}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const users = await response.json();
        //remove the logged in user and friends from the search results
        setSearchResults(users);
      } else {
        throw new Error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-between h-16">
          <div className="flex items-center">
            <div
              className="text-2xl font-bold text-primaryText dark:text-darkPrimaryText"
              onClick={handleNavigate}
            >
              FutureCast
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/app/home" className="nav-link">
              Home
            </Link>
            <Link to={profileLink} className="nav-link">
              Profile
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
          <div className="relative">
            <form className="hidden lg:flex -ml-28" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search on FutureCast"
                className="input"
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                  handleChange(e.target.value);
                }}
              />
              <button type="submit" className="button ml-4">
                Search
              </button>
            </form>

            {searchResults && searchResults.length > 0 && (
              <ul className="hidden min-w-fit max-w-fit lg:block -ml-28 absolute bg-white dark:bg-gray-800 w-full mt-1 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-600">
                {searchResults.map((user) => (
                  <li
                    key={user.username}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => {
                      navigate(`/app/profile/${user.id}`);
                      setSearchResults([]);
                    }}
                  >
                    <p>
                      {user.name} ({user.username})
                    </p>
                  </li>
                ))}
              </ul>
            )}
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
              to={profileLink}
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
        <div className="lg:hidden relative px-4 py-2">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search users"
              className="input w-full"
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value);
                handleChange(e.target.value);
              }}
            />
            <button type="submit" className="button ml-2 max-w-fit">
              Search
            </button>
          </form>
          {searchResults && searchResults.length > 0 && (
            <ul className="absolute max-w-fit min-w-fit bg-white dark:bg-gray-800 w-full mt-2 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-600">
              {searchResults.map((user) => (
                <li
                  key={user.username}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    navigate(`/app/profile/${user.id}`);
                    setSearchResults([]);
                  }}
                >
                  <p>
                    {user.name} ({user.username})
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navigation;
