import React, { useEffect, useState } from 'react';
import { fetchProductData } from '../api/productapi';

function ProductsModal({ excludedProducts = [], onAdd, onClose }) {
  const [allProducts, setAllProducts] = useState([]);
  const [sort, setSort] = useState('default');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductData(sort);
        setAllProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    loadProducts();
  }, [sort]);

  const handleSortChange = (e) => setSort(e.target.value);

  const isExcluded = (product) =>
    excludedProducts.some((item) => item._id === product._id || item.productId === product._id);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Select a product to add</h3>
        <button
          className="close-btn"
          onClick={onClose}
        >
          &times;
        </button>

        {/* <div className="sort-control">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sort} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="rating-desc">Rating</option>
            <option value="title-asc">Title A–Z</option>
          </select>
        </div> */}

        <ul className="product-list">
          {allProducts.map((p) => {
            const disabled = isExcluded(p);
            return (
              <li
                key={p._id}
                className={disabled ? 'disabled' : ''}
                onClick={() => {
                  if (!disabled) onAdd(p);
                }}
              >
                <img
                  src={p.image}
                  alt={p.title?.en || p.title}
                />
                <span>{p.title?.en || p.title}</span>
                {disabled && <span className="tag">Already Added</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ProductsModal;
