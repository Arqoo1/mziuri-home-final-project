import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import { useTranslation } from 'react-i18next';
import { useCompare } from '../Context/CompareContext';
import { useCurrency } from '../Context/CurrencyContext';

function Product({ product, className = '' }) {
  const navigate = useNavigate();
  const { _id, title, price, salePrice, rating, image, description } = product;
  const stars = Rating(rating);
  const { addToCompare } = useCompare();
  const { i18n } = useTranslation();
const { convert, symbol } = useCurrency();

  const handleClick = () => {
    navigate(`/shop/${_id}`);
  };
  const handleCompareClick = (e) => {
    e.stopPropagation();
    addToCompare(product);
    navigate('/compare');
  };

  return (
    <div
      className={`product-card ${className}`}
      onClick={handleClick}
    >
      <div className="icon-wrapper">
        <i className="fa-solid fa-heart"></i>
        <i className="fa-solid fa-eye"></i>
        <i
          className="fa-solid fa-code-compare"
          onClick={handleCompareClick}
        ></i>{' '}
      </div>
      <img
        src={image}
        alt={typeof title === 'object' ? title[i18n.language] : title}
        className="product-img"
      />

      <div className="product-inform">
        <h3>{typeof title === 'object' ? title[i18n.language] : title}</h3>
        <p className="rating">
          <Rating rating={rating} />
        </p>{' '}
        {salePrice ? (
          <p className="product-price">
            <span className="sale-price">
              {symbol} {convert(salePrice)}
            </span>
            <span className="original-price">
              {symbol} {convert(price)}
            </span>
          </p>
        ) : (
          <p className="product-price">
            {symbol} {convert(price)}
          </p>
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
