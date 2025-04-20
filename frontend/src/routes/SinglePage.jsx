import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/productapi"; 
import useStars from "../hooks/useStars";  

function SinglePage() {
  const { id } = useParams();  
  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

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
            <button onClick={() => console.log("Add to Cart")} className="add-to-cart-btn">
              Add to Cart
            </button>
            <button onClick={() => console.log("Add to Wishlist")} className="add-to-wishlist-btn">
              Add to Wishlist
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SinglePage;
