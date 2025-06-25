import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo-footer.webp';
import { Link } from 'react-router-dom';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <section className="infoContainer">
        <div className="detailsContainer logoContainer">
          <img
            src={logo}
            alt={t('footer.logoAlt')}
            className="logoFooter"
          />
          <p>{t('footer.description')}</p>
          <div className="socialLinkContainer">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-linkedin-in"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-vimeo-v"></i>
          </div>
        </div>

        <div className="detailsContainer">
          <h2>{t('footer.information')}</h2>
          <ul className="footerList">
            <li>{t('footer.ourCompany')}</li>
            <li>{t('footer.contactUs')}</li>
            <li>{t('footer.ourServices')}</li>
            <li>{t('footer.whyWe')}</li>
            <li>{t('footer.careers')}</li>
          </ul>
        </div>

        <div className="detailsContainer">
          <h2>{t('footer.quicklink')}</h2>
          <ul className="footerList">
            <li>
              <Link to="/about">{t('footer.about')}</Link>
            </li>
            <li>
              <Link to="/shop">{t('footer.shop')}</Link>
            </li>
            <li>
              <Link to="/cart">{t('footer.cart')}</Link>
            </li>
            <li>
              <Link to="/contact">{t('footer.contact')}</Link>
            </li>
          </ul>
        </div>

        <div className="detailsContainer">
          <h2>{t('footer.support')}</h2>
          <ul className="footerList">
            <li>{t('footer.onlineSupport')}</li>
            <li>{t('footer.shippingPolicy')}</li>
            <li>{t('footer.returnPolicy')}</li>
            <li>{t('footer.privacyPolicy')}</li>
            <li>{t('footer.termsOfService')}</li>
          </ul>
        </div>

        <div className="detailsContainer">
          <h2>{t('footer.seeInformation')}</h2>
          <ul className="footerList">
            <li>{t('footer.addressLine1')}</li>
            <li>{t('footer.addressLine2')}</li>
            <li>{t('footer.phone')}</li>
            <li>{t('footer.email')}</li>
          </ul>
        </div>
      </section>

      <section className="copyright">
        <p>
          <span>© 2025</span> - {t('footer.allRightsReserved')}
        </p>
        <p>
          <strong>{t('footer.developedBy')}</strong> <span>{t('footer.developerName')}</span>
        </p>
      </section>
    </footer>
  );
}

export default Footer;
