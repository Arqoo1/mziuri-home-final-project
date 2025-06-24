import React, { useEffect, useState } from 'react';
import { fetchProductData } from '../api/productapi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Product from './Product';
import { useTranslation } from 'react-i18next';

function FeaturedProducts() {
  const { t } = useTranslation();
  const [topRowProducts, setTopRowProducts] = useState([]);
  const [bottomRowProducts, setBottomRowProducts] = useState([]);
  const [topSwiper, setTopSwiper] = useState(null);
  const [bottomSwiper, setBottomSwiper] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      const products = await fetchProductData();
      const filtered = products.filter((p) =>
        p.tags?.some((tag) => tag.en.toLowerCase() === 'featured')
      );
      console.log('Filtered featured products:', filtered);
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
      <span>{t('wonderful_gift')}</span>
      <h2>{t('featured_products')}</h2>

      <Swiper
        modules={[Controller, Pagination]}
        onSwiper={setTopSwiper}
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={1}
        grabCursor={true}
        pagination={{ el: '#featured-pagination', clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1240: { slidesPerView: 4 },
        }}
      >
        {topRowProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <Product product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Controller]}
        onSwiper={setBottomSwiper}
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={1}
        grabCursor={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1240: { slidesPerView: 4 },
        }}
      >
        {bottomRowProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <Product product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="custom-pagination"
        id="featured-pagination"
      />
    </section>
  );
}

export default FeaturedProducts;
