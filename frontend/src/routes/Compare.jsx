import React, { useState } from 'react';
import { useCompare } from '../Context/CompareContext';
import ProductsModal from '../components/ProductsModal';
import RouteBanner from '../components/RouteBanner';
import Rating from '../components/Rating';
import { useAddToCart } from '../hooks/useAddToCart';
import { useWishlist } from '../hooks/useWishlist';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
function Compare({ allProducts }) {
  const { t, i18n } = useTranslation();
  const { compareList, addToCompare, removeFromCompare } = useCompare();
  const [modalOpen, setModalOpen] = useState(false);
  const { addToCart } = useAddToCart();
  const { addToWishlist } = useWishlist();
  const currentLang = i18n.language;

  const emptySlots = 3 - compareList.length;
  const columns = [...compareList, ...Array(emptySlots).fill(null)];

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAddProduct = (product) => {
    addToCompare(product);
    closeModal();
  };

  return (
    <>
      <RouteBanner page={t('compare')} />

      <table className="compare-table">
        <thead>
          <tr>
            <th>{t('attribute')}</th>
            {columns.map((p, i) => (
              <th key={i}>
                {p ? (
                  p.title?.en || p.title
                ) : (
                  <Button
                    className="btn2"
                    onClick={openModal}
                    text={`+ ${t('add_product')}`}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t('product')}</td>
            {columns.map((p, i) => (
              <td key={i}>
                {p ? (
                  <>
                    <img
                      src={p.image}
                      alt={p.title?.en || p.title}
                    />
                    <p>{p.title?.en || p.title}</p>
                  </>
                ) : (
                  <p className="placeholder">{t('no_product')}</p>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td>{t('description')}</td>
            {columns.map((p, i) => (
              <td key={i}>
                <div className="value">
                  {p ? (
                    p.description?.[currentLang] || p.description?.en || ''
                  ) : (
                    <p className="placeholder">-</p>
                  )}
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td>{t('stock')}</td>
            {columns.map((p, i) => (
              <td key={i}>
                {p ? p.stock ? t('in_stock') : t('out_of_stock') : <p className="placeholder">-</p>}
              </td>
            ))}
          </tr>
          <tr>
            <td>{t('price')}</td>
            {columns.map((p, i) => (
              <td key={i}>{p ? `$${p.salePrice || p.price}` : <p className="placeholder">-</p>}</td>
            ))}
          </tr>
          <tr>
            <td>{t('rating')}</td>
            {columns.map((p, i) => (
              <td key={i}>{p ? <Rating rating={p.rating} /> : <p className="placeholder">-</p>}</td>
            ))}
          </tr>
          <tr>
            <td>{t('add_to_cart')}</td>
            {columns.map((p, i) => (
              <td key={i}>
                {p ? (
                  <Button
                    className="btn2"
                    onClick={() => addToCart(p, 1)}
                    text={t('add_to_cart')}
                  />
                ) : (
                  <p className="placeholder">-</p>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td>{t('add_to_wishlist')}</td>
            {columns.map((p, i) => (
              <td key={i}>
                {p ? (
                  <Button
                    className="btn3"
                    onClick={() => addToWishlist(p)}
                    text={t('add_to_wishlist')}
                  />
                ) : (
                  <p className="placeholder">-</p>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td>{t('remove')}</td>
            {columns.map((p, i) => (
              <td key={i}>
                {p ? (
                  <Button
                    className="remove-btn"
                    onClick={() => removeFromCompare(p._id)}
                    text={<i className="fa fa-trash"></i>}
                  ></Button>
                ) : (
                  <p className="placeholder">-</p>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <div className="compare-cards">
        {compareList.map((p, i) => (
          <div
            key={i}
            className="compare-card"
          >
            <img
              src={p.image}
              alt={p.title?.en || p.title}
            />
            <div className="title">{p.title?.en || p.title}</div>

            <div className="card-row">
              <span>{t('description')}:</span>
              <div className="value">
                {p.description?.[currentLang] || p.description?.en || ''}
              </div>{' '}
            </div>
            <div className="card-row">
              <span>{t('stock')}:</span>
              <div className="value">{p.stock ? t('in_stock') : t('out_of_stock')}</div>
            </div>
            <div className="card-row">
              <span>{t('price')}:</span>
              <div className="value">${p.salePrice || p.price}</div>
            </div>
            <div className="card-row">
              <span>{t('rating')}:</span>
              <div className="value">
                <Rating rating={p.rating} />
              </div>
            </div>

            <div className="actions">
              <Button
                className="btn2"
                onClick={() => addToCart(p, 1)}
                text={t('add_to_cart')}
              />

              <Button
                className="btn3"
                onClick={() => addToWishlist(p)}
                text={t('add_to_wishlist')}
              />
              <Button
                className="remove-btn"
                onClick={() => removeFromCompare(p._id)}
                text={<i className="fa fa-trash"></i>}
              ></Button>
            </div>
          </div>
        ))}

        {Array(3 - compareList.length)
          .fill(null)
          .map((_, i) => (
            <div
              key={`empty-${i}`}
              className="compare-card empty-card"
            >
              <Button
                className="btn2"
                onClick={openModal}
                text={`+ ${t('add_product')}`}
              />
            </div>
          ))}
      </div>

      {modalOpen && (
        <ProductsModal
          excludedProducts={compareList}
          onAdd={handleAddProduct}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default Compare;
