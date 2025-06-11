import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';

import './styles/styles.scss';
import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';
import useDocumentTitle from './hooks/useDocumentTitle';
import useScrollTop from './hooks/useScrollTop';
import { getUser } from './api/usersapi';
import { getToken } from './api/usersapi';

import { useUserData } from './Context/UserContext';

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
  const { loggedIn, setLoggedIn, setCart, cart, setUserData } = useUserData();
  const navigate = useNavigate();

  const initializeGuestCart = () => {
    const guestCart = localStorage.getItem('guestCart');
    if (!guestCart) {
      localStorage.setItem('guestCart', JSON.stringify([]));
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = getToken();
        if (!token) {
          setLoggedIn(false);
          initializeGuestCart();
          const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
          setCart(guestCart);
          setUserData(null);
          return;
        }
        const res = await getUser(token);
        if (res.data) {
          setUserData(res.data); // <-- Set user data here
          setCart(res.data.cart);
          setLoggedIn(true);
        } else {
          setUserData(null);
          setLoggedIn(false);
          initializeGuestCart();
          const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
          setCart(guestCart);
        }
      } catch (error) {
        console.error(error);
        setUserData(null);
        setLoggedIn(false);
        initializeGuestCart();
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        setCart(guestCart);
      }
    };
    getUserInfo();
  }, [navigate, setLoggedIn, setCart, setUserData]);
  useEffect(() => {
    if (!loggedIn) {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
  }, [cart, loggedIn]);

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
            element={<SinglePage loggedIn={loggedIn} />}
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
              loggedIn ? (
                <Navigate
                  to="/"
                  replace
                />
              ) : (
                <Login loggedIn={loggedIn} />
              )
            }
          />
          <Route
            path="/register"
            element={
              loggedIn ? (
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
