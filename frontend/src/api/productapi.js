import axios from 'axios';
const API_URL = 'http://localhost:5000/api/products';

export const fetchProductData = async (sort) => {
  try {
    const response = await fetch(`${API_URL}?sort=${sort}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
};

export const fetchSingleProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching single product:', error);
    throw error;
  }
};

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const addToCart = async (userId, productId, quantity = 1) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `http://localhost:5000/api/products/add-to-cart`,
    { userId, productId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data; // Make sure to return the response data here
};

export const removeFromCart = async (userId, productId) => {
  return axios.post(`http://localhost:5000/api/products/remove-from-cart`, {
    userId,
    productId,
  });
};

// WISHLIST APIs
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
