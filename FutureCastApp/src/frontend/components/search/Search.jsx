import Card from "../Card";
import SearchResult from "./SearchResult";

import { useEffect, useState } from "react";

import { mockData } from "../../data/MockData";

function Search({ user }) {
  const [searchWord, setSearchWord] = useState("");
  const [results, setResults] = useState([]);

  // DEMO to fetct all users
  const fetchAllUsers = () => {
    // Fetch all users
    const allUsers = mockData.users;
    // Remove current user from search results
    const currentUserIndex = allUsers.findIndex((u) => u.id === user.id);
    if (currentUserIndex > -1) {
      allUsers.splice(currentUserIndex, 1);
    }
    setResults(allUsers);
  };

  const handleSearchWordChange = (e) => {
    setSearchWord(e.target.value);
  };

  const fetchResults = () => {
    // Fetch results
    const searchResults = mockData.users.filter((u) =>
      u.username.toLowerCase().includes(searchWord.toLowerCase())
    );
    setResults(searchResults);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <Card>
        <div className="card-header">
          <h3>Search users</h3>
          <p>Type username to search other users</p>
        </div>
        <div className="card-content flex">
          <input
            id="search"
            type="text"
            placeholder="username"
            className="p-1 border border-gray-300 rounded w-full mr-4"
            required
            value={searchWord}
            onChange={handleSearchWordChange}
          />
          <div className="self-center ml-auto">
            <button
              className="button button-secondary ml-auto"
              onClick={fetchResults}
            >
              Search
            </button>
          </div>
        </div>
      </Card>

      {results.map((result) => (
        <SearchResult
          key={result.id}
          avatar={result.avatar}
          username={result.username}
          predictionScore={result.predictionScore}
          id={result.id}
          user={user}
        />
      ))}
    </div>
  );
}
export default Search;
