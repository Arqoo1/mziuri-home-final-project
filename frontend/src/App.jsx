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
  const { loggedIn, setLoggedIn, setCart, cart, setUserData, wishlist, setWishlist } =
    useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = getToken();
        if (!token) {
          setLoggedIn(false);
          setUserData(null);
          setCart(JSON.parse(localStorage.getItem('guestCart') || '[]'));
          setWishlist(JSON.parse(localStorage.getItem('guestWishlist') || '[]'));
          return;
        }

        const res = await getUser(token);
        if (res) {
          setUserData(res);
          setCart(res.cart || []);
          setWishlist(res.wishlist || []);
          setLoggedIn(true);
          localStorage.removeItem('guestCart');
          localStorage.removeItem('guestWishlist');
        } else {
          // Token might be invalid or user not found
          setLoggedIn(false);
          setUserData(null);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error.message); // Only logs real issues
        setUserData(null);
        setLoggedIn(false);
        setCart(JSON.parse(localStorage.getItem('guestCart') || '[]'));
        setWishlist(JSON.parse(localStorage.getItem('guestWishlist') || '[]'));
      }
    };

    getUserInfo();
  }, [navigate, setLoggedIn, setCart, setWishlist, setUserData]);

  useEffect(() => {
    if (!loggedIn) {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
  }, [cart, loggedIn]);

  useEffect(() => {
    if (!loggedIn) {
      localStorage.setItem('guestWishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, loggedIn]);
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
