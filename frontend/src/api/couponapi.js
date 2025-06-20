export const validateCoupon = async (code) => {
  try {
    const response = await fetch('http://localhost:5000/api/coupons/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Invalid coupon');

    return data; // Contains: code, type, value, description
  } catch (error) {
    throw new Error(error.message || 'Error validating coupon');
  }
};
