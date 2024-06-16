import React from "react";
import "./pagination.css";

const Pagination = ({ handlePageChange, currentPage, totalPages }) => {
  // creating a number for every page
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  /* rendering a button for every pageNumber */
  const buttonPageNumbers = pageNumbers.map((number) => (
    <li key={number}>
      <button
        className={`pagination-button ${
          currentPage === number ? "active" : ""
        }`}
        onClick={(e) => {
          // preventing from default behavior, submit the form or navigate to the URL
          e.preventDefault();
          handlePageChange(number);
        }}
      >
        {number}
      </button>
    </li>
  ));

  return (
    <nav className="pagination">
      <ul>
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination-button"
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-angle-left"></i>
            Prev
          </button>
        </li>

        {buttonPageNumbers}

        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination-button"
            disabled={currentPage === totalPages}
          >
            Next<i className="fa-solid fa-angle-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
