import React, { useEffect, useState } from 'react';
import useCountdown from '../hooks/useCountdown';
import Product from './Product';
import { fetchProductData } from '../api/productapi';
import SwiperCarousel from './SwiperCarousel';
import { useTranslation } from 'react-i18next';

function DealOfDay() {
  const { days, hours, minutes, seconds } = useCountdown(24 * 60 * 60 * 1000);
  const [saleProducts, setSaleProducts] = useState([]);
  const { t, i18n } = useTranslation();

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
      <h2>{t('deal_of_the_day')}</h2>

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
        spaceBetween={20}
        loop={saleProducts.length > 3}
        prevBtnClass=""
        nextBtnClass=""
        effect="fade"
        renderSlide={(product) => <Product product={product} />}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
        }}
      />
    </section>
  );
}

export default DealOfDay;
