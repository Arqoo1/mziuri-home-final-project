import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
  en: String,
  ka: String,
});

const productSchema = new mongoose.Schema({
  title: translationSchema,
  price: Number,
  salePrice: Number,
  rating: Number,
  image: String,
  description: translationSchema,
  category: translationSchema,
  tags: Array,
  stock: Boolean,

});

export default mongoose.model("Product", productSchema);
