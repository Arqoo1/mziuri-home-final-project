import React from 'react';
import SwiperCarousel from './SwiperCarousel';

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
  const renderSlide = (src, index, hoveredIndex, setHoveredIndex) => (
    <div
      className={`carousel-slide ${
        hoveredIndex !== null && hoveredIndex !== index ? 'blurred' : ''
      }`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onTouchStart={() => setHoveredIndex(index)}
      onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 500)}
      key={index}
    >
      <img
        src={src}
        alt={`Slide ${index}`}
        draggable="false"
      />
    </div>
  );

  return (
    <div className="image-carousel-wrapper">
      <SwiperCarousel
        items={images}
        renderSlide={renderSlide}
        slidesPerView={4}
        loop={true}
        prevBtnClass="carousel-btn prev"
        nextBtnClass="carousel-btn next"
      />
    </div>
  );
};

export default ImageCarousel;
