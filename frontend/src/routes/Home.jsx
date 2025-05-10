import React, { useEffect } from 'react';
import { useLoader } from '../hooks/useLoader';

import Carousel from '../components/Carousel';
import CategoriesContainer from '../components/CategoriesContainer';
import ImageCarousel from '../components/ImageCarousel';

function Home() {
  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);

  return (
    <>
      <Carousel />
      <CategoriesContainer />
      <ImageCarousel />
    </>
  );
}

export default Home;
