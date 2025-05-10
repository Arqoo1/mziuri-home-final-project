import React from 'react';
import teammember1 from '../assets/teammember1.webp';
import teammember2 from '../assets/teammember2.webp';
import teammember3 from '../assets/teammember3.webp';

function OurTeam() {
  return (
    <section className="OurTeam">
      <span>The guys behind the curtains</span>
      <h2>A Team Of Highly-Skilled Experts</h2>
      <div className="team-members">
        <div className="member">
          <img
            src={teammember1}
            alt="Team Member 1"
          />
          <div className="memberInfo">
            <h3>John Doe</h3>
            <p>Marketing</p>
          </div>
        </div>
        <div className="member">
          <img
            src={teammember2}
            alt="Team Member 2"
          />
          <div className="memberInfo">
            <h3>Jane Smith</h3>
            <p>President & CEO</p>
          </div>
        </div>
        <div className="member">
          <img
            src={teammember3}
            alt="Team Member 3"
          />
          <div className="memberInfo">
            <h3>Emily Johnson</h3>
            <p>Financial Services</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurTeam;
