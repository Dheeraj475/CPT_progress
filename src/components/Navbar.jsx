import React, { useState, useEffect } from 'react';
import '../assets/Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-left">
        <div className="navbar-logo">WallVish Decor</div>
        {!scrolled && (
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
          />
        )}
      </div>
      <div className="navbar-menu">
        <span className="menu-item">Wallpaper</span>
        <span className="menu-item">Paint</span>
        <span className="menu-item">Home Decor</span>
        <span className="menu-item">New Arrivals</span>
      </div>
    </div>
  );
};

export default Navbar;
