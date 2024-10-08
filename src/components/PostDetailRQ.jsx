import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function PostDetailRQ() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const fetchPost = (postId) => {
    return axios.get(`http://localhost:4000/posts/${postId}`);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    enabled: !!postId, // Query only runs if postId exists
  });

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading .....</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  const { title, body } = data?.data || {};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-600 text-lg">{body}</p>
    </div>
  );
}

export default PostDetailRQ;
