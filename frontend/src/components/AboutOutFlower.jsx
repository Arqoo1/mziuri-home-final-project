import React from 'react';
import { useNavigate } from 'react-router-dom';
import banner1 from '../assets/banner-img1.webp';
import banner2 from '../assets/banner-img2.webp';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';

function AboutOutFlower() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/shop');
  };

  return (
    <section>
      <section className="gift-flowers">
        <div className="description">
          <span>{t('aboutpage.section1.subtitle')}</span>
          <h3>{t('aboutpage.section1.title')}</h3>
          <p>{t('aboutpage.section1.description')}</p>
          <Button text={t('aboutpage.section1.button')} onClick={handleNavigate} />
        </div>
        <div className="banner">
          <img src={banner1} alt="banner" />
        </div>
      </section>

      <section className="gift-flowers">
        <div className="banner">
          <img src={banner2} alt="banner" />
        </div>
        <div className="description">
          <span>{t('aboutpage.section2.subtitle')}</span>
          <h3>{t('aboutpage.section2.title')}</h3>
          <p>{t('aboutpage.section2.description')}</p>
          <Button className="btn1" text={t('aboutpage.section1.button')} onClick={handleNavigate} />
        </div>
      </section>
    </section>
  );
}

export default AboutOutFlower;
