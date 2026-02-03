import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);

  // If user is logged in → send to dashboard
  // if (authStatus) {
  //   return <Navigate to="/dashboard" />;
  // }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      
      {/* Hero Section */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        QuickResolve
      </h1>

      <p className="text-lg text-gray-600 text-center max-w-xl mb-6">
        A role-based ticket management system where users can raise and track
        support tickets and admins can manage and resolve them efficiently.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-2 rounded-lg bg-blue-600 !text-white hover:bg-blue-700 transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="px-6 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
        >
          Register
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl w-full">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="font-semibold text-gray-800 mb-2">Create Tickets</h3>
          <p className="text-sm text-gray-600">
            Raise support tickets with priority and detailed descriptions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="font-semibold text-gray-800 mb-2">Track Status</h3>
          <p className="text-sm text-gray-600">
            Monitor ticket progress and reply to admin responses.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="font-semibold text-gray-800 mb-2">Admin Control</h3>
          <p className="text-sm text-gray-600">
            Admins manage, respond, and resolve tickets efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
