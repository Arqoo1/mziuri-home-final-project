import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    user: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true }, 
    createdAt: { type: Date, default: Date.now }
  });
  
const Review = mongoose.model('Products-review', reviewSchema);
export default Review;
