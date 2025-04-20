import React from "react";
import { useNavigate } from "react-router-dom";
import useStars from "../hooks/useStars";

function Product({ id, title, price, rating, image }) {
  const navigate = useNavigate();
  const stars = useStars(rating);

  const handleClick = () => {
    navigate(`/shop/${id}`); 
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
