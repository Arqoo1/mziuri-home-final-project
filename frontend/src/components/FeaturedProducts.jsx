import React, { useEffect, useState } from 'react';
import { fetchProductData } from '../api/productapi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Product from './Product';

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [topRowProducts, setTopRowProducts] = useState([]);
  const [bottomRowProducts, setBottomRowProducts] = useState([]);
  const [topSwiper, setTopSwiper] = useState(null);
  const [bottomSwiper, setBottomSwiper] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      const products = await fetchProductData();
      const filtered = products.filter((p) => p.tags?.includes('featured'));
      const half = Math.ceil(filtered.length / 2);

      setTopRowProducts(filtered.slice(0, half));
      setBottomRowProducts(filtered.slice(half));
    }

    loadProducts();
  }, []);

  useEffect(() => {
    if (topSwiper && bottomSwiper) {
      topSwiper.controller.control = bottomSwiper;
      bottomSwiper.controller.control = topSwiper;
    }
  }, [topSwiper, bottomSwiper]);

  return (
    <section className="FeaturedProducts">
      <span>Wonderful gift</span>
      <h2>Featured Products</h2>
      {/* Top row swiper */}
      <Swiper
        modules={[Controller, Pagination]}
        onSwiper={setTopSwiper}
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={1}
        grabCursor={true}
        pagination={{ el: '#featured-pagination', clickable: true }}
      >
        {topRowProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <Product product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom row swiper */}
      <Swiper
        modules={[Controller]}
        onSwiper={setBottomSwiper}
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={1}
        grabCursor={true}
      >
        {bottomRowProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <Product product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination container under both rows */}
      <div
        className="custom-pagination"
        id="featured-pagination"
      />
    </section>
  );
}

export default FeaturedProducts;
