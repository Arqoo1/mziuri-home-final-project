import React, { useState, useEffect } from 'react';
import slides from '../data/slidesData.js';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const handleNavigate = () => {
    navigate('/shop');
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  const currentSlide = slides[currentIndex];

  return (
    <div className="carousel">
      <div className="carousel-slide">
        <img
          src={currentSlide.image}
          alt={`Slide ${currentIndex + 1}`}
        />
        <div className="carousel-text">
          <p className={`sliderText${currentIndex + 1}`}>{t(currentSlide.header)}</p>
          <h2>{t(currentSlide.title)}</h2>
          <p>{t(currentSlide.description)}</p>
          <Button
            text={t('shopNow')}
            className={`btn${currentIndex + 1}`}
            onClick={handleNavigate}
          />
        </div>

        <button
          className="arrow left"
          onClick={prevSlide}
        >
          <i className="fa fa-chevron-left"></i>
        </button>

        <button
          className="arrow right"
          onClick={nextSlide}
        >
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>

      <div className="carousel-controls">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
