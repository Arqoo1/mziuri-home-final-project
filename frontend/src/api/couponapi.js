import axios from 'axios';

export const validateCoupon = async (code) => {
  try {
    const response = await axios.post('http://localhost:5000/api/coupons/validate', {
      code,
    });

    return response.data; 
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || 'Error validating coupon';
    throw new Error(message);
  }
};
