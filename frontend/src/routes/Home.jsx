import React, { useEffect, useState } from "react";
import { useLoader } from '../hooks/useLoader'

import Carousel from '../components/Carousel'

function Home() {
  const { useFakeLoader } = useLoader()
  useEffect(() => useFakeLoader(), [])

  return (
    <>
      <Carousel/>
    </>
  )
}

export default Home
