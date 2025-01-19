import ButtonComponent from "./button";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ReviewForm({
  state,
  setState,
  mode,
  onSubmit,
  submitLoading,
  onClose,
}) {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteReview = useCallback(async () => {
    if (!state?._id) {
      toast.error("Review ID not found. Unable to delete.");
      return;
    }

    try {
      setDeleteLoading(true);
      const response = await axios.delete(
        `http://localhost:4000/reviews/delete/${state._id}`
      );

      toast.success(response?.data?.message || "Review deleted successfully!");
      setState({});
      onClose();
    } catch (error) {
      toast.error("Failed to delete review.");
    } finally {
      setDeleteLoading(false);
    }
  }, [onClose, setState, state._id]);

  if ((mode === "edit") & !state) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        {mode === "edit" ? "Edit" : "Create"} Book Review
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Book Title
        </label>
        <input
          type="text"
          placeholder="Harry Potter"
          value={state?.bookTitle}
          onChange={(e) => setState({ ...state, bookTitle: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Author
        </label>
        <input
          type="text"
          placeholder="J.K. Rowling"
          value={state?.author}
          onChange={(e) => setState({ ...state, author: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Rating for the Book
        </label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((index) => (
            <svg
              key={index}
              onClick={(e) => setState({ ...state, rating: index })}
              xmlns="http://www.w3.org/2000/svg"
              fill={index <= state?.rating ? "orange" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6 cursor-pointer text-gray-400 hover:fill-orange-300 hover:text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.974 2.892a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.974-2.892a1 1 0 00-1.176 0l-3.974 2.892c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.101c-.783-.57-.381-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z"
              />
            </svg>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Review
        </label>
        <textarea
          placeholder="Add a review"
          value={state?.reviewText}
          onChange={(e) => setState({ ...state, reviewText: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <div className="flex gap-2 py-2">
        {mode === "edit" && (
          <ButtonComponent
            title="Delete Review"
            className="bg-red-500 hover:bg-red-400"
            onClick={deleteReview}
            loading={deleteLoading}

            // onClick={} mekata pass krnna uda hdna function eka
          />
        )}
        <ButtonComponent
          title={`${mode === "edit" ? "Edit" : "Submit"} "Review"`}
          onClick={onSubmit}
          loading={submitLoading}
        />
      </div>
    </div>
  );
}
