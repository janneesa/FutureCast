import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Prediction from "../Prediction";
import SearchResult from "./SearchResult";
import Loading from "../Loading";

const API_URL_PREDICTIONS = "/api/predictions/search/";
const API_URL_USERS = "/api/users/search/";

function Search() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const searchWord = location.state?.searchWord || "";

  const [predictions, setPredictions] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchWord) {
      performSearch();
    }
  }, [searchWord]);

  const performSearch = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchPredictionsByCategory(), fetchUserProfiles()]);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPredictionsByCategory = async () => {
    try {
      const response = await fetch(`${API_URL_PREDICTIONS}${searchWord}`);
      if (!response.ok) {
        throw new Error("Failed to fetch predictions");
      }
      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
    }
  };

  const fetchUserProfiles = async () => {
    try {
      const response = await fetch(`${API_URL_USERS}${searchWord}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      // Exclude the current user from search results
      const filteredData = data.filter((profile) => profile.id !== user?.id);
      setUserResults(filteredData);
    } catch (error) {
      console.error(`Error fetching users: ${error.message}`);
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
      {loading && <Loading />}
      {!loading && (
        <>
          {predictions.map((prediction) => (
            <Prediction key={prediction.id} {...prediction} />
          ))}
          {userResults.map((result) => (
            <SearchResult
              key={result.id}
              avatar={result.avatar}
              username={result.username}
              predictionScore={result.predictionScore}
              id={result.id}
            />
          ))}
          {predictions.length === 0 && userResults.length === 0 && (
            <p className="text-muted-foreground">No results found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
