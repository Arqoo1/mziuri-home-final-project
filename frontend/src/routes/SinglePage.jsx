import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../api/productapi';
import { useLoader } from '../hooks/useLoader';
import Rating from '../components/Rating';
import RouteBanner from '../components/RouteBanner';
import { useTranslation } from 'react-i18next';
import AddConfirmationModal from '../components/AddConfirmationModal';
import { useAddToCart } from '../hooks/useAddToCart';
import { useWishlist } from '../hooks/useWishlist';
import { useCurrency } from '../Context/CurrencyContext';
import Reviews from '../components/Reviews';
import Button from '../components/Button';

function SinglePage() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { useDataLoader } = useLoader();
  const { t, i18n } = useTranslation();
  const { convert, symbol } = useCurrency();
  const { addToCart } = useAddToCart();
  const { addToWishlist } = useWishlist();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  const localizedTitle =
    typeof product.title === 'object' ? product.title[i18n.language] : product.title;
  const localizedDescription =
    typeof product.description === 'object'
      ? product.description[i18n.language]
      : product.description;

  const handleOpenModal = (actionType) => {
    setModalAction(actionType);
    setModalOpen(true);
  };

  const handleConfirmAdd = () => {
    if (modalAction === 'cart') {
      addToCart(product, quantity);
    } else if (modalAction === 'wishlist') {
      addToWishlist(product);
    }
    setModalOpen(false);
  };

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
                <span className="sale-price">
                  {symbol}
                  {convert(product.salePrice)}
                </span>
                <span className="original-price">
                  {symbol}
                  {convert(product.price)}
                </span>
              </>
            ) : (
              <>
                {symbol}
                {convert(product.price)}
              </>
            )}
          </p>
          <div className="rating">{<Rating rating={product.rating} />}</div>
          <p className="descp">{localizedDescription}</p>

          {/* ✅ Corrected stock check */}
          <p className={`stock-status ${product.stock ? 'in' : 'out'}`}>
            {product.stock ? t('inStock') : t('outOfStock')}
          </p>

          <div className="add-to-cart">
            <div className="amount-chooser">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
            <Button
              onClick={() => handleOpenModal('cart')}
              className="btn1"
              text="Add to Cart"
            />
            <Button
              onClick={() => handleOpenModal('wishlist')}
              className="btn2"
              text="Add to Wishlist"
            />
          </div>
        </div>
      </section>

      {modalOpen && (
        <AddConfirmationModal
          productTitle={localizedTitle}
          action={modalAction}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirmAdd}
        />
      )}

      <Reviews
        productId={productId}
        product={product}
      />
    </main>
  );
}

export default SinglePage;
