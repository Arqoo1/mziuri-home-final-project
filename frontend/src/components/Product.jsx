import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import { useTranslation } from 'react-i18next';

function Product({ product }) {
  const navigate = useNavigate();
  const { _id, title, price, salePrice, rating, image } = product;
  const stars = Rating(rating);

    const { t, i18n } = useTranslation();
  
  const handleClick = () => {
    navigate(`/shop/${_id}`);
  };

  return (
    <div
      className="product-card"
      onClick={handleClick}
    >
      <img
        src={image}
        alt={typeof title === 'object' ? title[i18n.language] : title}
        className="product-img"
      />
      <h3>{typeof title === 'object' ? title[i18n.language] : title}</h3>
      {salePrice ? (
        <p className="product-price">
          <span className="sale-price">${salePrice}</span>
          <span className="original-price">${price}</span>{' '}
        </p>
      ) : (
        <p className="product-price">${price}</p>
      )}
      <p className="rating">{stars}</p>
    </div>
  );
}

export default Product;
