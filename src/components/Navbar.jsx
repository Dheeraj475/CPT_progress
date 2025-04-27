import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaShoppingCart, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import '../assets/Navbar.css'; // Keep your custom styles if needed

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    setDropdownOpen(false); // Close dropdown when opening mobile menu
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(prev => !prev);
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-left">
        <div className="site-logo">WallVish Decor</div>
      </div>

      {/* Search Input - Desktop */}
      <div className={`search-bar ${searchOpen ? 'active' : ''}`}>
        <input type="text" placeholder="Search wallpapers, paints, decor..." />
      </div>

      {/* Menu Items - Desktop */}
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

      {/* Icons Section */}
      <div className="navbar-icons">
        <FaSearch className="icon" onClick={toggleSearch} />
        <FaUserCircle className="icon" />
        <FaShoppingCart className="icon" />
        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Navbar;
