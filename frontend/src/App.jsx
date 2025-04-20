import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/styles.scss";

import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Footer from "./layouts/Footer";
import { TitleUpdater } from "./utils/setTitle";

import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Shop from "./routes/Shop";
import Cart from "./routes/Cart";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import Wishlist from "./routes/Wishlist";
import Checkout from "./routes/Checkout";
import Compare from "./routes/Compare";
import Blog from "./routes/Blog";
import NotFound from "./routes/NotFound";
import SinglePage from "./routes/SinglePage";

function App() {
  return (
    <Router>
      <Header />
      <Main>
        <TitleUpdater />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<SinglePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
      <Footer />
    </Router>
  );
}

export default App;
