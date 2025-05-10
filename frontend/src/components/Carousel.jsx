import React, { useState, useEffect } from 'react';
import slide1 from '../assets/slider1.webp';
import slide2 from '../assets/slider2.webp';

const slides = [
  {
    image: slide1,
    header: 'TOP TREND',
    title: '2022 Flower Trends',
    description:
      'Lorem ipsum dolor sit amet, pri autem nemore bonorum te. Autem fierent ullamcorper ius no, nec ea quodsi invenire. ',
  },
  {
    image: slide2,
    header: 'COLLECTION',
    title: 'Flowers and Candle Birthday Gift',
    description:
      'Lorem ipsum dolor sit amet, pri autem nemore bonorum te. Autem fierent ullamcorper ius no, nec ea quodsi invenire. ',
  },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-slide">
        <img
          src={slides[currentIndex].image}
          alt={`Slide ${currentIndex + 1}`}
        />
        <div className="carousel-text">
          <p className={`sliderText${currentIndex + 1}`}>{slides[currentIndex].header}</p>
          <h2>{slides[currentIndex].title}</h2>
          <p>{slides[currentIndex].description}</p>
          <button className={`sliderBtn${currentIndex + 1}`}>Shop Now</button>
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
