import React, { useState, useRef, useEffect } from 'react';
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
const VISIBLE_COUNT = 4;

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= images.length - VISIBLE_COUNT ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? images.length - VISIBLE_COUNT : prev - 1));
  };

  const slideWidth = () => {
    if (!carouselRef.current) return 0;
    return carouselRef.current.offsetWidth * 0.25;
  };

  const handleDragStart = (e) => {
    const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    setStartX(x);
    setIsDragging(true);
    setPrevTranslate(currentIndex * -slideWidth());
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const diff = x - startX;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -50) nextSlide();
    else if (movedBy > 50) prevSlide();
    setCurrentTranslate(currentIndex * -slideWidth());
  };

  useEffect(() => {
    setCurrentTranslate(currentIndex * -slideWidth());
  }, [currentIndex]);

  return (
    <div
      className="Imagecarousel"
      ref={carouselRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
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
        onClick={prevSlide}
      >
        <i class="fa-solid fa-arrow-left"></i>{' '}
      </button>
      <button
        className="carousel-btn next"
        onClick={nextSlide}
      >
        <i class="fa-solid fa-arrow-right"></i>{' '}
      </button>
    </div>
  );
};

export default ImageCarousel;
