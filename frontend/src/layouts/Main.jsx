import React from 'react';
import ScrollToTop from '../components/ScrollToTop';

function Main(props) {
  return (
    <main>
      {props.children}
      <ScrollToTop />
    </main>
  );
}

export default Main;
