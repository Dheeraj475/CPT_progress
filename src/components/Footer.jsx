import React from 'react';
import '../assets/Footer.css'; // Create this CSS file

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-links">
        <div>
          <h4>HOW CAN WE HELP?</h4>
          <ul>
            <li>Delivery</li>
            <li>Returns</li>
            <li>Sample Service</li>
          </ul>
        </div>
        <div>
          <h4>CORPORATE</h4>
          <ul>
            <li>Our Heritage</li>
            <li>Public Relation Contacts</li>
            <li>Our Sustainability Pledge</li>
            <li>Privacy & Legal</li>
          </ul>
        </div>
        <div>
          <h4>USEFUL LINKS</h4>
          <ul>
            <li>Loving Home Magazine</li>
            <li>Wallpaper</li>
            <li>Paint</li>
            <li>Curtains</li>
            <li>Blinds</li>
            <li>Bed Linen</li>
          </ul>
        </div>
        <div className="newsletter">
          <h4>Sign up to Our Newsletter</h4>
          <input type="email" placeholder="Enter the email here" />
          <button>SUBSCRIBE</button>
          <p>By signing up you are consenting to receive...</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© GRAHAM AND BROWN LTD. 2025</p>
        <div className="social-icons">
          {/* Replace these with your social media icon components or SVGs */}
          <span>F</span><span>X</span><span>IG</span><span>YT</span><span>P</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
