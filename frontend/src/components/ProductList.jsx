import React, { useEffect, useState } from "react";
import {fetchProductData} from "../api/productapi";
import Product from "./Product";
import LeftFilter from "./LeftFilter";
import TopFilter from "./Topfilter";

function ProductList() {
  const [titleFilter, setTitleFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("price_asc");
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductData(sort);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    loadProducts();
  }, [sort]);

  const filteredProducts = products.filter(
    ({ title, price }) =>
      title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      price >= priceRange[0] &&
      price <= priceRange[1]
  );

  return (
    <section className="product-list-wrapper">
      <LeftFilter
        setTitleFilter={setTitleFilter}
        setPriceRange={setPriceRange}
        priceRange={priceRange}
      />
      <div className="product-grid">
        <TopFilter
          sort={sort}
          setSort={setSort}
          isSelectOpen={isSelectOpen}
          setIsSelectOpen={setIsSelectOpen}
        />

        {filteredProducts.length > 0 ? (
          <div className="products-container">
            {filteredProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">No products match your filters</div>
        )}
      </div>
    </section>
  );
}

export default ProductList;
