import React from "react";

export const SearchEngine = ({ query, setQuery, search }) => {
 
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search(event);
    }
  };

  return (
    <div className="SearchEngine">
      <input
        type="text"
        className="city-search"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={search}>
        <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
      </button>
    </div>
  );
};
