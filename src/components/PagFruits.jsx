import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const fetchFruits = (pageId) => {
  return axios.get(`http://localhost:4000/fruits/?_limit=4
    &_page=${pageId}`);
};

function PagFruits() {
  const [page, setPage] = useState(1);
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["fruits", page], // Including page in the query key to refetch on page change
    queryFn: () => fetchFruits(page),
  });

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading .....</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="text-center">
      {/* List of Fruits */}
      <div className="mb-4">
        {data?.data.map((fruit) => (
          <div key={fruit.id}>
            <b>{fruit.name}</b>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={page === 1}
          className={`text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={page === 5}
          className={`text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-green-800 ${
            page >4 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PagFruits;
