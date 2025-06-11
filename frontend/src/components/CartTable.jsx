import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserData } from '../Context/UserContext';
import { fetchSingleProduct } from '../api/productapi';

function CartTable() {
  const { t, i18n } = useTranslation();
  const { loggedIn, cart, setCart } = useUserData();
  const [enrichedCart, setEnrichedCart] = useState([]);

  const getLocalizedValue = (value) => {
    if (!value) return '';
    if (typeof value === 'object') {
      return value[i18n.language] || value.en || value[Object.keys(value)[0]];
    }
    return value;
  };

  useEffect(() => {
    const enrichCartItems = async () => {
      if (!cart || cart.length === 0) {
        setEnrichedCart([]);
        return;
      }

      const promises = cart.map(async (item) => {
        if (item.title && item.image && item.price) return item;

        const productData = await fetchSingleProduct(item.productId || item._id);
        return {
          ...item,
          title: productData.title,
          image: productData.image,
          price: productData.salePrice || productData.price,
        };
      });

      const results = await Promise.all(promises);
      setEnrichedCart(results);
    };

    enrichCartItems();
  }, [cart]);

  const handleDelete = (id) => {
    const updatedCart = cart.filter((item) => item.productId !== id && item._id !== id);
    setCart(updatedCart);
    if (!loggedIn) {
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.productId === id || item._id === id
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
    if (!loggedIn) {
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));
    }
  };

  if (!enrichedCart || enrichedCart.length === 0) return <p>{t('cart_empty')}</p>;

  return (
    <table className="cart-table">
      <thead>
        <tr>
          <th>{t('image')}</th>
          <th>{t('name')}</th>
          <th>{t('price')}</th>
          <th>{t('quantity')}</th>
          <th>{t('total')}</th>
          <th>{t('actions')}</th>
        </tr>
      </thead>
      <tbody>
        {enrichedCart.map((item) => {
          const id = item.productId || item._id;
          return (
            <tr key={id}>
              <td>
                <img
                  src={item.image}
                  alt={getLocalizedValue(item.title)}
                  width="100"
                />
              </td>
              <td>{getLocalizedValue(item.title)}</td>
              <td>${item.price}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(id, Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(id)}
                >
                  {t('delete')}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CartTable;
