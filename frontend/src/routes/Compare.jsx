import React, { useState } from 'react';
import { useCompare } from '../Context/CompareContext';
import ProductsModal from '../components/ProductsModal';
import RouteBanner from '../components/RouteBanner';
import Rating from '../components/Rating';
import { useAddToCart } from '../hooks/useAddToCart';
import { useWishlist } from '../hooks/useWishlist';

function Compare({ allProducts }) {
  const { compareList, addToCompare, removeFromCompare } = useCompare();
  const [modalOpen, setModalOpen] = useState(false);
  const { addToCart } = useAddToCart();
  const { addToWishlist } = useWishlist();

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
      <RouteBanner page="Compare" />
      <h2>Compare Products</h2>

      <table className="compare-table">
        <thead>
          <tr>
            <th>Attribute</th>
            {columns.map((p, i) => (
              <th key={i}>
                {p ? (
                  p.title?.en || p.title
                ) : (
                  <button
                    className="action-btn"
                    onClick={openModal}
                  >
                    + Add Product
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Product image + title */}
          <tr>
            <td>Product</td>
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
                  <p className="placeholder">No product</p>
                )}
              </td>
            ))}
          </tr>

          {/* Description */}
          <tr>
            <td>Description</td>
            {columns.map((p, i) => (
              <td key={i}>
                {p ? p.description?.en || p.description : <p className="placeholder">-</p>}
              </td>
            ))}
          </tr>

          {/* Stock */}
          <tr>
            <td>Stock</td>
            {columns.map((p, i) => (
              <td key={i}>
                {p ? (
                  p.stock === true ? (
                    'In Stock'
                  ) : (
                    'Out of Stock'
                  )
                ) : (
                  <p className="placeholder">-</p>
                )}
              </td>
            ))}
          </tr>

          {/* Price */}
          <tr>
            <td>Price</td>
            {columns.map((p, i) => (
              <td key={i}>{p ? `$${p.salePrice || p.price}` : <p className="placeholder">-</p>}</td>
            ))}
          </tr>

          {/* Rating */}
          <tr>
            <td>Rating</td>
            {columns.map((p, i) => (
              <td key={i}>{p ? <Rating rating={p.rating} /> : <p className="placeholder">-</p>}</td>
            ))}
          </tr>

          {/* Add to Cart */}
          <tr>
            <td>Add to Cart</td>
            {columns.map((p, i) => (
              <td key={i}>
                {p ? (
                  <button
                    className="add-btn"
                    onClick={() => addToCart(p, 1)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <p className="placeholder">-</p>
                )}
              </td>
            ))}
          </tr>

          {/* Add to Wishlist */}
          <tr>
            <td>Add to Wishlist</td>
            {columns.map((p, i) => (
              <td key={i}>
                {p ? (
                  <button
                    className="wishlist-btn"
                    onClick={() => addToWishlist(p)}
                  >
                    Add to Wishlist
                  </button>
                ) : (
                  <p className="placeholder">-</p>
                )}
              </td>
            ))}
          </tr>

          <tr>
            <td>Remove</td>
            {columns.map((p, i) => (
              <td key={i}>
                {p ? (
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCompare(p._id)}
                    title="Remove from compare"
                  >
                    Remove
                  </button>
                ) : (
                  <p className="placeholder">-</p>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

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
