import React, { useEffect, useState, useRef } from 'react';
import { fetchReviews } from '../api/reviewapi';
import useReviewCarousel from '../hooks/useCarouselDrag';

function ClientReviewCarousel() {
  const [reviews, setReviews] = useState([]);
  const containerRef = useRef(null);
  const {
    currentIndex,
    isDragging,
    currentTranslate,
    onDragStart,
    onDragMove,
    onDragEnd,
    next,
    prev,
  } = useReviewCarousel(reviews.length);

  // Keep your data fetching logic
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

  // Calculate adjacent slides
  const getVisibleSlides = () => {
    const slides = [];
    const totalSlides = reviews.length;

    if (totalSlides === 0) return slides;

    // Previous slide
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    slides.push({ ...reviews[prevIndex], position: 'left' });

    // Current slide
    slides.push({ ...reviews[currentIndex], position: 'center' });

    // Next slide
    const nextIndex = (currentIndex + 1) % totalSlides;
    slides.push({ ...reviews[nextIndex], position: 'right' });

    return slides;
  };
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
          transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        {getVisibleSlides().map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className={`review-card ${slide.position}`}
          >
            {slide.position === 'center' && (
              <>
                <span>We Love Our Clients</span>
                <h2>What They're Saying</h2>
              </>
            )}
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
