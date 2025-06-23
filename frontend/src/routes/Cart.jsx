import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteBanner from '../components/RouteBanner';
import ItemsTable from '../components/ItemsTable';
import { updateUserCart } from '../api/usersapi';
import { useUserData } from '../Context/UserContext';
import { fetchSingleProduct } from '../api/productapi';
import CouponInput from '../components/CouponBox';
import { validateCoupon } from '../api/couponapi';
import ProductsModal from '../components/ProductsModal';
import { useCurrency } from '../Context/CurrencyContext';

function Cart() {
  const { cart, setCart, loggedIn, userData } = useUserData();
  const [enrichedCart, setEnrichedCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { convert, symbol } = useCurrency();

  useEffect(() => {
    const enrichItems = async () => {
      if (!cart || cart.length === 0) {
        setEnrichedCart([]);
        return;
      }

      const promises = cart.map(async (item) => {
        if (item.price !== undefined) return item;
        const productData = await fetchSingleProduct(item.productId || item._id);
        return {
          ...item,
          title: productData.title,
          image: productData.image,
          price: productData.salePrice || productData.price,
          stock: productData.stock,
        };
      });

      const results = await Promise.all(promises);
      setEnrichedCart(results);
    };

    enrichItems();
  }, [cart]);

  const subtotal = enrichedCart.reduce((acc, item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);
    return acc + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
  }, 0);

  const total = subtotal - discount;

  const handleProceedToCheckout = () => {
    navigate('/checkout', {
      state: {
        cart: enrichedCart,
        subtotal,
        discount,
        total,
        appliedCoupon,
      },
    });
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAddProductFromModal = async (product) => {
    try {
      const productToAdd = {
        ...product,
        quantity: 1,
        price: product.salePrice || product.price,
      };

      const updatedCart = [...cart, productToAdd];
      setCart(updatedCart);

      if (loggedIn) {
        await updateUserCart(updatedCart);
      }
    } catch (error) {
      console.error('Failed to update backend cart:', error);
    }
  };

  useEffect(() => {
    if (!appliedCoupon) {
      setDiscount(0);
      return;
    }

    const { value, type } = appliedCoupon;
    const discountAmount =
      type === 'percentage' ? (subtotal * value) / 100 : Math.min(value, subtotal);

    setDiscount(discountAmount);
  }, [subtotal, appliedCoupon]);

  return (
    <>
      <RouteBanner page="Cart" />

      <section className="ProductTable">
        <ItemsTable
          items={cart}
          setItems={setCart}
          loggedIn={loggedIn}
          updateBackend={updateUserCart}
          isCart={true}
        />

        <section className="coupon-section">
          <CouponInput
            onApply={async (code) => {
              try {
                const result = await validateCoupon(code);
                setAppliedCoupon(result);
                alert(`Coupon applied: ${result.description}`);
              } catch (err) {
                alert(err.message);
              }
            }}
          />
          <button onClick={openModal}>Update Cart</button>
        </section>

        {appliedCoupon && (
          <p className="applied-coupon-msg">
            Coupon "<strong>{appliedCoupon.code}</strong>" applied successfully.
          </p>
        )}

        <div className="cart-summary">
          <p className="checkout-title">Cart Summary</p>
          <div className="summary-row">
            <span>Sub Total:</span>
            <span>
              {symbol}
              {convert(subtotal)}
            </span>
          </div>
          <div className="summary-row">
            <span>Sale:</span>
            <span>
              {symbol}
              {convert(discount)}
            </span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>
              {symbol}
              {convert(total)}
            </span>
          </div>
          <button
            onClick={handleProceedToCheckout}
            disabled={enrichedCart.length === 0 || total <= 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </section>

      {modalOpen && (
        <ProductsModal
          excludedProducts={cart}
          onAdd={handleAddProductFromModal}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default Cart;
