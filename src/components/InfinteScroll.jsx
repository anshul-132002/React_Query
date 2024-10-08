import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const fetchFruits = ({ pageParam }) => {
  return axios.get(`http://localhost:4000/fruits/?_limit=10&_page=${pageParam}`);
};

function InfiniteScroll() {
  const { data, isError, isLoading, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["infinite"],
    queryFn: fetchFruits,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      if (allPages.length < 6) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetchingNextPage]);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading .....</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center py-4">
      <div className="mb-4 w-full max-w-md">
        {data?.pages?.map((page) => {
          return page?.data.map((fruit) => {
            return (
              <div key={fruit.id} className="bg-white shadow-md rounded-md p-4 mb-2 text-center text-gray-700">
                {fruit.name}
              </div>
            );
          });
        })}
        <div ref={ref}></div>
        {isFetchingNextPage && <div className="text-center text-gray-500">Loading more...</div>}
      </div>
    </div>
  );
}

export default InfiniteScroll;
