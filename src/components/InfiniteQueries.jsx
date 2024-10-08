import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchFruite = ({ pageParam }) => {
  return axios.get(`http://localhost:4000/fruits/?_limit=4&_page=${pageParam}`);
};

function InfiniteQueries() {
  const { data, isError, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["infinite"],
      queryFn: fetchFruite,
      initialPageParam:1,
      getNextPageParam: (_lastpage, allpages) => {
        if (allpages.length < 5) {
          return allpages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading .....</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="flex flex-col items-center py-4">
      <div className="mb-4 w-full max-w-md">
        {data?.pages?.map((page) => {
          return page?.data.map((fruit) => {
            return (
              <div
                key={fruit.id}
                className="bg-white shadow-md rounded-md p-4 mb-2 text-center text-gray-700"
              >
                {fruit.name}
              </div>
            );
          });
        })}
      </div>
      <button
        onClick={fetchNextPage}
        disabled={!hasNextPage}
        className={`px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition ${
            !hasNextPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        {" "}
        Add more ..
      </button>
    </div>
  );
}

export default InfiniteQueries;
