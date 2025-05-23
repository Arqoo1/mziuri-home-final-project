import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/cart-items';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCartItems = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error getting cart items:', error);
    throw new Error('Failed to get cart items');
  }
};

export const addToCart = async (item) => {
  try {
    const response = await axios.post(BASE_URL, item, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error('Failed to add item to cart');
  }
};

export const deleteCartItem = async (cartItemId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${cartItemId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw new Error('Failed to delete item');
  }
};

export const editCartItem = async (cartItemId, updatedItem) => {
  try {
    const response = await axios.put(`${BASE_URL}/${cartItemId}`, updatedItem, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error editing cart item:', error);
    throw new Error('Failed to update item');
  }
};
