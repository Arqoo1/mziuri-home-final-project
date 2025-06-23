import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../Context/CurrencyContext';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const { currency, changeCurrency } = useCurrency();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCurrencyChange = (e) => {
    changeCurrency(e.target.value);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <img
          src={logo}
          alt="Logo"
        />
        <nav>
          <Link to="/">{t('home')}</Link>
          <Link to="/shop">{t('shop')}</Link>
          <Link to="/about">{t('about')}</Link>
          {/* <Link to="/contact">{t('contact')}</Link>
          <Link to="/cart">{t('cart')}</Link>
          <Link to="/wishlist">{t('wishlist')}</Link>
          <Link to="/login">{t('login')}</Link> */}
        </nav>

        <select
          onChange={(e) => changeLanguage(e.target.value)}
          name=""
          id=""
          value={i18n.language}
        >
          <option value="en">English</option>
          <option value="ka">Georgia</option>
        </select>
        <div className="icons">
          <i
            className="fa fa-search"
            onClick={() => setShowSearch((prev) => !prev)}
          ></i>
          <i className="fa fa-shopping-cart"></i>
          <i className="fa fa-bars"></i>
          <select
            onChange={handleCurrencyChange}
            value={currency}
          >
            <option value="USD">USD</option>
            <option value="GEL">GEL</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </header>

      {showSearch && (
        <div className="search-bar-wrapper">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
          />
        </div>
      )}
    </>
  );
}

export default Header;
