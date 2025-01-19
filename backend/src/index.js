import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import reviewRouter from "./routes/review.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/reviews", reviewRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log("Server is running on port 4000...");
    });
  })
  .catch((error) => console.log(error));
