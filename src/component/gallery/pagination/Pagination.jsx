import React from "react";
import "./pagination.css";

const Pagination = ({
  handlePageChange,
  currentPage,
  totalPages,
  isLoading,
}) => {
  const maxButtons = 8; // Maximum number of buttons to display
  const halfMaxButtons = Math.floor(maxButtons / 2);
  const startPage = Math.max(currentPage - halfMaxButtons, 1);
  const endPage = Math.min(startPage + maxButtons - 1, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const buttonPageNumbers = pageNumbers.map((number) => (
    <li key={number}>
      <button
        className={`pagination-button ${
          currentPage === number ? "active" : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(number);
        }}
        disabled={isLoading}
      >
        {number}
      </button>
    </li>
  ));

  return (
    <nav className="pagination" aria-label="Pagination">
      <ul>
        <li>
          <button
            onClick={() => handlePageChange(1)}
            className="pagination-button"
            disabled={currentPage === 1 || isLoading}
          >
            <i className="fa-solid fa-angle-double-left"></i>
          </button>
        </li>
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination-button"
            disabled={currentPage === 1 || isLoading}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </li>

        {startPage > 1 && (
          <li>
            <span>...</span>
          </li>
        )}
        {buttonPageNumbers}
        {endPage < totalPages && (
          <li>
            <span>...</span>
          </li>
        )}

        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination-button"
            disabled={currentPage === totalPages || isLoading}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </li>
        <li>
          <button
            onClick={() => handlePageChange(totalPages)}
            className="pagination-button"
            disabled={currentPage === totalPages || isLoading}
          >
            <i className="fa-solid fa-angle-double-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
