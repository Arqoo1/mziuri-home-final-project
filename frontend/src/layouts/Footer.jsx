import React from "react";
import logo from "../assets/logo-footer.webp";
function Footer() {
  return (
    <footer>
      <section className="infoContainer">
        <div className="detailsContainer logoContainer">
          <img src={logo} alt="Logo" className="logoFooter" />
          <p>
            Lorem Khaled Ipsum is a major key to success. To be successful
            you’ve got to work hard you’ve got to make it.
          </p>
          <div className="socialLinkContainer">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-linkedin-in"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-vimeo-v"></i>
          </div>
        </div>
        <div className="detailsContainer">
          <h2>Information</h2>
          <ul className="footerList">
            <li>Our Company</li>
            <li>Contact Us</li>
            <li>Our Services</li>
            <li>Why We?</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="detailsContainer">
          <h2>Quicklink</h2>
          <ul className="footerList">
            <li>About</li>
            <li>Blog</li>
            <li>Shop</li>
            <li>Cart</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="detailsContainer">
          <h2>Support</h2>
          <ul className="footerList">
            <li>Online Support</li>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className="detailsContainer">
          <h2>See Information</h2>
          <ul className="footerList">
            <li>123, ABC, Road ##, Main City, Your</li>
            <li>address goes here.</li>
            <li>Phone: 01234 567 890</li>
            <li>Email: https://example.com</li>
          </ul>
        </div>
      </section>
      <section className="copyright">
        <p>
          {" "}
          <span> © 2023 </span>- All rights reserved |
        </p>
        <p>
          <strong> Developed by </strong> <span> Giorgi Arkania </span>
        </p>
      </section>
    </footer>
  );
}

export default Footer;
