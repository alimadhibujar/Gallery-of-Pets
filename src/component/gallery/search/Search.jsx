import React from "react";
import "./search.css";

const Search = ({
  handleSearch,
  searchInput,
  handleInputChange,
  inputValue,
  clearInput,
}) => {
  return (
    <form onSubmit={handleSearch} className="search-input-container">
      <i className="fas fa-search search-icon"></i>
      <input
        className="search-input"
        type="text"
        placeholder="Type a name to search...."
        ref={searchInput}
        value={inputValue}
        onChange={handleInputChange}
      />

      {inputValue.length !== 0 && (
        <i className="fas fa-times close-icon" onClick={clearInput}></i>
      )}
    </form>
  );
};

export default Search;
