import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <>
      <header className="header">
        <img src={logo} alt="Logo" />
        <nav>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="icons">
          <i
            className="fa fa-search"
            onClick={() => setShowSearch((prev) => !prev)}
          ></i>
          <Link to="/cart">
            <i className="fa fa-shopping-cart"></i>
          </Link>
          <i className="fa fa-bars"></i>
        </div>
      </header>

        {showSearch && (
          <input
            ref={inputRef}
            type="text"
            className="search-bar"
            placeholder="Search..."
          />
        )}
    </>
  );
}

export default Header;
