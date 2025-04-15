import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productsData from "../data/product";
import useStars from "../hooks/useStars";

function SinglePage() {
  const { id } = useParams();
  const product = productsData.find((item) => item.id === parseInt(id));
  const [amount, setAmount] = useState(1);

  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    console.log("Add to cart:", product, "Quantity:", amount);
  };

  const handleAddToWishlist = () => {
    console.log("Add to wishlist:", product);
  };

  const stars = useStars(product.rating);

  return (
    <main className="single-product-page">
      <section className="product-wrapper">
        <img src={product.image} alt={product.title} />
        <div className="product-details">
          <h2>{product.title}</h2>
          <p className="price">${product.price}</p>
          <div className="rating">{stars}</div>
          <p className="descp">{product.description}</p>
          <div className="add-to-cart">
            <div className="amount-chooser">
              <input
                type="number"
                id="amount"
                min="1"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value, 10))}
              />
            </div>
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              Add to Cart
            </button>
            <button onClick={handleAddToWishlist} className="add-to-wishlist-btn">
              Add to Wishlist
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SinglePage;
