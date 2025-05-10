import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/styles.scss';
import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';
import { TitleUpdater } from './utils/setTitle';
import {
  Home,
  Shop,
  SinglePage,
  About,
  Contact,
  Login,
  Register,
  Profile,
  Wishlist,
  Cart,
  Checkout,
  Compare,
  Blog,
  NotFound,
} from './routes';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <Header />
      <Main>
        <TitleUpdater />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/shop"
            element={<Shop />}
          />
          <Route
            path="/shop/:id"
            element={<SinglePage />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/wishlist"
            element={<Wishlist />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/checkout"
            element={<Checkout />}
          />
          <Route
            path="/compare"
            element={<Compare />}
          />
          <Route
            path="/blog"
            element={<Blog />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Main>
      <Footer />
      <ScrollToTop />
    </Router>
  );
}

export default App;
