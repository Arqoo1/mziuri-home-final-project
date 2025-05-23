import React, { useEffect, useState } from 'react';
import { getCartItems, deleteCartItem, editCartItem } from '../api/cartapi';

function CartTable() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          // Add fallback _id for guest cart items if missing
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

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <table className="CartTable">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <tr key={item._id}>
            <td>
              <img
                src={item.image}
                alt={item.name}
                width="50"
              />
            </td>
            <td>{item.name}</td>
            <td>${item.price}</td>
            <td>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
              />
            </td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
            <td>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CartTable;
