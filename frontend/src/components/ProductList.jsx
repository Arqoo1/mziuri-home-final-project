import React, { useEffect, useState } from "react";
import fetchProductData from "../api/productapi";
import Product from "./Product";
import Filter from "./Filter";

function ProductList() {
  const [titleFilter, setTitleFilter] = useState(""); 
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductData();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    loadProducts();  
  }, []);

  const filteredProducts = products.filter(({ title, price }) =>
    title.toLowerCase().includes(titleFilter.toLowerCase()) &&
    price >= priceRange[0] && price <= priceRange[1]
  );

  return (
    <section className="product-list-wrapper">
      <Filter setTitleFilter={setTitleFilter} setPriceRange={setPriceRange} priceRange={priceRange} />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
