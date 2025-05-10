import React from 'react';
import banner1 from '../assets/banner-img1.webp';
import banner2 from '../assets/banner-img2.webp';

function AboutOutFlower() {
  return (
    <section>
      <section className="gift-flowers">
        <div className="description">
          <span>Flowers for the</span>
          <h3>Birthday & Gifts</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <button>Shop Collection</button>
        </div>
        <div className="banner">
          <img
            src={banner1}
            alt="banner"
          />
        </div>
      </section>
      <section className="gift-flowers">
        <div className="banner">
          <img
            src={banner2}
            alt="banner"
          />
        </div>
        <div className="description">
          <span>Flowers for the</span>
          <h3>Wedding day</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <button>Shop Collection</button>
        </div>
      </section>
    </section>
  );
}

export default AboutOutFlower;
