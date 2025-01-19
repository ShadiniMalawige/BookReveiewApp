import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <main className="relative">
        <div
          className="bg-cover bg-center h-[88vh] flex items-center justify-center "
          style={{ backgroundImage: 'url("home-bg.jpg")' }}
        >
          <div className="fixed inset-0 bg-black/70 transition-opacity" />
          <div className="text-center z-10 ">
            <h1 className="text-5xl font-bold text-white font-outfit ">
              Rate and Review Books You Love
            </h1>
            <p className="text-lg mt-2 mb-6 text-gray-400 font-outfit">
              Help others find great books by sharing your ratings and reviews
            </p>
            <Link
              className="bg-black hover:bg-blue-900 font-outfit text-white font-regular mt-12 py-2 px-4 rounded-full"
              to="/reviews"
            >
              Add Your Review Now!
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
