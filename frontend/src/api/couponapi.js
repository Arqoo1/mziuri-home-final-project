import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const API_BASE_URL = 'http://localhost:5000';

export const validateCoupon = async (code) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/coupons/validate`, {
      code,
    });

    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || error.message || 'Error validating coupon';
    throw new Error(message);
  }
};
