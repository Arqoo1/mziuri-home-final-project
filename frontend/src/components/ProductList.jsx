import React, { useEffect, useState, useMemo } from 'react';
import { useLoader } from '../hooks/useLoader';
import { fetchProductData } from '../api/productapi';
import Product from './Product';
import LeftFilter from './LeftFilter';
import TopFilter from './Topfilter';
import Pagination from './Pagination';
import { useTranslation } from 'react-i18next';

function ProductList() {
  const { i18n } = useTranslation();
  const { useDataLoader } = useLoader();

  const [titleFilter, setTitleFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('price_asc');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productClassName, setProductClassName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 9;

  const allTags = useMemo(() => {
    const tagSet = new Set();
    products.forEach((product) => {
      if (product.tags) {
        product.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [products]);

  const allCategories = useMemo(() => {
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

  const filteredProducts = products.filter(({ price, tags, category }) => {
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((selectedTag) =>
        tags.some((productTag) => productTag.en === selectedTag.en)
      );

    const matchesCategory = !selectedCategory || category?.en === selectedCategory.en;

    return matchesPrice && matchesTags && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1); // Reset page on filters change
  }, [priceRange, selectedTags, selectedCategory, sort]);

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
          productClassName={productClassName}
          setProductClassName={setProductClassName}
        />

        {filteredProducts.length > 0 ? (
          <>
            <div className="products-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedProducts.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  className={productClassName}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="no-products text-center py-8 text-gray-600">
            No products match your filters
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductList;
