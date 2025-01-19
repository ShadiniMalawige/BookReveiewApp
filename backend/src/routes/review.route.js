import express from "express";

import {
  createReview,
  deleteReviews,
  getReview,
  updateReviews,
} from "../controller/review.controller.js";

const router = express.Router();

//GET a single review
router.get("/get", getReview);

//POST a new review
router.post("/add", createReview);

//DELETE a review
router.delete("/delete/:id", deleteReviews);

//UPDATE a review
router.put("/update/:id", updateReviews);

export default router;
