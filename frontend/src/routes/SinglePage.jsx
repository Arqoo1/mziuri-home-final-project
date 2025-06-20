import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct, addToCart } from '../api/productapi';
import { useLoader } from '../hooks/useLoader';
import Rating from '../components/Rating';
import RouteBanner from '../components/RouteBanner';
import { useTranslation } from 'react-i18next';
import { useUserData } from '../Context/UserContext';
import { updateUserWishlist } from '../api/usersapi';

function SinglePage() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { useDataLoader } = useLoader();
  const { i18n } = useTranslation();
  const { loggedIn, setCart, cart, userData, wishlist, setWishlist } = useUserData();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await useDataLoader(() => fetchSingleProduct(productId));
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) loadProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      if (loggedIn && userData?._id) {
        const response = await addToCart(userData._id, productId, quantity);

        // Backend only returns [{ _id, productId, quantity }]
        const rawCart = response.data || [];

        // Enrich cart manually using current product if it matches
        const enrichedCart = rawCart.map((item) => {
          if (item.productId === productId || item._id === productId) {
            return {
              ...item,
              _id: item.productId || item._id,
              title: product.title,
              image: product.image,
              price: product.salePrice || product.price,
            };
          }
          return item;
        });

        setCart(enrichedCart);
      } else {
        // Guest logic
        const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];

        const existingIndex = guestCart.findIndex((item) => item._id === productId);
        if (existingIndex >= 0) {
          guestCart[existingIndex].quantity += quantity;
        } else {
          guestCart.push({
            _id: productId,
            title: product.title,
            image: product.image,
            price: product.salePrice || product.price,
            quantity,
          });
        }

        localStorage.setItem('guestCart', JSON.stringify(guestCart));
        setCart(guestCart);
      }

      alert('Added to cart!');
    } catch (err) {
      console.error('Add to cart failed:', err);
      alert(`Failed to add to cart: ${err.message}`);
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;

    try {
      if (loggedIn && userData?._id) {
        // Update wishlist backend
        // Assuming backend expects full wishlist array, so add current item
        const newWishlist = [...wishlist];

        // Check if product already in wishlist
        const exists = newWishlist.some(
          (item) => item.productId === productId || item._id === productId
        );
        if (!exists) {
          newWishlist.push({ _id: productId, productId, quantity: 1 });
        }

        // Call backend update API
        await updateUserWishlist(newWishlist);

        setWishlist(newWishlist);
      } else {
        // Guest logic: localStorage wishlist
        const guestWishlist = JSON.parse(localStorage.getItem('guestWishlist')) || [];
        const exists = guestWishlist.some((item) => item._id === productId);
        if (!exists) {
          guestWishlist.push({
            _id: productId,
            title: product.title,
            image: product.image,
            price: product.salePrice || product.price,
            quantity: 1,
          });
          localStorage.setItem('guestWishlist', JSON.stringify(guestWishlist));
          setWishlist(guestWishlist);
        }
      }

      alert('Added to wishlist!');
    } catch (err) {
      console.error('Add to wishlist failed:', err);
      alert(`Failed to add to wishlist: ${err.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  const localizedTitle =
    typeof product.title === 'object' ? product.title[i18n.language] : product.title;
  const localizedDescription =
    typeof product.description === 'object'
      ? product.description[i18n.language]
      : product.description;
  const stars = Rating(product.rating);

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
          <p className="product-price">
            {product.salePrice ? (
              <>
                <span className="sale-price">${product.salePrice}</span>
                <span className="original-price">${product.price}</span>
              </>
            ) : (
              <>${product.price}</>
            )}
          </p>
          <div className="rating">{stars}</div>
          <p className="descp">{localizedDescription}</p>
          <div className="add-to-cart">
            <div className="amount-chooser">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleAddToWishlist()}
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
