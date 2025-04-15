import React from "react";
import { useNavigate } from "react-router-dom";
import useStars from "../hooks/useStars"; // import the hook

function Product({ id, title, price, rating, image }) {
  const navigate = useNavigate();
  const stars = useStars(rating); // use the hook

  return (
    <div className="product-card" onClick={() => navigate(`/shop/${id}`)}>
      <img src={image} alt={title} className="product-img" />
      <h3>{title}</h3>
      <p>${price}</p>
      <p>{stars}</p>
    </div>
  );
}

export default Product;
