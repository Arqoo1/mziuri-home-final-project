import React, { useState } from 'react';
import useReviewCarousel from '../hooks/useCarouselDrag';
import imgslider1 from '../assets/imgslider1.webp';
import imgslider2 from '../assets/imgslider2.webp';
import imgslider3 from '../assets/imgslider3.webp';
import imgslider4 from '../assets/imgslider4.webp';
import imgslider5 from '../assets/imgslider5.webp';

const images = [
  imgslider1,
  imgslider2,
  imgslider3,
  imgslider4,
  imgslider5,
  imgslider1,
  imgslider2,
  imgslider3,
  imgslider4,
  imgslider5,
];

const ImageCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const {
    currentTranslate,
    isDragging,
    containerRef,
    onDragStart,
    onDragMove,
    onDragEnd,
    next,
    prev,
  } = useReviewCarousel(images.length - 3, '.carousel-slide', 4);

  return (
    <div
      className="Imagecarousel"
      ref={containerRef}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onTouchStart={onDragStart}
      onTouchMove={onDragMove}
      onTouchEnd={onDragEnd}
    >
      <div
        className="carousel-track"
        style={{
          transform: `translateX(${currentTranslate}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
        }}
      >
        {images.map((src, i) => (
          <div
            className={`carousel-slide ${
              hoveredIndex !== null && hoveredIndex !== i ? 'blurred' : ''
            }`}
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onTouchStart={() => setHoveredIndex(i)}
            onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 500)}
          >
            <img
              src={src}
              alt={`Slide ${i}`}
              draggable="false"
            />
          </div>
        ))}
      </div>

      <button
        className="carousel-btn prev"
        onClick={prev}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <button
        className="carousel-btn next"
        onClick={next}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default ImageCarousel;
