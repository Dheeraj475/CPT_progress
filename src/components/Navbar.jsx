import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import '../assets/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-left">
        <div className="site-logo">WallVish Decor</div>
      </div>

      <nav className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <div
          className="menu-item"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          Wallpaper
          {dropdownOpen && (
            <div className="dropdown-menu">
              <span>Feature Walls</span>
              <span>Patterns</span>
              <span>Textures</span>
            </div>
          )}
        </div>
        <div className="menu-item">Paint</div>
        <div className="menu-item">Home Decor</div>
        <div className="menu-item">New Arrivals</div>
      </nav>

      <div className="navbar-icons">
        <FaUserCircle className="icon" />
        <FaShoppingCart className="icon" />
        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Navbar;
