import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import './styles/styles.scss';
import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';
import useDocumentTitle from './hooks/useDocumentTitle';
import useScrollTop from './hooks/useScrollTop';

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
  ForgotPassword,
  ResetPassword,
} from './routes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('token')));

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.removeItem('guestCart');
    }
  }, [isAuthenticated]);
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = Boolean(localStorage.getItem('token'));
      setIsAuthenticated(authStatus);
      if (authStatus) {
        localStorage.removeItem('guestCart');
      }
    };

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  //   if (
  //   !isAuthenticated &&
  //   !["/login", "/register"].includes(location.pathname)
  // ) {
  //   return <Navigate to="/login" replace />;
  // }

  useDocumentTitle();
  useScrollTop();
  return (
    <div className="app">
      <Header />
      <Main>
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
            element={<SinglePage isAuthenticated={isAuthenticated} />}
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
            element={
              isAuthenticated ? (
                <Navigate
                  to="/"
                  replace
                />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate
                  to="/"
                  replace
                />
              ) : (
                <Register />
              )
            }
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
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
