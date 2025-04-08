import React, { useState, useEffect } from 'react';
import slide1 from '../assets/slider1.webp';
import slide2 from '../assets/slider2.webp';

const slides = [
  {
    image: slide1,
    title: 'Welcome to Our Shop',
    description: 'Lorem ipsum dolor sit amet, pri autem nemore bonorum te. Autem fierent ullamcorper ius no, nec ea quodsi invenire. '
  },
  {
    image: slide2,
    title: 'New Arrivals',
    description: 'Lorem ipsum dolor sit amet, pri autem nemore bonorum te. Autem fierent ullamcorper ius no, nec ea quodsi invenire. '
  }
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-slide">
        <img src={slides[currentIndex].image} alt={`Slide ${currentIndex + 1}`} />
        <div className="carousel-text">
          <p className='bla'>TOP TREND</p>
          <h2>{slides[currentIndex].title}</h2>
          <p>{slides[currentIndex].description}</p>
        </div>

        {/* Left Arrow */}
        <button className="arrow left" onClick={prevSlide}>
          <i className="fa fa-chevron-left"></i>
        </button>

        {/* Right Arrow */}
        <button className="arrow right" onClick={nextSlide}>
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