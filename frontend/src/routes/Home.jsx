import React, { useEffect, useState } from "react";
import { useLoader } from '../hooks/useLoader'

import Carousel from '../components/Carousel'
import CategoriesContainer from "../components/CategoriesContainer";

function Home() {
  const { useFakeLoader } = useLoader()
  useEffect(() => useFakeLoader(), [])

  return (
    <>
      <Carousel/>
      <CategoriesContainer/>
    </>
  )
}

export default Home
