import Review from "../models/review.model.js";

//create new review
export const createReview = async (req, res) => {
  try {
    const { bookTitle, author, rating, reviewText } = req.body;

    const newReview = new Review({
      bookTitle,
      author,
      rating,
      reviewText,
    });

    await newReview.save();
    res.status(201).json({ message: "Review created successfully", newReview });
  } catch (error) {
    res.status(500).json({ message: "Failed to create review", error });
  }
};

export const getReview = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reviews", error });
  }
};

export const updateReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookTitle, author, rating, reviewText } = req.body;

    if (!id || !bookTitle || !author || !rating || !reviewText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updateReview = await Review.findByIdAndUpdate(
      id,
      {
        bookTitle,
        author,
        rating,
        reviewText,
      },
      { new: true, runValidators: true } // Ensure validation is run during update
    );

    if (!updateReview) {
      console.log("Error: Review not found"); // Log not found error
      return res.status(404).json({ message: "Review not found" });
    }

    // Return the updated review
    res.json(updateReview);
  } catch (error) {
    console.error("Error updating review:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message }); // Provide error message for debugging
  }
};

export const deleteReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteReviews = await Review.findByIdAndDelete(id);

    if (!deleteReviews) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
