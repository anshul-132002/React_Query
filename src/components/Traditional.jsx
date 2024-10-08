import axios from "axios";
import React, { useEffect, useState } from "react";

function Traditional() {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPost = async () => {
    try {
      const response = await axios.get("http://localhost:4000/posts");
      setPost(response.data);
    } catch (error) {
      console.log(error);
      setIsError(true); // Set error state if the fetch fails
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or error
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (isLoading) {
    return <div>Loading .....</div>;
  }

  if (isError) {
    return <div>Error fetching posts.</div>; // Display a simple error message
  }

  return (
    <div className="p-4 space-y-4">
      {post.map((post) => (
        <div key={post.id} className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-2">ID: {post.id}</p>
          <p className="text-gray-700">{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default Traditional;
