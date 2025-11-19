import React from "react";
import { FaBan } from "react-icons/fa";
import { Link } from "react-router";


const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        <FaBan className="text-red-500 text-5xl mx-auto mb-4" />

        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Oops!
        </h1>

        <p className="text-lg text-secondary mb-6">
          Only <span className="font-semibold">admin</span> can access this page.
        </p>

        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-primary text-black font-semibold hover:bg-green-300 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;