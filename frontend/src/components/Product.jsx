import React from "react";
import { useNavigate } from "react-router-dom";
import useStars from "../hooks/useStars";

function Product({ product }) {
  const navigate = useNavigate();
  const { _id, title, price, rating, image } = product;
  const stars = useStars(rating)

  const handleClick = () => {
    navigate(`/shop/${_id}`)
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={image} alt={title} className="product-img" />
      <h3>{title}</h3>
      <p>${price}</p>
      <p>{stars}</p>
    </div>
  );
}

export default Product;
