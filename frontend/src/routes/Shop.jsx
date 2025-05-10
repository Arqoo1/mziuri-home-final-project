import React from 'react';
import RouteBanner from '../components/RouteBanner';
import ProductList from '../components/ProductList';

function Shop() {
  return (
    <>
      <RouteBanner page="SHOP" />
      <ProductList />
    </>
  );
}

export default Shop;
