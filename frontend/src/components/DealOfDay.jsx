import React, { useEffect, useState } from 'react';
import useCountdown from '../hooks/useCountdown';
import Product from './Product';
import { fetchProductData } from '../api/productapi';
import useReviewCarousel from '../hooks/useCarouselDrag';

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

  const { currentIndex, currentTranslate, containerRef, onDragStart, onDragMove, onDragEnd } =
    useReviewCarousel(saleProducts.length - 3, '.product-wrapper', 3);

  return (
    <>
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

        <div
          className="deal-of-day-products"
          ref={containerRef}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
          style={{
            display: 'flex',
            gap: '1rem',
            transform: `translateX(${currentTranslate}px)`,
            transition: 'transform 0.3s ease',
            cursor: 'grab',
          }}
        >
          {saleProducts.map((product) => (
            <div
              key={product._id}
              className="product-wrapper"
              style={{ flex: '0 0 33.333%' }}
            >
              <Product product={product} />
            </div>
          ))}
        </div>

        <div className="carousel-controls">
          {Array.from({ length: Math.ceil(saleProducts.length / 3) }, (_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                const slideWidth = containerRef.current?.offsetWidth / 3;
                containerRef.current.scrollTo({
                  left: index * slideWidth * 3,
                  behavior: 'smooth',
                });
              }}
              style={{
                width: '10px',
                height: '10px',
                margin: '0 5px',
                borderRadius: '50%',
                backgroundColor: index === currentIndex ? '#000' : '#ccc',
                border: 'none',
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default DealOfDay;
