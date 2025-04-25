import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { sort } = req.query;
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

    const products = await Product.aggregate(sortOption);

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res
      .status(500)
      .json({ message: "Error fetching product", error: err.message });
  }
};
