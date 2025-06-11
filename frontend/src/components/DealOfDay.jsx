import React, { useEffect, useState } from 'react';
import useCountdown from '../hooks/useCountdown';
import Product from './Product';
import { fetchProductData } from '../api/productapi';
import SwiperCarousel from './SwiperCarousel';

function DealOfDay() {
  const { days, hours, minutes, seconds } = useCountdown(24 * 60 * 60 * 1000);
  const [saleProducts, setSaleProducts] = useState([]);

  const formatNumber = (num) => String(num).padStart(2, '0');

  useEffect(() => {
    const Products = async () => {
      try {
        const products = await fetchProductData();
        const filtered = products.filter((product) => product.salePrice);
        setSaleProducts(filtered);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    Products();
  }, []);

  return (
    <section className="deal-of-day">
      <h3>Deal of The Day</h3>

      <div className="timer">
        {[
          { label: 'Days', value: formatNumber(days) },
          { label: 'Hours', value: formatNumber(hours) },
          { label: 'Minutes', value: formatNumber(minutes) },
          { label: 'Seconds', value: formatNumber(seconds) },
        ].map(({ label, value }) => (
          <div
            className="time-segment"
            key={label}
          >
            <span
              className="number"
              data-label={label}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <SwiperCarousel
        items={saleProducts}
        slidesPerView={3}
        spaceBetween={20}
        loop={saleProducts.length > 3}
        prevBtnClass=""
        nextBtnClass=""
        pagination={true}
        effect="fade"
        renderSlide={(product) => <Product product={product} />}
      />
    </section>
  );
}

export default DealOfDay;
