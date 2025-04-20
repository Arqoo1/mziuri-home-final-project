import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { title, min, max } = req.query;

    const filters = {};
    if (title) {
      filters.title = { $regex: title, $options: "i" }; 
    }
    if (min || max) {
      filters.price = {};
      if (min) filters.price.$gte = min;
      if (max) filters.price.$lte = max;
    }

    const products = await Product.find(filters); 
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
