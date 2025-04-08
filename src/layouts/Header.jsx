import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';

function Header() {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="icons">
        <i className="fa fa-search"></i>
        <Link to="/cart"><i className="fa fa-shopping-cart"></i></Link>
        <i className="fa fa-bars"></i>
      </div>
    </header>
  );
}

export default Header;
