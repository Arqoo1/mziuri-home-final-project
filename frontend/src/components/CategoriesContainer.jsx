import React, { useEffect, useState } from 'react';
import { fetchProductData } from '../api/productapi';
import categorybanner1 from '../assets/categorybanner1.webp';
import categorybanner2 from '../assets/categorybanner2.webp';
import categorybanner3 from '../assets/categorybanner3.webp';
import categorybanner4 from '../assets/categorybanner4.webp';
import categorybanner5 from '../assets/categorybanner5.webp';
import { useTranslation } from 'react-i18next';

function CategoriesContainer() {
  const [categories, setCategories] = useState([]);
  const { i18n } = useTranslation();

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
        const category = product.category;
        if (category && category.en) {
          acc[category.en] = acc[category.en] || { ...category, count: 0 };
          acc[category.en].count += 1;
        }
        return acc;
      }, {});

      const categoriesArray = Object.values(categoryCounts);

      setCategories(categoriesArray);
    };

    getProducts();
  }, []);

  return (
    <section className="categories-container">
      {categories.length > 0 ? (
        <>
          <div
            key={categories[0].en}
            className="category-item1"
            style={{
              backgroundImage: `url(${categoryBanners[0 % categoryBanners.length]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="category-content">
              <h3>{categories[0][i18n.language] || categories[0].en}</h3>
              <p>
                {categories[0].count} {i18n.language === 'ka' ? 'პროდუქტი' : 'product'}
              </p>
            </div>
          </div>

          <div className="category-group">
            {categories.slice(1, 5).map((category, index) => (
              <div
                key={category.en}
                className={`category-item${index + 2}`}
                style={{
                  backgroundImage: `url(${categoryBanners[(index + 1) % categoryBanners.length]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="category-content">
                  <h3>{category[i18n.language] || category.en}</h3>
                  <p>
                    {category.count} {i18n.language === 'ka' ? 'პროდუქტი' : 'product'}
                  </p>
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
