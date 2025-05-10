import express from "express";
import { getAllClientReviews } from "../controllers/reviewController.js";

const ReviewRouter = express.Router();

ReviewRouter.get("/client", getAllClientReviews);

export default ReviewRouter;
