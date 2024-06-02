import React from "react";
import "./pagination.css";

const Pagination = ({ handlePageChange, currentPage, totalPages }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="pagination-button"
        disabled={currentPage === 1}
      >
        <i className="fa-solid fa-angle-left"></i>
        Prev
      </button>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="pagination-button"
        disabled={currentPage === totalPages}
      >
        Next<i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
