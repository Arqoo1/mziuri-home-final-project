import React from 'react';
import { Link } from 'react-router-dom';

function RouteBanner({ page }) {
  return (
    <section className="route-banner">
      <h3>
        <Link to="/">Home</Link>
        <i className="fas fa-angle-right mx-2"></i>
        <span>{page}</span>
      </h3>
    </section>
  );
}

export default RouteBanner;
