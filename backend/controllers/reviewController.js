import ClientReview from '../models/ClientReview.js';

export const getAllClientReviews = async (req, res) => {
  try {
    console.log("Fetching reviews...");  // Check if the function is triggered
    const reviews = await ClientReview.find();
    console.log("Reviews fetched from DB:", reviews);  // Log the actual result of the query
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);  // Log error details
    res.status(500).json({ message: "Failed to fetch client reviews." });
  }
};


