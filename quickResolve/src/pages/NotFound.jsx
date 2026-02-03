import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>
      <p className="text-gray-500 mt-2">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 !text-white rounded hover:bg-blue-700 "
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
