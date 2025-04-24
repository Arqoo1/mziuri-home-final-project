import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  console.log('Request received to get products');
  try {
    const products = await Product.find(); 

    if (!products || products.length === 0) {
      console.log('No products found or error fetching data');
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products); 
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};