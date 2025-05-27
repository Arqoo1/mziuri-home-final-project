import React from 'react';
import { useTranslation } from 'react-i18next';

function OurHistory() {
  const { t } = useTranslation();

  return (
    <section className="our-history">
      <span>{t('A_little_story')}</span>
      <h2>{t('Our_History')}</h2>
      <p className="history-text">{t('OurHistory1')}</p>
      <p>{t('OurHistory2')}</p>
    </section>
  );
}

export default OurHistory;
