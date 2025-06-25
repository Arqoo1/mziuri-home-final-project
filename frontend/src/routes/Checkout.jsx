import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import RouteBanner from '../components/RouteBanner';
import InputGroup from '../components/InputGroup';
import { useCurrency } from '../Context/CurrencyContext';
import { useTranslation } from 'react-i18next';

function Checkout() {
  const { state } = useLocation();
  const { cart = [], subtotal = 0, discount = 0, total = 0, appliedCoupon = null } = state || {};

  const [selectedMethod, setSelectedMethod] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);

  const { convert, symbol } = useCurrency();
  const { t, i18n } = useTranslation();

  return (
    <>
      <RouteBanner page={t('checkout')} />

      <section className="checkout-container">
        <section className="checkout">
          <form className="checkout-form">
            <InputGroup
              label={t('country') + ' *'}
              name="country"
            >
              <select
                id="country"
                name="country"
                required
              >
                <option value="">{t('selectCountry')}</option>
                <option value="us">{t('unitedStates')}</option>
                <option value="uk">{t('unitedKingdom')}</option>
                <option value="ge">{t('georgia')}</option>
              </select>
            </InputGroup>

            <InputGroup
              label={t('companyName')}
              name="company"
            >
              <input
                type="text"
                id="company"
                name="company"
              />
            </InputGroup>

            <div className="half-inputs">
              <InputGroup
                label={t('firstName')}
                name="FirstName"
              >
                <input
                  type="text"
                  id="FirstName"
                  name="FirstName"
                />
              </InputGroup>
              <InputGroup
                label={t('lastName')}
                name="LastName"
              >
                <input
                  type="text"
                  id="LastName"
                  name="LastName"
                />
              </InputGroup>
            </div>

            <InputGroup
              label={t('address') + ' *'}
              name="address"
            >
              <input
                type="text"
                id="address"
                name="address"
                required
              />
            </InputGroup>

            <InputGroup
              label={t('townCity') + ' *'}
              name="city"
            >
              <input
                type="text"
                id="city"
                name="city"
                required
              />
            </InputGroup>

            <div className="half-inputs">
              <InputGroup
                label={t('stateCountry') + ' *'}
                name="state"
              >
                <input
                  type="text"
                  id="state"
                  name="state"
                  required
                />
              </InputGroup>
              <InputGroup
                label={t('postcodeZip') + ' *'}
                name="postcode"
              >
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  required
                />
              </InputGroup>
            </div>

            <div className="half-inputs">
              <InputGroup
                label={t('emailAddress') + ' *'}
                name="email"
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </InputGroup>
              <InputGroup
                label={t('phone') + ' *'}
                name="phone"
              >
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                />
              </InputGroup>
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="createAccount"
              />
              <label htmlFor="createAccount">{t('createAccount')}</label>
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="shipToDifferent"
              />
              <label htmlFor="shipToDifferent">{t('shipToDifferentAddress')}</label>
            </div>

            <InputGroup
              label={t('orderNotes')}
              name="notes"
            >
              <textarea
                id="notes"
                name="notes"
                placeholder={t('notesPlaceholder')}
                rows="4"
              />
            </InputGroup>
          </form>

          <section className="checkout-summary">
            <p className="checkout-title">{t('yourOrder')}</p>

            <div className="order-table">
              <div className="table-header">
                <span>{t('product')}</span>
                <span>{t('total')}</span>
              </div>

              {cart.map((item, index) => (
                <div
                  className="table-row"
                  key={index}
                >
                  <span>
                    {(typeof item.title === 'object'
                      ? item.title[i18n.language] || item.title.en
                      : item.title) || 'Unnamed'}{' '}
                    <strong>×{item.quantity}</strong>
                  </span>
                  <span>
                    {symbol}
                    {convert(item.price * item.quantity)}
                  </span>
                </div>
              ))}

              <div className="table-row">
                <strong>{t('cartSubtotal')}</strong>
                <span>
                  {symbol}
                  {convert(subtotal)}
                </span>
              </div>

              {discount > 0 && (
                <div className="table-row">
                  <span>
                    {t('discount')}
                    {appliedCoupon?.code ? ` (${appliedCoupon.code})` : ''}
                  </span>{' '}
                  <span>
                    -{symbol}
                    {convert(discount)}
                  </span>
                </div>
              )}

              <div className="table-row total-row">
                <strong>{t('total')}</strong>
                <strong>
                  {symbol}
                  {convert(total)}
                </strong>
              </div>
            </div>

            <div className="payment-methods">
              <div>
                <p
                  onClick={() => setSelectedMethod(selectedMethod === 'bank' ? '' : 'bank')}
                  className="clickable-method"
                >
                  {t('directBankTransfer')}
                </p>
                <div className={`methodscontainer ${selectedMethod === 'bank' ? 'show' : ''}`}>
                  {selectedMethod === 'bank' && <>{t('directBankTransferDescription')}</>}
                </div>
              </div>

              <div>
                <p
                  onClick={() => setSelectedMethod(selectedMethod === 'cheque' ? '' : 'cheque')}
                  className="clickable-method"
                >
                  {t('chequePayment')}
                </p>
                <div className={`methodscontainer ${selectedMethod === 'cheque' ? 'show' : ''}`}>
                  {selectedMethod === 'cheque' && <>{t('chequePaymentDescription')}</>}
                </div>
              </div>

              <div>
                <p
                  onClick={() => setSelectedMethod(selectedMethod === 'paypal' ? '' : 'paypal')}
                  className="clickable-method"
                >
                  {t('paypal')}
                </p>
                <div className={`methodscontainer ${selectedMethod === 'paypal' ? 'show' : ''}`}>
                  {selectedMethod === 'paypal' && <>{t('paypalDescription')}</>}
                </div>
              </div>

              <button
                type="submit"
                className="checkout-button"
              >
                {t('placeOrder')}
              </button>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}

export default Checkout;
