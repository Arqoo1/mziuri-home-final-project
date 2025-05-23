import express from "express";
import {
  getCartItems,
  addToCart,
  deleteCartItem,
  editCartItem,
} from "../controllers/cartController.js";
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.get("/", authMiddleware, getCartItems);

router.post("/", authMiddleware, addToCart);

router.delete("/:cartItemId", authMiddleware, deleteCartItem);
router.put("/:cartItemId", authMiddleware, editCartItem);

export default router;
