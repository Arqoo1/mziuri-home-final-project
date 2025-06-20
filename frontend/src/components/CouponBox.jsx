import React, { useState } from 'react';

function CouponBox({ onApply }) {
  const [couponCode, setCouponCode] = useState('');

  const handleApply = () => {
    if (!couponCode) {
      alert('Please enter a coupon code');
      return;
    }
    onApply(couponCode);
  };

  return (
    <div className="coupon-input-container">
      <input
        type="text"
        placeholder="Enter your coupon code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <button type="button" onClick={handleApply}>
        Apply Coupon
      </button>
    </div>
  );
}

export default CouponBox;
