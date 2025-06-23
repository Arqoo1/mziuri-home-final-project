import axios from 'axios';
const API_URL = 'http://localhost:5000/api/products';

export const fetchProductData = async (sort = '') => {
  try {
    const response = await axios.get(`${API_URL}?sort=${sort}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
};

export const fetchSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single product:', error);
    throw new Error(error.response?.data?.message || 'Error fetching product');
  }
};

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// CART
export const addToCart = async (userId, productId, quantity = 1) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `http://localhost:5000/api/products/add-to-cart`,
    { userId, productId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data; 
};

export const removeFromCart = async (userId, productId) => {
  return axios.post(`http://localhost:5000/api/products/remove-from-cart`, {
    userId,
    productId,
  });
};

// WISHLIST 
export const addToWishlist = async (userId, productId, quantity = 1) => {
  return axios.post(`http://localhost:5000/api/products/add-to-wishlist`, {
    userId,
    productId,
    quantity,
  });
};

export const removeFromWishlist = async (userId, productId) => {
  return axios.post(`http://localhost:5000/api/products/remove-from-wishlist`, {
    userId,
    productId,
  });
};
