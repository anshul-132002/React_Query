import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
//! GET Method
const fetchPost = () => {
  return axios.get("http://localhost:4000/posts");
};

//! POST Method
const PostPost = (post) => {
  return axios.post("http://localhost:4000/posts", post);
};

function PostRQ() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
  });

  const { mutate } = useMutation({
    mutationFn: PostPost,
    onMutate: async (newpost) => {
      await queryclient.cancelQueries(["posts"]);
      const previousPosts = queryclient.getQueryData(["posts"]);
      queryclient.setQueryData(["posts"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { ...newpost, id: String(oldQueryData?.data?.length + 1) },
          ],
        };
      });
      return {
        previousPosts,
      };
    },
    onSettled:()=> {
      queryclient.invalidateQueries(["posts"])
    },
    onError: (_error, _post, context) => {
      queryclient.setQueryData(["posts"], context.previousPosts);
    },
  });

  const queryclient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, body };
    mutate(post);
    setTitle("");
    setBody("");
  };

  if (isLoading) {
    return <div>Loading .....</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Post</h2>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          placeholder="Enter the Title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* Body Input */}
        <textarea
          value={body}
          placeholder="Enter the Body"
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          rows="4"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Add Post
        </button>
      </form>

      {/* Display Posts */}
      {data?.data.map((post) => (
        <div
          key={post.id}
          className="p-4 border rounded-lg shadow-md bg-white mb-4"
        >
          <Link to={`/rq/${post.id}`}>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-2">ID: {post.id}</p>
            <p className="text-gray-700">{post.body}</p>
          </Link>
        </div>
      ))}

      {/* Refetch Button */}
      <button
        className="w-full bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all"
        onClick={refetch}
      >
        Refresh Posts
      </button>
    </div>
  );
}

export default PostRQ;
