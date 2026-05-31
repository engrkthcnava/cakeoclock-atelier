import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../images/cakeoclock_logo.png'; 

function Navbar({ onOrderClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // NEW: State mechanism tracking mobile menu window expansion toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOrderClick = () => {
    setIsMobileMenuOpen(false); // Close dropdown if opened on mobile
    if (location.pathname !== '/') {
      navigate('/');
    }
    onOrderClick();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link" onClick={() => setIsMobileMenuOpen(false)}>
        <img src={logo} alt="Cake o' Clock Atelier" className="site-logo" />
      </Link>
      
      {/* NEW: Mobile Only Hamburger Icon Bars (Controlled by state) */}
      <button 
        type="button"
        className={`mobile-hamburger-trigger ${isMobileMenuOpen ? 'burger-active' : ''}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>
      
      {/* Modified: Added conditional active routing className wrapper for mobile transitions */}
      <div className={`nav-right-cluster ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ textDecoration: 'none', color: location.pathname === '/' ? '#F628AD' : 'inherit' }}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ textDecoration: 'none', color: location.pathname === '/about' ? '#F628AD' : 'inherit' }}
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link 
              to="/products" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ textDecoration: 'none', color: location.pathname === '/products' ? '#F628AD' : 'inherit' }}
            >
              PRODUCTS
            </Link>
          </li>
        </ul>

        <button onClick={handleOrderClick} className="nav-order-cta-btn">
          Order Now
        </button>
      </div>
    </nav>
  );
}

export default Navbar;