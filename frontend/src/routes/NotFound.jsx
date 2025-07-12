import React from 'react';
import RouteBanner from '../components/RouteBanner';

function NotFound() {
  return (
    <>
      <RouteBanner page={'NotFound'} />

      <div className="notfound">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </>
  );
}

export default NotFound;
