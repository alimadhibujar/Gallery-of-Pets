import React from "react";
import "./categoryButtons.css";

const CategoryButtons = ({ fetchType, handleFilterChange }) => {
  const categories = [
    { name: "birds", label: "Birds" },
    { name: "cats", label: "Cats" },
    { name: "dogs", label: "Dogs" },
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
