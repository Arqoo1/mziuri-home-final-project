import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../Context/CurrencyContext';
import { useUserData } from '../Context/UserContext';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const { cart } = useUserData();

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCurrencyChange = (e) => {
    changeCurrency(e.target.value);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
          />
        </Link>
        <nav>
          <Link to="/">{t('home')}</Link>
          <Link to="/shop">{t('shop')}</Link>
          <Link to="/about">{t('about')}</Link>
          <Link to="/contact">{t('contact')}</Link>
          <Link to="/compare">{t('compare')}</Link>
          <Link to="/login">{t('login')}</Link>
        </nav>

        <div className="icons">
          <i
            className="fa fa-search"
            onClick={() => setShowSearch((prev) => !prev)}
          ></i>
          <Link
            to="/cart"
            className="cart-icon-link"
          >
            <i className="fa fa-shopping-cart">
              <div className="cart-div">{cart.length}</div>
            </i>
          </Link>
          <i
            className="fa fa-bars"
            onClick={() => setMenuOpen((prev) => !prev)}
          ></i>
        </div>
      </header>

      {menuOpen && (
        <div className="burger-menu-wrapper">
          {/* Only shown in mobile */}
          <div className="burger-nav">
            <Link to="/">{t('home')}</Link>
            <Link to="/shop">{t('shop')}</Link>
            <Link to="/about">{t('about')}</Link>
            <Link to="/contact">{t('contact')}</Link>
            <Link to="/compare">{t('compare')}</Link>
            <Link to="/login">{t('login')}</Link>
          </div>

          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
          >
            <option value="en">English</option>
            <option value="ka">Georgian</option>
          </select>

          <select
            onChange={handleCurrencyChange}
            value={currency}
          >
            <option value="USD">USD</option>
            <option value="GEL">GEL</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      )}

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
