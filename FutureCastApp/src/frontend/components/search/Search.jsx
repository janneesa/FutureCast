import Card from "../Card";
import SearchResult from "./SearchResult";

import { useEffect, useState } from "react";

import { mockData } from "../../data/MockData";

function Search() {
  const [searchWord, setSearchWord] = useState("");
  const [results, setResults] = useState([]);

  const handlePasswordChange = (e) => {
    setSearchWord(e.target.value);
  };

  const fetchResults = () => {
    // Fetch results
    const searchResults = mockData.users.filter((user) =>
      user.username.includes(searchWord)
    );
    setResults(searchResults);
  };

  useEffect(() => {
    fetchResults();
  }, [searchWord]);

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <Card>
        <div className="card-header">
          <h3>Search users</h3>
          <p>Type username to search other users</p>
        </div>
        <div className="card-content">
          <input
            id="search"
            type="text"
            placeholder="username"
            className="p-1 border border-gray-300 rounded w-full"
            required
            value={searchWord}
            onChange={handlePasswordChange}
          />
        </div>
      </Card>

      {results.map((result) => (
        <SearchResult
          key={result.id}
          avatar={result.avatar}
          username={result.username}
        />
      ))}
    </div>
  );
}
export default Search;
