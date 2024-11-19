import Card from "../Card";
import SearchResult from "./SearchResult";
import Profile from "../profile/Profile";

import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { mockData } from "../../data/MockData";

function Search() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const searchWord = location.state?.searchWord || "";

  const [results, setResults] = useState([]);
  const [viewingProfile, setViewingProfile] = useState(false);
  const [profile, setProfile] = useState({});

  // Fetch users based on search word
  const fetchUsers = () => {
    const filteredUsers = mockData.users.filter((u) =>
      u.username.toLowerCase().includes(searchWord.toLowerCase())
    );
    // Remove current user from search results
    const currentUserIndex = filteredUsers.findIndex((u) => u.id === user.id);
    if (currentUserIndex > -1) {
      filteredUsers.splice(currentUserIndex, 1);
    }
    setResults(filteredUsers);
  };

  const showProfile = (id) => {
    console.log(`Viewing profile of user with id: ${id}`);
    const fetchedProfile = mockData.users.find((u) => u.id === id);
    if (fetchedProfile) {
      setProfile(fetchedProfile);
      setViewingProfile(true);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user, searchWord]);

  return (
    <>
      <div className="p-4 flex flex-col gap-4 items-center">
        {!viewingProfile &&
          results.map((result) => (
            <SearchResult
              key={result.id}
              avatar={result.avatar}
              username={result.username}
              predictionScore={result.predictionScore}
              id={result.id}
              viewProfileFunction={showProfile}
            />
          ))}
      </div>
      {viewingProfile && <Profile profile={profile} />}
    </>
  );
}

export default Search;
