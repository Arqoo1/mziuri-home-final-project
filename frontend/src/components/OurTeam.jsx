import React from 'react';
import { useTranslation } from 'react-i18next';
import teammember1 from '../assets/teammember1.webp';
import teammember2 from '../assets/teammember2.webp';
import teammember3 from '../assets/teammember3.webp';

function OurTeam() {
  const { t } = useTranslation();

  return (
    <section className="OurTeam">
      <span>{t('team.subtitle')}</span>
      <h2>{t('team.title')}</h2>
      <div className="team-members">
        <div className="member">
          <img
            src={teammember1}
            alt="Team Member 1"
          />
          <div className="memberInfo">
            <h3>John Doe</h3>
            <p>{t('team.roles.marketing')}</p>
          </div>
        </div>
        <div className="member">
          <img
            src={teammember2}
            alt="Team Member 2"
          />
          <div className="memberInfo">
            <h3>Jane Smith</h3>
            <p>{t('team.roles.ceo')}</p>
          </div>
        </div>
        <div className="member">
          <img
            src={teammember3}
            alt="Team Member 3"
          />
          <div className="memberInfo">
            <h3>Emily Johnson</h3>
            <p>{t('team.roles.financial')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurTeam;
