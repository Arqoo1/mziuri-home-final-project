import React, { useEffect, useState } from 'react';
import { fetchReviews } from '../api/reviewapi';
import useReviewCarousel from '../hooks/useCarouselDrag';

function ClientReviewCarousel() {
  const [reviews, setReviews] = useState([]);

  const {
    isDragging,
    currentTranslate,
    onDragStart,
    onDragMove,
    onDragEnd,
    next,
    prev,
    containerRef,
  } = useReviewCarousel(reviews.length, '.review-card', 1);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const fetched = await fetchReviews();
        setReviews(fetched);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    getReviews();
  }, []);

  if (reviews.length === 0) {
    return <div className="client-review-carousel loading">Loading reviews...</div>;
  }

  return (
    <section className="client-review-carousel">
      <div
        className="review-card-container"
        ref={containerRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
        style={{
          transform: `translateX(${currentTranslate}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        {reviews.map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className={`review-card`}
          >
            <span>We Love Our Clients</span>
            <h2>What They're Saying</h2>
            <img
              src={slide.image}
              alt="Client review"
            />
            <p>{slide.review}</p>
            <h4>
              <span>{slide.clientName}</span>
            </h4>
          </div>
        ))}
      </div>

      <button
        className="arrow left"
        onClick={prev}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <button
        className="arrow right"
        onClick={next}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </section>
  );
}

export default ClientReviewCarousel;
