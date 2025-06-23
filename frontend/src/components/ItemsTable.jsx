import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserData } from '../Context/UserContext';
import { fetchSingleProduct } from '../api/productapi';
import { updateUserCart } from '../api/usersapi';
import AddConfirmationModal from './AddConfirmationModal';
import { useCurrency } from '../Context/CurrencyContext';

function ItemsTable({ items, setItems, loggedIn, updateBackend, isCart = true }) {
  const { t, i18n } = useTranslation();
  const [enrichedItems, setEnrichedItems] = useState([]);
  const { cart, setCart, wishlist, setWishlist } = useUserData();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState('cart');
  const { convert, symbol } = useCurrency();

  const getLocalizedValue = (value) => {
    if (!value) return '';
    if (typeof value === 'object') {
      return value[i18n.language] || value.en || value[Object.keys(value)[0]];
    }
    return value;
  };

  useEffect(() => {
    const enrichItems = async () => {
      if (!items || items.length === 0) {
        setEnrichedItems([]);
        return;
      }
      const promises = items.map(async (item) => {
        if (item.title && item.image && item.price != undefined) return item;
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
      setEnrichedItems(results);
    };

    enrichItems();
  }, [items, isCart]);

  const handleDelete = async (id) => {
    const updatedItems = items.filter((item) => item.productId !== id && item._id !== id);
    setItems(updatedItems);

    if (loggedIn && updateBackend) {
      try {
        await updateBackend(updatedItems);
      } catch (err) {
        console.error('Failed to sync with server:', err);
      }
    } else {
      localStorage.setItem(isCart ? 'guestCart' : 'guestWishlist', JSON.stringify(updatedItems));
    }
  };

  const handleQuantityChange = async (id, newQuantity) => {
    if (!isCart) return;

    const updatedItems = items.map((item) =>
      item.productId === id || item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setItems(updatedItems);

    if (loggedIn && updateBackend) {
      try {
        await updateBackend(updatedItems);
      } catch (err) {
        console.error('Failed to sync with server:', err);
      }
    } else {
      localStorage.setItem('guestCart', JSON.stringify(updatedItems));
    }
  };

  const openModal = (product, mode) => {
    setSelectedProduct(product);
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleConfirmAdd = async (product) => {
    if (modalMode === 'cart') {
      const id = product.productId || product._id;
      const existingItem = cart.find((item) => item.productId === id || item._id === id);

      let updatedCart;
      if (existingItem) {
        updatedCart = cart.map((item) =>
          item.productId === id || item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...cart, { ...product, quantity: 1 }];
      }

      setCart(updatedCart);

      if (loggedIn) {
        try {
          await updateUserCart(updatedCart);
        } catch (err) {
          console.error('Failed to update cart:', err);
        }
      } else {
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      }
    } else {
      const id = product.productId || product._id;
      const existingItem = wishlist.find((item) => item.productId === id || item._id === id);
      if (!existingItem) {
        const updatedWishlist = [...wishlist, product];
        setWishlist(updatedWishlist);

        if (loggedIn && updateBackend) {
          try {
            await updateBackend(updatedWishlist);
          } catch (err) {
            console.error('Failed to update wishlist:', err);
          }
        } else {
          localStorage.setItem('guestWishlist', JSON.stringify(updatedWishlist));
        }
      }
    }
  };

  if (!enrichedItems || enrichedItems.length === 0) {
    return <p>{t(isCart ? 'cart_empty' : 'wishlist_empty')}</p>;
  }

  return (
    <>
      <table className={`cart-table ${!isCart ? 'wishlist-mode' : ''}`}>
        <thead>
          <tr>
            <th>{t('Image')}</th>
            <th>{t('Product')}</th>
            <th>{t('Price')}</th>
            {!isCart && <th>{t('Stock Status')}</th>}
            {isCart && <th>{t('Quantity')}</th>}
            {isCart && <th>{t('Total')}</th>}
            {!isCart && <th>{t('Add To Cart')}</th>}
            <th>{t('Remove')}</th>
          </tr>
        </thead>
        <tbody>
          {enrichedItems.map((item) => {
            const id = item.productId || item._id;
            const convertedPrice = convert(item.price);
            const convertedTotal = convert(item.price * item.quantity);

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
                <td>{symbol}{convertedPrice}</td>
                {!isCart && <td>{item.stock ? t('in stock') : t('out of stock')}</td>}
                {isCart && (
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
                )}
                {isCart && <td>{symbol}{convertedTotal}</td>}
                {!isCart && (
                  <td>
                    <button
                      className="add-to-cart-button"
                      onClick={() => openModal(item, 'cart')}
                    >
                      {t('add to cart')}
                    </button>
                  </td>
                )}
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(id)}
                  >
                    {t('remove')}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {modalOpen && selectedProduct && (
        <AddConfirmationModal
          productTitle={getLocalizedValue(selectedProduct.title)}
          action={modalMode}
          onConfirm={() => {
            handleConfirmAdd(selectedProduct);
            setModalOpen(false);
          }}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export default ItemsTable;
