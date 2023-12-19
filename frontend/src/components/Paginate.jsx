// Pagination.js
import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({
  currentPage,
  totalPages,
  isAdmin = false,
  keyword = "",
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav className="flex justify-center my-4">
      <ul className="pagination flex">
        {pageNumbers.map((pageNumber) => (
          <Link
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${pageNumber}`
                  : `/page/${pageNumber}`
                : `/admin/productlist/${pageNumber}`
            }
            key={pageNumber}
            className={`mx-1 ${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-200"
            } cursor-pointer rounded-full py-2 px-4`}
          >
            {pageNumber}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
