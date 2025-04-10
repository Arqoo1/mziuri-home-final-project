import React from "react";

function Product({ title, price, rating, image }) {
  const roundedRating = Math.round(rating);

  const stars = [];
  for (let i = 0; i < roundedRating; i++) {
    stars.push(<i key={i} className="fas fa-star"></i>);
  }

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />
      <h3>{title}</h3>
      <p>${price}</p>
      <p>{stars}</p>
    </div>
  );
}

export default Product;
