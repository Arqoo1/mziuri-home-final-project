import React from 'react';

function ContactUs() {
  return (
    <section className="our-contactinfo">
      <div className="info-container">
        <i class="fa-solid fa-location-dot"></i>
        <h5>Our Location</h5>
        <p>(800) 123 456 789 / (800) 123 456 789</p>
        <p>info@example.com</p>
      </div>
      <div className="info-container">
        <i class="fa-solid fa-mobile-screen"></i> <h5>Contact us Anytime</h5>
        <p>Mobile: 012 345 678</p>
        <p>Fax: 123 456 789</p>
      </div>
      <div className="info-container">
        <i class="fa-solid fa-envelope"></i> <h5>Support Overall</h5>
        <p>Support24/7@example.com</p>
        <p>info@example.com</p>
      </div>
    </section>
  );
}

export default ContactUs;
