import React, { useState } from "react";
import productsData from "../data/product";
import Product from "./Product";
import Filter from "./Filter";

function ProductList() {
  const [titleFilter, setTitleFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);

  const filteredProducts = productsData.filter((product) => {
    const matchesTitle = product.title.toLowerCase().includes(titleFilter);
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesTitle && matchesPrice;
  });

  return (
    <div className="product-list-wrapper">
      <h3>SHOPP</h3>
      <Filter
        setTitleFilter={setTitleFilter}
        setPriceRange={setPriceRange}
        priceRange={priceRange}
      />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
