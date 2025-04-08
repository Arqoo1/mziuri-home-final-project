import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/styles.scss';

import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';
import setTitleFromPath from "./utils/setTitle";

import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Shop from './routes/Shop';
import Cart from './routes/Cart';
import NotFound from './routes/NotFound';

function App() {
  useEffect(() => {
    setTitleFromPath();
  }, []);

  return (
    <Router>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
      <Footer />
    </Router>
  );
}

export default App;
