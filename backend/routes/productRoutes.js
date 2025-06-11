import express from "express";
import {
  getProducts,
  getProductById,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  addToCart,
} from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/add-to-cart", authMiddleware, addToCart);
router.post("/add-to-wishlist", authMiddleware, addToWishlist);

router.delete("/remove-from-cart", authMiddleware, removeFromCart);
router.delete("/remove-from-wishlist", authMiddleware, removeFromWishlist);

export default router;
