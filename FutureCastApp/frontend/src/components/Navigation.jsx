import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import useNotifications from "../hooks/useNotifications";

function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { notifications, clearNotifications } = useNotifications();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {}, [user]);

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

  const showNotifications = () => {
    setSearchResults([]);
    setNotificationsOpen(!notificationsOpen);
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
              className="text-2xl font-bold text-primaryText dark:text-darkPrimaryText cursor-pointer"
              onClick={handleNavigate}
            >
              FutureCast
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-4 ml-14">
            <Link to="/app/home" className="nav-link">
              Home
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
          <div className="relative flex">
            <form
              className="max-h-10 self-center hidden lg:flex -ml-28 text-primaryText dark:text-darkPrimaryText"
              onSubmit={handleSearch}
            >
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
            </form>
            <button
              onClick={showNotifications}
              className="hidden lg:block text-secondaryText dark:text-darkSecondaryText ml-4 transition transform hover:scale-105 hover:border-secondaryButton dark:hover:border-darkSecondaryButton"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
              {notifications?.length > 0 && (
                <span className="absolute top-3 left-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>
            {notificationsOpen && notifications?.length > 0 && (
              <ul className="hidden min-w-fit max-w-fit lg:block -ml-28 mt-14 absolute bg-white dark:bg-gray-800 w-full rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-600">
                <li
                  className="p-2 rounded-md bg-toastError text-primaryText dark:text-darkPrimaryText hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={clearNotifications}
                >
                  Clear Notifications
                </li>
                {notifications?.map((notification, index) => (
                  <li key={index} className="p-2">
                    <p>{notification}</p>
                  </li>
                ))}
              </ul>
            )}

            {searchResults && searchResults.length > 0 && (
              <ul className="hidden min-w-fit max-w-fit lg:block -ml-28 mt-14 absolute bg-white dark:bg-gray-800 w-full rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-600">
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
            <div className="ml-4 hidden lg:block">
              <Link to={profileLink} className="">
                <img
                  src={user.avatar}
                  alt={user.avatar}
                  className="h-12 w-12 rounded-full mr-2 border-2 border-primaryButton dark:border-darkPrimaryButton transition transform hover:scale-105 hover:border-secondaryButton dark:hover:border-darkSecondaryButton"
                />
              </Link>
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={showNotifications}
              className="lg:hidden mr-4 text-secondaryText dark:text-darkSecondaryText ml-4 transition transform hover:scale-105 hover:border-secondaryButton dark:hover:border-darkSecondaryButton relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 mb-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
              {notifications?.length > 0 && (
                <span className="absolute top-0 left-3  inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>
            {notificationsOpen && notifications?.length > 0 && (
              <ul className="lg:hidden mr-2 absolute right-0 bg-white dark:bg-gray-800 w-64 rounded-md shadow-lg z-50 border border-rou border-gray-200 dark:border-gray-600">
                <li
                  className="p-2 bg-toastError rounded-md text-darkPrimaryText hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={clearNotifications}
                >
                  Clear Notifications
                </li>
                {notifications?.map((notification, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                  >
                    <p className="text-primaryText dark:text-darkPrimaryText">
                      {notification}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={toggleMenu}
              className="text-primaryText hover:text-secondaryText focus:outline-none dark:text-darkPrimaryText"
            >
              <div className="mt-2">
                <img
                  src={user.avatar}
                  alt={user.avatar}
                  className="h-12 w-12 rounded-full mr-2 border-2 border-primaryButton dark:border-darkPrimaryButton transition transform hover:scale-105 hover:border-secondaryButton dark:hover:border-darkSecondaryButton"
                />
              </div>
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
