import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const SwiperCarousel = ({
  items = [],
  renderSlide,
  slidesPerView = 4,
  loop = true,
  spaceBetween = 20,
  prevBtnClass = 'carousel-btn prev',
  nextBtnClass = 'carousel-btn next',
  wrapperClass = '',
  pagination = false, // new prop
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navigation =
    prevBtnClass && nextBtnClass
      ? {
          nextEl: `.${nextBtnClass.split(' ').join('.')}`,
          prevEl: `.${prevBtnClass.split(' ').join('.')}`,
        }
      : false;

  return (
    <div className={`Imagecarousel ${wrapperClass}`}>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={loop}
        className="carousel-track"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {renderSlide(item, index, hoveredIndex, setHoveredIndex)}
          </SwiperSlide>
        ))}
      </Swiper>

      {prevBtnClass && (
        <button className={prevBtnClass}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      )}
      {nextBtnClass && (
        <button className={nextBtnClass}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      )}
    </div>
  );
};

export default SwiperCarousel;
