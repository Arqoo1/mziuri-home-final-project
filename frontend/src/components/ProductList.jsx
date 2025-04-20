import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/productapi";
import Product from "./Product";
import Filter from "./Filter";

function ProductList() {
  const [titleFilter, setTitleFilter] = useState(""); 
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts(titleFilter, priceRange[0], priceRange[1]);
        setProducts(data);  
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    }

    loadProducts();  
  }, [titleFilter, priceRange]);  

  return (
    <section className="product-list-wrapper">
      <Filter
        setTitleFilter={setTitleFilter}
        setPriceRange={setPriceRange}
        priceRange={priceRange}
      />
      
      <div className="product-grid">
        {products.map((product) => (
          <Product
            key={product._id}
            id={product._id}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
