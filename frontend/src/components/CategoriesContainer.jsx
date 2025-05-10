import React, { useEffect, useState } from 'react';
import { fetchProductData } from '../api/productapi';
import categorybanner1 from '../assets/categorybanner1.webp';
import categorybanner2 from '../assets/categorybanner2.webp';
import categorybanner3 from '../assets/categorybanner3.webp';
import categorybanner4 from '../assets/categorybanner4.webp';
import categorybanner5 from '../assets/categorybanner5.webp';

function CategoriesContainer() {
  const [categories, setCategories] = useState([]);

  const categoryBanners = [
    categorybanner1,
    categorybanner2,
    categorybanner3,
    categorybanner4,
    categorybanner5,
  ];

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProductData();

      const categoryCounts = products.reduce((acc, product) => {
        const { category } = product;
        if (category) {
          acc[category] = (acc[category] || 0) + 1;
        }
        return acc;
      }, {});

      setCategories(
        Object.keys(categoryCounts).map((category, index) => ({
          name: category,
          count: categoryCounts[category],
          banner: categoryBanners[index % categoryBanners.length],
        }))
      );
    };

    getProducts();
  }, []);

  return (
    <section className="categories-container">
      {categories.length > 0 ? (
        <>
          <div
            key={categories[0].name}
            className="category-item1"
            style={{
              backgroundImage: `url(${categories[0].banner})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="category-content">
              <h3>{categories[0].name}</h3>
              <p>{categories[0].count} products</p>
            </div>
          </div>

          <div className="category-group">
            {categories.slice(1, 5).map((category, index) => (
              <div
                key={category.name}
                className={`category-item${index + 2}`}
                style={{
                  backgroundImage: `url(${category.banner})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.count} products</p>
                </div>
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
