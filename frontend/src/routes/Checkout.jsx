import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import RouteBanner from '../components/RouteBanner';
import InputGroup from '../components/InputGroup';
import { useCurrency } from '../Context/CurrencyContext';

function Checkout() {
  const { state } = useLocation();
  const {
    cart = [],
    subtotal = 0,
    discount = 0,
    total = 0,
    appliedCoupon = null,
  } = state || {};
  
  const [selectedMethod, setSelectedMethod] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);

  const { convert, symbol } = useCurrency();

  return (
    <>
      <RouteBanner page="Checkout" />

      <section className="checkout-container">
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

          <section className="checkout-summary">
            <p className="checkout-title">Your Order</p>

            <div className="order-table">
              <div className="table-header">
                <span>Product</span>
                <span>Total</span>
              </div>

              {cart.map((item, index) => (
                <div className="table-row" key={index}>
                  <span>
                    {(typeof item.title === 'object' ? item.title.en : item.title) ||
                      'Unnamed'}{' '}
                    <strong>×{item.quantity}</strong>
                  </span>
                  <span>
                    {symbol}
                    {convert(item.price * item.quantity)}
                  </span>
                </div>
              ))}

              <div className="table-row">
                <strong>Cart Subtotal</strong>
                <span>
                  {symbol}
                  {convert(subtotal)}
                </span>
              </div>

              {discount > 0 && (
                <div className="table-row">
                  <span>
                    Discount{appliedCoupon?.code ? ` (${appliedCoupon.code})` : ''}
                  </span>{' '}
                  <span>
                    -{symbol}
                    {convert(discount)}
                  </span>
                </div>
              )}

              <div className="table-row total-row">
                <strong>Total</strong>
                <strong>
                  {symbol}
                  {convert(total)}
                </strong>
              </div>
            </div>

            <div className="payment-methods">
              <div>
                <p
                  onClick={() =>
                    setSelectedMethod(selectedMethod === 'bank' ? '' : 'bank')
                  }
                  className="clickable-method"
                >
                  Direct Bank Transfer
                </p>
                <div
                  className={`methodscontainer ${
                    selectedMethod === 'bank' ? 'show' : ''
                  }`}
                >
                  {selectedMethod === 'bank' && (
                    <>
                      Make your payment directly into our bank account. Please use your
                      Order ID as the payment reference. Your order won’t be shipped until
                      the funds have cleared in our account.
                    </>
                  )}
                </div>
              </div>

              <div>
                <p
                  onClick={() =>
                    setSelectedMethod(selectedMethod === 'cheque' ? '' : 'cheque')
                  }
                  className="clickable-method"
                >
                  Cheque Payment
                </p>
                <div
                  className={`methodscontainer ${
                    selectedMethod === 'cheque' ? 'show' : ''
                  }`}
                >
                  {selectedMethod === 'cheque' && (
                    <>
                      Please send your cheque to Store Name, Store Street, Store Town,
                      Store State / County, Store Postcode.
                    </>
                  )}
                </div>
              </div>

              <div>
                <p
                  onClick={() =>
                    setSelectedMethod(selectedMethod === 'paypal' ? '' : 'paypal')
                  }
                  className="clickable-method"
                >
                  PayPal
                </p>
                <div
                  className={`methodscontainer ${
                    selectedMethod === 'paypal' ? 'show' : ''
                  }`}
                >
                  {selectedMethod === 'paypal' && (
                    <>
                      Pay via PayPal; you can pay with your credit card if you don’t have a
                      PayPal account.
                    </>
                  )}
                </div>
              </div>

              <button type="submit" className="checkout-button">
                Place Order
              </button>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}

export default Checkout;
