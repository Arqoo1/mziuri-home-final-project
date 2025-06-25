import React from 'react';

function AddConfirmationModal({
  productTitle,
  action, 
  onClose,
  onConfirm,
}) {
  const capitalizedAction = action === 'cart' ? 'Cart' : 'Wishlist';

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>"{productTitle}"</h2>
        <p>
          Do you want to add this product to your <strong>{capitalizedAction}</strong>?
        </p>
        <div>
          <button onClick={onClose}>Close</button>
          <button onClick={onConfirm}>Add to {capitalizedAction}</button>
        </div>
      </div>
    </div>
  );
}

export default AddConfirmationModal;
