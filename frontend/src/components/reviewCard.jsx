import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";

const ReviewCard = ({ review, onClick }) => {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-full cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      onClick={onClick}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {review?.bookTitle}
      </h2>
      <p className="text-gray-600 mb-4">{review?.author}</p>
      <div className="flex mb-4">
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={index}
            className={`h-5 w-5 ${
              index < review?.rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700">{review?.reviewText}</p>
    </div>
  );
};

export default ReviewCard;
