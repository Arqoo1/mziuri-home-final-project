import React, { useEffect, useState } from 'react';
import { getCartItems, deleteCartItem, editCartItem } from '../api/cartapi';
import { useTranslation } from 'react-i18next';

function CartTable() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t, i18n } = useTranslation();

  // Helper function to get localized value
  const getLocalizedValue = (value) => {
    if (!value) return '';
    if (typeof value === 'object') {
      // Try current language first, then fallback to English, then first available key
      return value[i18n.language] || value.en || value[Object.keys(value)[0]];
    }
    return value;
  };

  const loadCart = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      const localData = localStorage.getItem('guestCart');
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          const itemsWithIds = parsed.map((item, index) => ({
            ...item,
            _id: item._id || `guest-${index}-${item.name || index}`,
          }));
          setCartItems(itemsWithIds);
        } catch (err) {
          console.error('Error parsing guest cart data:', err);
        }
      }
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        await deleteCartItem(id);
        setCartItems((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        alert(err.message);
      }
    } else {
      const updatedCart = cartItems.filter((item) => item._id !== id);
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

  const handleQuantityChange = async (id, newQuantity) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const updated = await editCartItem(id, { quantity: newQuantity });
        setCartItems((prev) => prev.map((item) => (item._id === id ? updated : item)));
      } catch (err) {
        alert(err.message);
      }
    } else {
      const updatedCart = cartItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) return <p>{t('loading')}...</p>;
  if (error) return <p>{t('error')}: {error}</p>;

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
        {cartItems.map((item) => (
          <tr key={item._id}>
            <td>
              <div className="product-info">
                <img src={item.image} alt={getLocalizedValue(item.title)} width="100" />
              </div>
            </td>
            <td>
              <div className="product-info">
                {getLocalizedValue(item.title)}
              </div>
            </td>
            <td>${item.price}</td>
            <td>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item._id, Number(e.target.value))
                }
              />
            </td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
            <td>
              <button
                className="delete-button"
                onClick={() => handleDelete(item._id)}
              >
                {t('delete')}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CartTable;