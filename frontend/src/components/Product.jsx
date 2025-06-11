import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import { useTranslation } from 'react-i18next';

function Product({ product, className = '' }) {
  const navigate = useNavigate();
  const { _id, title, price, salePrice, rating, image, description } = product;
  const stars = Rating(rating);

  const { i18n } = useTranslation();

  const handleClick = () => {
    navigate(`/shop/${_id}`);
  };

  return (
    <div
      className={`product-card ${className}`}
      onClick={handleClick}
    >
      <div className="icon-wrapper">
        <i className="fa-solid fa-heart"></i>
        <i className="fa-solid fa-eye"></i>
      </div>
      <img
        src={image}
        alt={typeof title === 'object' ? title[i18n.language] : title}
        className="product-img"
      />

      <div className="product-inform">
        <h3>{typeof title === 'object' ? title[i18n.language] : title}</h3>
        <p className="rating">{stars}</p>
        {salePrice ? (
          <p className="product-price">
            <span className="sale-price">${salePrice}</span>
            <span className="original-price">${price}</span>{' '}
          </p>
        ) : (
          <p className="product-price">${price}</p>
        )}
        {className.includes('product-in-list') && description && (
          <p className="product-description">
            {typeof description === 'object' ? description[i18n.language] : description}
          </p>
        )}
      </div>
    </div>
  );
}

export default Product;
