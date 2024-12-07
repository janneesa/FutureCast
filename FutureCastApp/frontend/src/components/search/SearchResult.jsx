import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Card from "../Card";
import Prediction from "../Prediction";
import Loading from "../Loading";

const API_URL_USERS = "http://localhost:4000/api/users/search/";
const API_URL_POSTS = "http://localhost:4000/api/posts/search/";

function SearchResult({ avatar, username, predictionScore, id }) {
  const navigate = useNavigate();

  const showProfile = () => {
    navigate(`/app/profile/${id}`); // Navigate to the user's profile
  };

  return (
    <Card className="card">
      <div className="card-content flex flex-row" onClick={showProfile}>
        <img
          src={avatar}
          alt={`${username}'s avatar`}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <h3 className="font-semibold self-center">{username}</h3>
          <h5>Prediction Score: {predictionScore}</h5>
        </div>
      </div>
    </Card>
  );
}

function Search() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const searchWord = location.state?.searchWord || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("users"); // "users" or "posts"

  useEffect(() => {
    if (searchWord) {
      searchType === "users" ? fetchUserProfiles() : fetchPostsByCategory();
    }
  }, [searchWord, searchType]);

  const fetchUserProfiles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL_USERS}${searchWord}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      // Exclude the current user from search results
      const filteredData = data.filter((profile) => profile.id !== user?.id);
      setResults(filteredData);
    } catch (error) {
      console.error(`Error fetching users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostsByCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL_POSTS}?category=${searchWord}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch posts");
      }

      setResults(data);
    } catch (error) {
      console.error(`Error fetching posts: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <div className="flex gap-4">
      </div>
      {loading && <Loading />}
      {!loading &&
        results.map((result) =>
          searchType === "users" ? (
            <SearchResult
              key={result.id}
              avatar={result.avatar}
              username={result.username}
              predictionScore={result.predictionScore}
              id={result.id}
            />
          ) : (
            <Prediction
              key={result.id}
              id={result.id}
              username={result.username}
              userId={result.userId}
              avatar={result.avatar}
              lastVoteDate={result.lastVoteDate}
              prediction={result.prediction}
              agrees={result.agrees}
              disagrees={result.disagrees}
              comments={result.comments}
              category={result.category}
            />
          )
        )}
      {!loading && results.length === 0 && (
        <p className="text-muted-foreground">No results found.</p>
      )}
    </div>
  );
}

export default Search;