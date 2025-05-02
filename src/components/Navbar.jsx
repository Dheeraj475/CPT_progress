import React, { useState, useEffect } from 'react';
import {
  FaUserCircle,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSearch,
  FaHeart
} from 'react-icons/fa';
import '../assets/Navbar.css';
import logo from '../assets/images/wallvish-logo.png';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        {/* TOP ROW: logo / search / icons */}
        <div className="navbar-top">
        <div className="hamburger" onClick={() => setMenuOpen(open => !open)}>
              {menuOpen
                ? <FaTimes className="icon" />
                : <FaBars className="icon" />
              }
        </div>

        <div className="mobile-search-icon">
            <FaSearch className="icon" />
        </div>



          <div className="logo">WallVish Decor</div>
          
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search wallpapers, paints, decor..."
            />
            <FaSearch className="search-icon" />
          </div>

          <div className="icons">
            <FaUserCircle className="icon user-icon" />
            <FaShoppingCart className="icon" />
            <FaHeart className="icon heart-icon" />
            
          </div>
        </div>

        {/* BOTTOM ROW: category links */}
        <nav className="navbar-bottom">
          <div className="nav-left">
            <img
            src={logo}
            alt="Logo"
            className="nav-logo responsive-logo"
          />
          </div>
          {[
            'WALLPAPER',
            'PAINT',
            'WALL MURALS',
            'CURTAINS',
            'BLINDS',
            'HOME FURNISHINGS',
            'BLOGS & TUTORIALS'
          ].map(label => (
            <>
            <div key={label} className="nav-item">
              {label}
            </div>
            </>
          ))}

        {scrolled && (
            <div className="scroll-icons">
              <FaUserCircle className="icon" />
              <FaShoppingCart className="icon" />
            </div>
        )}

        </nav>
      </header>

      {/* MOBILE SLIDE-IN MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          {[
            'WALLPAPER',
            'VINYL FLOORING',
            'CRYSTAL FRAMES',
            'CANVAS FRAMES',
            'BLINDS',
            'BLOGS & TUTORIALS'
          ].map(label => (
            <div key={label} className="mobile-item">
              {label}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
