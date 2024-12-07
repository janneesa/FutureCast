import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import SearchResult from "./SearchResult";
import Loading from "../Loading";

const API_URL = "/api/users/search/";

function Search() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const searchWord = location.state?.searchWord || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchWord) {
      fetchUserProfiles();
    }
  }, [searchWord]);

  const fetchUserProfiles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}${searchWord}`);
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
      {!loading &&
        results.map((result) => (
          <SearchResult
            key={result.id}
            avatar={result.avatar}
            username={result.username}
            predictionScore={result.predictionScore}
            id={result.id}
          />
        ))}
      {!loading && results.length === 0 && (
        <p className="text-muted-foreground">No results found.</p>
      )}
    </div>
  );
}

export default Search;
