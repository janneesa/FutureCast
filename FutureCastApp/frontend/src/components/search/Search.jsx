import SearchResult from "./SearchResult";
import Profile from "../profile/Profile";
import Loading from "../Loading";

import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { UserContext } from "../context/UserContext";

const API_URL = "http://localhost:4000/api/users/search/";

function Search() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const searchWord = location.state?.searchWord || "";

  const [results, setResults] = useState([]);
  const [viewingProfile, setViewingProfile] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (searchWord) {
      console.log("");

      fetchUserProfiles();
    }
  }, [searchWord]);

  const fetchUserProfiles = async () => {
    try {
      const response = await fetch(`${API_URL}${searchWord}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      const filteredData = data.filter((profile) => profile._id !== user?._id);
      setResults(filteredData);
      console.log(data);
    } catch (error) {
      console.error(`Error fetching users: ${error.message}`);
    }
  };

  const showProfile = async (id) => {
    console.log(`Viewing profile of user with id: ${id}`);
    try {
      const response = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const fetchedProfile = await response.json();

      if (response.ok) {
        setProfile(fetchedProfile);
        setViewingProfile(true);
      } else {
        console.log(fetchedProfile.message);
      }
    } catch (error) {
      console.error(`Error fetching user profile: ${error.message}`);
    }
  };

  const backToResults = () => {
    setViewingProfile(false);
  };

  if (!user) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 flex flex-col gap-4 items-center">
        {!viewingProfile &&
          results.map((result) => (
            <SearchResult
              key={result._id}
              avatar={result.avatar}
              username={result.username}
              predictionScore={result.predictionScore}
              id={result._id}
              viewProfileFunction={showProfile}
            />
          ))}
      </div>
      {viewingProfile && (
        <div className="max-w-[39rem] lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  flex">
          <div>
            <button className="button-secondary" onClick={backToResults}>
              Back to Results
            </button>
          </div>
        </div>
      )}
      {viewingProfile && <Profile profile={profile} />}
    </>
  );
}

export default Search;
