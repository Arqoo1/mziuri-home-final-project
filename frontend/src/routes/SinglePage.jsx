import React, { useState, useEffect } from 'react';
import { useLoader } from '../hooks/useLoader';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../api/productapi';
import { addToCart } from '../api/cartapi';
import Rating from '../components/Rating';
import RouteBanner from '../components/RouteBanner';
import { useTranslation } from 'react-i18next';

function SinglePage({ isAuthenticated }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { useDataLoader } = useLoader();
  const { i18n } = useTranslation();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const productData = await useDataLoader(() => fetchSingleProduct(id));
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    const cartItem = {
      title: localizedTitle,
      price: product.salePrice || product.price,
      quantity,
      image: product.image,
    };

    try {
      if (isAuthenticated) {
        await addToCart(cartItem); // backend
      } else {
        // localStorage logic
        const localCart = JSON.parse(localStorage.getItem('guestCart')) || [];
        const existingIndex = localCart.findIndex((item) => item.title === cartItem.title);
        if (existingIndex !== -1) {
          localCart[existingIndex].quantity += cartItem.quantity;
        } else {
          localCart.push(cartItem);
        }
        localStorage.setItem('guestCart', JSON.stringify(localCart));
      }
      console.log('cartItem:', cartItem), alert('Added to cart!');
    } catch (error) {
      alert(`Failed to add to cart: ${error.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  const stars = Rating(product.rating);
  const localizedTitle =
    typeof product.title === 'object' ? product.title[i18n.language] : product.title;
  const localizedDescription =
    typeof product.description === 'object'
      ? product.description[i18n.language]
      : product.description;
  return (
    <main className="single-product-page">
      <RouteBanner page="Single Page" />

      <section className="product-wrapper">
        <img
          src={product.image}
          alt={localizedTitle}
        />
        <div className="product-details">
          <h2>{localizedTitle}</h2>
          {product.salePrice ? (
            <p className="product-price">
              <span className="sale-price">${product.salePrice}</span>
              <span className="original-price">${product.price}</span>
            </p>
          ) : (
            <p className="product-price">${product.price}</p>
          )}
          <div className="rating">{stars}</div>
          <p className="descp">{localizedDescription}</p>
          <div className="add-to-cart">
            <div className="amount-chooser">
              <input
                type="number"
                id="amount"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
            <button
              onClick={() => console.log('Add to Wishlist')}
              className="add-to-wishlist-btn"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SinglePage;
