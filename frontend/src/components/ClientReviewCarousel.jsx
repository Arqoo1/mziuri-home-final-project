import React, { useEffect, useState } from 'react';
import { fetchReviews } from '../api/reviewapi';
import SwiperCarousel from './SwiperCarousel';
import { useTranslation } from 'react-i18next';

function ClientReviewCarousel() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getReviews = async () => {
      try {
        const fetched = await fetchReviews();
        setReviews(fetched);
      } catch (err) {
        setError('Failed to load reviews');
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, []);

  if (loading) {
    return <div className="client-review-carousel loading">Loading reviews...</div>;
  }

  if (error) {
    return <div className="client-review-carousel error">{error}</div>;
  }

  if (reviews.length === 0) {
    return <div className="client-review-carousel empty">No reviews found.</div>;
  }

  const renderSlide = (slide) => (
    <div
      className="review-card"
      key={slide.id || slide.clientName}
    >
      <span>{t('testimonials.title')}</span>
      <h2>{t('testimonials.subtitle')}</h2>
      <img
        src={slide.image}
        alt={`Review from ${slide.clientName}`}
      />
      <p>{typeof slide.review === 'object' ? slide.review[i18n.language] : slide.review}</p>
      <h4>
        <span>{slide.clientName}</span>
      </h4>
    </div>
  );

  return (
    <section className="client-review-carousel">
      <SwiperCarousel
        items={reviews}
        renderSlide={renderSlide}
        slidesPerView={1}
        loop={true}
        prevBtnClass="arrow left"
        nextBtnClass="arrow right"
        effect="fade"
      />
    </section>
  );
}

export default ClientReviewCarousel;
