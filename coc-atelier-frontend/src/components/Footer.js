import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* Column 1: Brand Manifesto */}
        <div className="footer-col brand-col">
          <h3 className="footer-heading-brand">Cake o' Clock Atelier</h3>
          <p className="footer-description">
            Showcasing a curated selection of premium homemade desserts, signature heritage recipes, 
            and exclusive limited product drops. Experience sweet curation at its finest.
          </p>
        </div>

        {/* Column 2: Quick Navigation Links */}
        <div className="footer-col links-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </div>

        {/* Column 3: Atelier Operations (Replaces old social tiles) */}
        <div className="footer-col operations-col">
          <h3 className="footer-heading">Atelier Operations</h3>
          <div className="operations-details">
            <div className="info-row">
              <span className="info-icon">📍</span>
              <p>Antipolo, Calabarzon, Philippines</p>
            </div>
            <div className="info-row">
              <span className="info-icon">✉️</span>
              <p>hello@cakeoclockatelier.ph</p>
            </div>
            <div className="info-row">
              <span className="info-icon">⏰</span>
              <p>Baking Dispatch: Wed — Sun | 9 AM - 5 PM</p>
            </div>
          </div>
        </div>

      </div>

      {/* Modern Centered Copyright Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Cake o' Clock Atelier. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;