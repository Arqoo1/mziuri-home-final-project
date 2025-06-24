import Product from "../models/Product.js";
import User from "../models/users.js";
import { getCache, setCache } from "../utils/cache.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const { sort } = req.query;
    const cacheKey = `products_${sort || "default"}`;
    const cached = getCache(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    let sortOption = [];
    switch (sort) {
      case "price_asc":
        sortOption = [
          {
            $addFields: {
              effectivePrice: { $ifNull: ["$salePrice", "$price"] },
            },
          },
          { $sort: { effectivePrice: 1 } },
        ];
        break;
      case "price_desc":
        sortOption = [
          {
            $addFields: {
              effectivePrice: { $ifNull: ["$salePrice", "$price"] },
            },
          },
          { $sort: { effectivePrice: -1 } },
        ];
        break;
      case "alphabetical_asc":
        sortOption = [{ $sort: { title: 1 } }];
        break;
      case "alphabetical_desc":
        sortOption = [{ $sort: { title: -1 } }];
        break;
      case "rating_asc":
        sortOption = [{ $sort: { rating: 1 } }];
        break;
      case "rating_desc":
        sortOption = [{ $sort: { rating: -1 } }];
        break;
      default:
        sortOption = [];
    }

    const products =
      sortOption.length > 0
        ? await Product.aggregate(sortOption)
        : await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    setCache(cacheKey, products, 300); // Cache for 5 minutes
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};

export const getProductById = async (req, res) => {
  const id = req.params.id;
  const cacheKey = `product_${id}`;
  const cached = getCache(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    setCache(cacheKey, product, 300); // Cache for 5 minutes
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res
      .status(500)
      .json({ message: "Error fetching product", error: err.message });
  }
};

export const addToCart = async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Missing userId or productId" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ SAFELY compare productId using optional chaining
    const existingItem = user.cart.find(
      (item) => item.productId?.toString() === productId.toString()
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({
      message: "Error adding to cart",
      error: err.message,
    });
  }
};

// ✅ Remove from Cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Missing userId or productId" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    await user.save();
    res.status(200).json(user.cart);
  } catch (err) {
    console.error("Remove from cart error:", err);
    res.status(500).json({
      message: "Error removing from cart",
      error: err.message,
    });
  }
};

// ✅ Add to Wishlist
export const addToWishlist = async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Missing userId or productId" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingItem = user.wishlist.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.wishlist.push({ productId, quantity });
    }

    await user.save();
    res.status(200).json(user.wishlist);
  } catch (err) {
    console.error("Add to wishlist error:", err);
    res.status(500).json({
      message: "Error adding to wishlist",
      error: err.message,
    });
  }
};

// ✅ Remove from Wishlist
export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Missing userId or productId" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    await user.save();
    res.status(200).json(user.wishlist);
  } catch (err) {
    console.error("Remove from wishlist error:", err);
    res.status(500).json({
      message: "Error removing from wishlist",
      error: err.message,
    });
  }
};
