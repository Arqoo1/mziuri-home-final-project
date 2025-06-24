import React from 'react';
import { useTranslation } from 'react-i18next';

function ContactUs() {
  const { t } = useTranslation();

  return (
    <section className="our-contactinfo">
      <div className="info-container">
        <i className="fa-solid fa-location-dot"></i>
        <h5>{t('ourLocation')}</h5>
        <p>{t('phonePrimary')}</p>
        <p>{t('emailPrimary')}</p>
      </div>
      <div className="info-container">
        <i className="fa-solid fa-mobile-screen"></i>
        <h5>{t('contactUsAnytime')}</h5>
        <p>{t('mobile')}</p>
        <p>{t('fax')}</p>
      </div>
      <div className="info-container">
        <i className="fa-solid fa-envelope"></i>
        <h5>{t('supportOverall')}</h5>
        <p>{t('supportEmail')}</p>
        <p>{t('emailPrimary')}</p>
      </div>
    </section>
  );
}

export default ContactUs;
