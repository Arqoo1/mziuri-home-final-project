import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import RouteBanner from '../components/RouteBanner';
import InputGroup from '../components/InputGroup';
import CouponInput from '../components/CouponBox';

function Checkout() {
  const { state } = useLocation();
  const {
    cart = [],
    subtotal = 0,
    discount = 0,
    total = 0,
    appliedCoupon = null,
  } = state || {};

  const [showCouponInput, setShowCouponInput] = useState(false);

  return (
    <>
      <RouteBanner page="Checkout" />

      <section className="checkout-container">
        <div className="returning-customer">
          Returning customer? <Link to="/login">Click here to login</Link>
        </div>

        <div
          className="coupon-toggle"
          onClick={() => setShowCouponInput((prev) => !prev)}
        >
          Have a coupon? Click here to enter your code
        </div>

        {showCouponInput && (
          <CouponInput
            onApply={() => {
              alert('Coupon re-entry not supported here.');
            }}
          />
        )}

        <section className="checkout">
          <form className="checkout-form">
            {/* Form fields remain unchanged */}
            <InputGroup label="Country *" name="country">
              <select id="country" name="country" required>
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ge">Georgia</option>
              </select>
            </InputGroup>

            <InputGroup label="Company Name" name="company">
              <input type="text" id="company" name="company" />
            </InputGroup>

            <div className="half-inputs">
              <InputGroup label="First Name" name="FirstName">
                <input type="text" id="FirstName" name="FirstName" />
              </InputGroup>
              <InputGroup label="Last Name" name="LastName">
                <input type="text" id="LastName" name="LastName" />
              </InputGroup>
            </div>

            <InputGroup label="Address *" name="address">
              <input type="text" id="address" name="address" required />
            </InputGroup>

            <InputGroup label="Town / City *" name="city">
              <input type="text" id="city" name="city" required />
            </InputGroup>

            <div className="half-inputs">
              <InputGroup label="State / Country *" name="state">
                <input type="text" id="state" name="state" required />
              </InputGroup>
              <InputGroup label="Postcode / Zip *" name="postcode">
                <input type="text" id="postcode" name="postcode" required />
              </InputGroup>
            </div>

            <div className="half-inputs">
              <InputGroup label="Email Address *" name="email">
                <input type="email" id="email" name="email" required />
              </InputGroup>
              <InputGroup label="Phone *" name="phone">
                <input type="tel" id="phone" name="phone" required />
              </InputGroup>
            </div>

            <div className="form-group checkbox">
              <input type="checkbox" id="createAccount" />
              <label htmlFor="createAccount">Create an account?</label>
            </div>

            <div className="form-group checkbox">
              <input type="checkbox" id="shipToDifferent" />
              <label htmlFor="shipToDifferent">Ship to a different address?</label>
            </div>

            <InputGroup label="Order Notes" name="notes">
              <textarea
                id="notes"
                name="notes"
                placeholder="Notes about your order, e.g. special notes for delivery."
                rows="4"
              />
            </InputGroup>
          </form>

          {/* ✅ REAL ORDER SUMMARY */}
          <section className="checkout-summary">
            <p className="checkout-title">Your Order</p>

            {cart.map((item, index) => (
              <div className="order-item" key={index}>
                <span className="item-name">
                  {(typeof item.title === 'object' ? item.title.en : item.title) || 'Unnamed'} x {item.quantity}
                </span>
                <span className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="summary-row">
                <span>Discount{appliedCoupon ? ` (${appliedCoupon})` : ''}:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="order-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button type="submit" className="checkout-button">
              Place Order
            </button>
          </section>
        </section>
      </section>
    </>
  );
}

export default Checkout;
