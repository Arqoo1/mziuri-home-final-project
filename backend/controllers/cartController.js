import CartItem from "../models/CartItem.js";
import mongoose from "mongoose";

export const getCartItems = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const cartItems = await CartItem.find({ userId });

    if (!cartItems.length) {
      return res.status(404).json({ message: "No cart items found" });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch cart items", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { title, price, quantity, image } = req.body;
    const userId = req.user._id || req.user.id;

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!title || !price || !quantity || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new CartItem({
      userId,
      title,
      price,
      quantity,
      image,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { cartItemId } = req.params;

    const deletedItem = await CartItem.findOneAndDelete({
      _id: cartItemId,
      userId: userId,
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    console.log(`Product deleted: ${deletedItem.title}`);
    res.status(200).json({ message: "Item deleted from cart", deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete item from cart" });
  }
};

export const editCartItem = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    if (
      quantity === undefined ||
      typeof quantity !== "number" ||
      quantity <= 0
    ) {
      return res.status(400).json({ message: "Valid quantity is required" });
    }

    const updatedItem = await CartItem.findOneAndUpdate(
      { _id: cartItemId, userId: userId },
      { quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Failed to update cart item" });
  }
};
