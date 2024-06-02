import React from "react";
import "./categoryButtons.css";

const CategoryButtons = ({ fetchType, handleFilterChange }) => {
  const categories = [
    { name: "dogs", label: "Dogs" },
    { name: "cats", label: "Cats" },
    { name: "birds", label: "Birds" },
  ];

  // Map through the categories array to create a button for each category
  const userSelectionCategory = categories.map((category) => (
    <button
      className={`category-button ${
        fetchType === category.name ? "active" : ""
      }`}
      key={category.name}
      onClick={() => handleFilterChange(category.name)}
    >
      {category.label}
    </button>
  ));

  return <div className="category">{userSelectionCategory}</div>;
};

export default CategoryButtons;
