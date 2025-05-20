import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
  en: String,
  ka: String,
});

const productSchema = new mongoose.Schema({
  title: translationSchema,
  price: Number,
  rating: Number,
  image: String,
  description: translationSchema,
});

export default mongoose.model("Product", productSchema);
