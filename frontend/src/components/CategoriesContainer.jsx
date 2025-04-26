import React, { useEffect, useState } from "react";
import { fetchProductData } from "../api/productapi";

function CategoriesContainer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProductData();

      const categoryCounts = products.reduce((acc, product) => {
        const { category } = product;
        if (category) {
          if (acc[category]) {
            acc[category] += 1;
          } else {
            acc[category] = 1;
          }
        }
        return acc;
      }, {});

      setCategories(
        Object.keys(categoryCounts).map((category) => ({
          name: category,
          count: categoryCounts[category],
        }))
      );
    };

    getProducts();
  }, []);

  return (
    <section className="categories-container">
      {categories.length > 0 ? (
        <>
          <div key={categories[0].name} className="category-item1">
            <h3>{categories[0].name}</h3>
            <p>{categories[0].count} products</p>
          </div>

          <div className="category-group">
            {categories.slice(1, 5).map((category, index) => (
              <div key={category.name} className={`category-item${index + 2}`}>
                <h3>{category.name}</h3>
                <p>{category.count} products</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading categories...</p>
      )}
    </section>
  );
}

export default CategoriesContainer;
