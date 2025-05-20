import React, { useEffect, useState } from 'react';
import { useLoader } from '../hooks/useLoader';
import { fetchProductData } from '../api/productapi';
import Product from './Product';
import LeftFilter from './LeftFilter';
import TopFilter from './Topfilter';

function ProductList() {
  const [titleFilter, setTitleFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('price_asc');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const { useDataLoader } = useLoader();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const allTags = React.useMemo(() => {
    const tagSet = new Set();
    products.forEach((product) => {
      if (product.tags) {
        product.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [products]);

  const allCategories = React.useMemo(() => {
    const categorySet = new Set();
    products.forEach((product) => {
      if (product.category) {
        categorySet.add(product.category);
      }
    });
    return Array.from(categorySet).sort();
  }, [products]);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await useDataLoader(() => fetchProductData(sort));
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    loadProducts();
  }, [sort]);

  const filteredProducts = products.filter(
    ({ title, price, tags, category }) =>
      // title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      price >= priceRange[0] &&
      price <= priceRange[1] &&
      (selectedTags.length === 0 || selectedTags.some((tag) => tags.includes(tag))) &&
      (!selectedCategory || category === selectedCategory)
  );

  return (
    <section className="product-list-wrapper">
      <LeftFilter
        setTitleFilter={setTitleFilter}
        setPriceRange={setPriceRange}
        priceRange={priceRange}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        allTags={allTags}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        allCategories={allCategories}
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
              <Product
                key={product._id}
                product={product}
              />
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
