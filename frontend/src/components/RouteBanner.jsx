import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function RouteBanner({ page }) {
  const { t } = useTranslation();

  const translatedPage = t(page.toLowerCase()) || page;

  return (
    <section className="route-banner">
      <h2>{translatedPage}</h2>
      <h3>
        <Link to="/">{t('home')}</Link>
        <i className="fas fa-angle-right mx-2"></i>
        <span>{translatedPage}</span>
      </h3>
    </section>
  );
}

export default RouteBanner;
