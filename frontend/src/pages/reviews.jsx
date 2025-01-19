import ReviewCard from "../components/reviewCard";
import React, { useCallback, useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ReviewForm from "../components/reviewForm";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [state, setState] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterRating, setFilterRating] = useState(0);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setState({});
    setIsOpen(false);
  }

  const successToast = useCallback((message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);

  const errorToast = useCallback((message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);

  // Fetch reviews from backend
  const fetchReviews = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:4000/reviews/get");
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      errorToast("Failed to load reviews.");
    }
  }, [errorToast]);

  const handleFilterChange = useCallback(() => {
    let filtered = reviews;

    if (filterTitle.trim()) {
      filtered = filtered.filter((review) =>
        review.bookTitle.toLowerCase().includes(filterTitle.toLowerCase())
      );
    }

    if (filterRating > 0) {
      filtered = filtered.filter((review) => review.rating === filterRating);
    }

    setFilteredReviews(filtered);
  }, [filterTitle, filterRating, reviews]);

  useEffect(() => {
    handleFilterChange();
  }, [filterTitle, filterRating, reviews, handleFilterChange]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    try {
      setSubmitLoading(true);
      // Check for valid inputs
      if (
        state?.bookTitle?.trim() === "" ||
        state?.author?.trim() === "" ||
        state?.reviewText?.trim() === "" ||
        state?.rating === 0
      ) {
        alert("Please fill out all fields and select a rating.");
        return;
      }

      const res = await axios.post("http://localhost:4000/reviews/add", {
        ...state,
      });

      successToast(res?.data?.message || "Review Added Successfully!");
      close();
      setState({});
      fetchReviews();
    } catch (error) {
      errorToast("Failed to submit review.");
    } finally {
      setSubmitLoading(false);
    }
  }, [errorToast, fetchReviews, state, successToast]);

  const handleEdit = useCallback(async () => {
    try {
      setSubmitLoading(true);
      // Check for valid inputs
      if (
        state?.bookTitle?.trim() === "" ||
        state?.author?.trim() === "" ||
        state?.reviewText?.trim() === "" ||
        state?.rating === 0
      ) {
        alert("Please fill out all fields and select a rating.");
        return;
      }

      const res = await axios.put(
        `http://localhost:4000/reviews/update/${state?._id}`,
        {
          ...state,
        }
      );

      successToast(res?.data?.message || "Review Updated Successfully!");
      setIsOpenEdit(false);
      setState({});
      fetchReviews();
    } catch (error) {
      errorToast("Failed to update review.");
    } finally {
      setSubmitLoading(false);
    }
  }, [errorToast, fetchReviews, state, successToast]);

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <div className="relative min-h-screen bg-white py-12 px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center flex-grow">
              Book Reviews
            </h1>
            <button
              className="ml-auto px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={open}
            >
              Add Review
            </button>
          </div>

          {/* Filter Options */}
          <div className="flex items-center gap-4 mb-8">
            <input
              type="text"
              placeholder="Filter by Book Title"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-1/2"
            />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(Number(e.target.value))}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={0}>Filter by Rating</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Star{rating > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                onClick={() => {
                  setIsOpenEdit(true);
                  setState(review);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 bg-black/50 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-white/100 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <ReviewForm
                setState={setState}
                state={state}
                onSubmit={handleSubmit}
                submitLoading={submitLoading}
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={isOpenEdit}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsOpenEdit(false)}
      >
        <div className="fixed inset-0 bg-black/50 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-white/100 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <ReviewForm
                setState={setState}
                state={state}
                onSubmit={handleEdit}
                mode="edit"
                submitLoading={submitLoading}
                onClose={() => {
                  fetchReviews();
                  setIsOpenEdit(false);
                }}
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default Reviews;
