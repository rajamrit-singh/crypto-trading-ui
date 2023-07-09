import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import './NavBar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">Your Logo</Link>

        <div className={`menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="left-menu">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/stocks">Stocks</Link></li>
            <li><Link to="/start-trading">Start Trading</Link></li>
          </ul>

          <div className="right-menu">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>

          <div className="mobile-menu-icon" onClick={handleMobileMenuToggle}>
            <FaBars />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
