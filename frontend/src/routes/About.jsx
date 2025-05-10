import React from 'react';
import RouteBanner from '../components/RouteBanner';
import AboutOutFlower from '../components/AboutOutFlower';
import ImageCarousel from '../components/ImageCarousel';
import OurHistory from '../components/OurHistory';
import OurTeam from '../components/OurTeam';
function About() {
  return (
    <>
      <RouteBanner page="About" />
      <AboutOutFlower />
      <OurHistory />
      <OurTeam />
      <ImageCarousel />
    </>
  );
}

export default About;
