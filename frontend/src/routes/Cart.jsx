import React from 'react';
import RouteBanner from '../components/RouteBanner';
import CartTable from '../components/CartTable';
function Cart() {
  return (
    <>
      <RouteBanner page="Cart" />
      <section className="ProductTable">
        <CartTable />
      </section>
    </>
  );
}

export default Cart;
