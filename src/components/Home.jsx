import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="bg-blue-500 p-4 text-white">
        <nav className="flex space-x-4">
          {/* Corrected the 'Home' link to point to the root path */}
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/trad" className="hover:text-blue-200">Traditional Method</Link>
          <Link to="/rq" className="hover:text-blue-200">React Query</Link>
          <Link to="/pag-fruits" className="hover:text-blue-200">Pagination</Link>
          <Link to="/infinite" className="hover:text-blue-200">Button scroll</Link>
          <Link to="/infinite-scroll" className="hover:text-blue-200">Infinite Scroll</Link>

        </nav>
      </div>
    </div>
  );
}

// Prof.jsx
export const Prof = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 font-Poppins">
        Learning React <span className="italic">TanStack Query</span>
      </h1>
    </div>
  );
};



export default Home;
