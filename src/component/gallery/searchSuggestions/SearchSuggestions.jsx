import React from "react";
import "./searchSuggestions.css";

const SearchSuggestions = ({ suggestions, handleSuggestionClick }) => {
  return (
    <div
      className={`search-input suggestions ${
        suggestions.length > 0 ? "show" : ""
      }`}
    >
      {suggestions.slice(0, 5).map((suggestion) => (
        <li
          key={suggestion.id}
          onClick={() => handleSuggestionClick(suggestion.name)}
        >
          {suggestion.name}
        </li>
      ))}
    </div>
  );
};

export default SearchSuggestions;
