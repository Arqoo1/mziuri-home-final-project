import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
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
          <i className="fa fa-shopping-cart"></i>
          <i className="fa fa-bars"></i>
        </div>
      </header>

      {showSearch && (
        <div className="search-bar-wrapper">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
      )}
    </>
  );
}

export default Header;
