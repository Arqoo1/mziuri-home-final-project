import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../api/productapi";
import useStars from "../hooks/useStars";

function SinglePage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const productData = await fetchSingleProduct(id);
        setProduct(productData);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      // (fetch if prodct have id )
      getProduct();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  const stars = useStars(product.rating);
  return (
    <main className="single-product-page">
      <section className="product-wrapper">
        <img src={product.image} alt={product.title} />
        <div className="product-details">
          <h2>{product.title}</h2>
          {product.salePrice ? (
            <p className="product-price">
              <span className="sale-price">${product.salePrice}</span>
              <span className="original-price">${product.price}</span>{" "}
            </p>
          ) : (
            <p className="product-price">${product.price}</p>
          )}
          <div className="rating">{stars}</div>
          <p className="descp">{product.description}</p>
          <div className="add-to-cart">
            <div className="amount-chooser">
              <input
                type="number"
                id="amount"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              />
            </div>
            <button
              onClick={() => console.log("Add to Cart")}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
            <button
              onClick={() => console.log("Add to Wishlist")}
              className="add-to-wishlist-btn"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SinglePage;
