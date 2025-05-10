import React from 'react';
import RouteBanner from '../components/RouteBanner';
import AboutOutFlower from '../components/AboutOutFlower';
import ImageCarousel from '../components/ImageCarousel';
function About() {
  return (
    <>
      <RouteBanner page="ABOUT" />
      <AboutOutFlower />
      <ImageCarousel />
    </>
  );
}

export default About;
