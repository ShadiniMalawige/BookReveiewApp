import React from "react";

export default function Button({ title, onClick, loading, className }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full flex items-center justify-center px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
        loading ? "cursor-not-allowed opacity-70" : ""
      } ${className ?? ""}`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 12h2zm2 5.291A7.963 7.963 0 014 12H2c0 3.042 1.135 5.824 3 7.938l1-1.647z"
          ></path>
        </svg>
      )}
      <span>{title}</span>
    </button>
  );
}
