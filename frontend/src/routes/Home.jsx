import React, { useEffect } from 'react';
import { useLoader } from '../hooks/useLoader';
import { useNavigate } from 'react-router-dom';

import Carousel from '../components/Carousel';
import CategoriesContainer from '../components/CategoriesContainer';
import ImageCarousel from '../components/ImageCarousel';
import ClientReviewCarousel from '../components/ClientReviewCarousel';
import OurHistory from '../components/OurHistory';
import DealOfDay from '../components/DealOfDay';
import FeaturedProducts from '../components/FeaturedProducts';

function Home() {
  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);

  return (
    <>
      <Carousel />
      <CategoriesContainer />
      <FeaturedProducts />
      <DealOfDay />
      <OurHistory />
      <ClientReviewCarousel />

      <ImageCarousel />
    </>
  );
}

export default Home;
