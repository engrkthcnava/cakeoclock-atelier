import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* Column 1: Brand Manifesto */}
        <div className="footer-col brand-col">
          <h3 className="footer-heading">Bean 'n Bite</h3>
          <p className="footer-description">
            Honouring the art of baking by giving life to novel creations since its inception. 
            Experience the natural goodness and baking artistry.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col links-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </div>

        {/* Column 3: Connect With Us */}
        <div className="footer-col connect-col">
          <h3 className="footer-heading">Connect With Us</h3>
          <div className="connect-details">
            <p className="contact-info">Email: nicoletteirishsalac127@gmail.com</p>
            <p className="contact-info">Baking Dispatch: Wed — Sun | 9 AM - 5 PM</p>
            
            {/* Clickable Social Tiles built matching Bean 'n Bite tones */}
            <div className="social-icons">
              <a 
                href="https://www.facebook.com/nicoletteirish.avilessalac" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-box-link"
              >
                <div className="social-box">FB</div>
              </a>
              <a 
                href="https://www.instagram.com/beannbite.ph" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-box-link"
              >
                <div className="social-box">IG</div>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Centered Bottom Copyright Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bean 'n Bite Philippines. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;