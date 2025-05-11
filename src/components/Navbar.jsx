import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserCircle,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSearch,
  FaHeart,
  FaPlus,
  FaMinus,
} from 'react-icons/fa';
import '../assets/Navbar.css';
import '../assets/NavDropdown.css';
import '../assets/NavAccordion.css';
import logo from '../assets/images/wallvish-logo.png';


const navItems = [
  {
    label: 'WALLPAPER',
    columns: [
      { title: 'Colour', items: ['BLACK','BLUE','BROWN','CREAM','GOLD','GREEN','GREY','METALLIC','YELLOW','MUSTARD'] },
      { title: 'Design', items: ['ANIMALS & BIRDS','BRICK & WOOD','DAMASK','FLOCK & LUXURY','FLORAL','GEOMETRIC','FEATURE WALL','PLAIN OR TEXTURED','QUIRKY','STRIPED'] },
      { title: 'Room', items: ['BATHROOM','BEDROOM','CHILDRENS ROOM','DINING ROOM','HALLWAY','KITCHEN','LIVING ROOM'] },
      { title: 'Designer', items: ['THE HAPPY NEWS','BARBARA HULANICKI','2 LOVELY GAYS','CLARISSA HULSE','HEMINGWAY DESIGN','SACHA WALKHOFF'] },
      { title: 'Accessories', items: ['WALLPAPER TOOLS'] }
    ]
  },
  {
    label: 'VINYL FLOORING',
    columns: [
      { title: 'Colour', items: ['BLACK','BLUE','BROWN','CREAM','GOLD','GREEN','GREY','METALLIC','YELLOW','MUSTARD'] },
      { title: 'Design', items: ['ANIMALS & BIRDS','BRICK & WOOD','DAMASK','FLOCK & LUXURY','FLORAL','GEOMETRIC','FEATURE WALL','PLAIN OR TEXTURED','QUIRKY','STRIPED'] },
      { title: 'Room', items: ['BATHROOM','BEDROOM','CHILDRENS ROOM','DINING ROOM','HALLWAY','KITCHEN','LIVING ROOM'] },
    ]
  },
  {
    label: 'CRYSTAL FRAMES',
    columns: [
      { title: 'Colour', items: ['BLACK','BLUE','BROWN','CREAM','GOLD','GREEN','GREY','METALLIC','YELLOW','MUSTARD'] },
      { title: 'Design', items: ['ANIMALS & BIRDS','BRICK & WOOD','DAMASK','FLOCK & LUXURY','FLORAL','GEOMETRIC','FEATURE WALL','PLAIN OR TEXTURED','QUIRKY','STRIPED'] },
    ]
  },
  {
    label: 'CANVAS FRAMES',
    columns: [
      { title: 'Colour', items: ['BLACK','BLUE','BROWN','CREAM','GOLD','GREEN','GREY','METALLIC','YELLOW','MUSTARD'] },
      { title: 'Design', items: ['ANIMALS & BIRDS','BRICK & WOOD','DAMASK','FLOCK & LUXURY','FLORAL','GEOMETRIC','FEATURE WALL','PLAIN OR TEXTURED','QUIRKY','STRIPED'] },
      { title: 'Room', items: ['BATHROOM','BEDROOM','CHILDRENS ROOM','DINING ROOM','HALLWAY','KITCHEN','LIVING ROOM'] },
      { title: 'Designer', items: ['THE HAPPY NEWS','BARBARA HULANICKI','2 LOVELY GAYS','CLARISSA HULSE','HEMINGWAY DESIGN','SACHA WALKHOFF'] },
    ]
  },
  {
    label: 'BLINDS',
    columns: [
      { title: 'Colour', items: ['BLACK','BLUE','BROWN','CREAM','GOLD','GREEN','GREY','METALLIC','YELLOW','MUSTARD'] },
      { title: 'Design', items: ['ANIMALS & BIRDS','BRICK & WOOD','DAMASK','FLOCK & LUXURY','FLORAL','GEOMETRIC','FEATURE WALL','PLAIN OR TEXTURED','QUIRKY','STRIPED'] },
      { title: 'Room', items: ['BATHROOM','BEDROOM','CHILDRENS ROOM','DINING ROOM','HALLWAY','KITCHEN','LIVING ROOM'] },
      { title: 'Accessories', items: ['WALLPAPER TOOLS'] }
    ]
  },
  {
    label: 'BLOGS & TUTORIALS',
    columns: [
      { title: 'Colour', items: ['BLACK','BLUE','BROWN','CREAM','GOLD','GREEN','GREY','METALLIC','YELLOW','MUSTARD'] },
      { title: 'Design', items: ['ANIMALS & BIRDS','BRICK & WOOD','DAMASK','FLOCK & LUXURY','FLORAL','GEOMETRIC','FEATURE WALL','PLAIN OR TEXTURED','QUIRKY','STRIPED'] },
      { title: 'Room', items: ['BATHROOM','BEDROOM','CHILDRENS ROOM','DINING ROOM','HALLWAY','KITCHEN','LIVING ROOM'] },
      { title: 'Designer', items: ['THE HAPPY NEWS','BARBARA HULANICKI','2 LOVELY GAYS','CLARISSA HULSE','HEMINGWAY DESIGN','SACHA WALKHOFF'] },
      { title: 'Accessories', items: ['WALLPAPER TOOLS'] }
    ]
  },
  /* …other top-level nav items… */
];
const Navbar = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileAccordions, setMobileAccordions] = useState({});
  const isMobile = window.innerWidth < 768;

  const accountRef = useRef();

const toggleAccountDropdown = () => {
  setShowAccountDropdown(prev => !prev);
};

const toggleAccordion = (label) => {
  setMobileAccordions((prev) => ({
    ...prev,
    [label]: !prev[label],
  }));
};


useEffect(() => {
  const handleClickOutside = (event) => {
    if (accountRef.current && !accountRef.current.contains(event.target)) {
      setShowAccountDropdown(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [accountRef]);


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

        



        <div className="logo"><Link to="/">WallVish Decor</Link></div>
          
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search wallpapers, vinyl flooring, crystal frames..."
            />
            <FaSearch className="search-icon" />
          </div>

          <div className="icons">
          <div className="user-dropdown-wrapper" onClick={toggleAccountDropdown} ref={accountRef}>
          <FaUserCircle className="icon user-icon"/>
          {showAccountDropdown && (
            <div className="account-dropdown">
              <div className="dropdown-arrow" />
              <div className="dropdown-content" onMouseLeave={() => setShowAccountDropdown(false)}>
                <div className="dropdown-item"><Link to="/login"><strong>SIGN IN</strong></Link></div>
                <div className="dropdown-item"><Link to="/register"><strong>REGISTER</strong></Link></div>
              </div>
            </div>
          )}
          </div>
            <FaShoppingCart className="icon" />
            <FaHeart className="icon heart-icon" />
            
          </div>
        </div>

        {/* BOTTOM ROW: category links */}
        <nav className="navbar-bottom">
          <div className="nav-left">
          <Link onClick={props.handleClick} to="/">
            <img
            src={logo}
            alt="Logo"  
            className="nav-logo responsive-logo"
            />
          </Link> 
          </div>


          {navItems.map(nav => (
            <div
              key={nav.label}
              className="nav-item"
              onMouseEnter={() => !isMobile && setActiveDropdown(nav.label)}
              onMouseLeave={() => !isMobile && setActiveDropdown(null)}
            >
              
              {nav.label}
              {activeDropdown === nav.label && (
                <div className="mega-dropdown">
                  {nav.columns.map(col => (
                    <div key={col.title} className="mega-column">
                      <h4>{col.title}</h4>
                      <ul>
                        {col.items.map(item => (
                          <li key={item}>
                            <a href="#">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {/* only for the first nav (wallpaper) */}
                  {/* {nav.label === 'WALLPAPER' && (
                    <a href="/wallpaper" className="cta-button">
                      View All Wallpaper
                    </a>
                  )} */}
                </div>
               
              )}
            </div>
            
          ))}

        {scrolled && (
            <div className="scroll-icons">
          <div className="user-dropdown-wrapper" onClick={toggleAccountDropdown} ref={accountRef}>
          <FaUserCircle className="icon user-icon" />
          {showAccountDropdown && (
            <div className="account-dropdown">
              <div className="dropdown-arrow" />
              <div className="dropdown-content" onMouseLeave={() => setShowAccountDropdown(false)}>
                <div className="dropdown-item"><Link to="/login"><strong>SIGN IN</strong></Link></div>
                <div className="dropdown-item"><Link to="/login"><strong>REGISTER</strong></Link></div>
              </div>
            </div>
          )}
          </div>
              <FaShoppingCart className="icon" />
              <FaHeart className="icon" />
            </div>
        )}
        </nav>
         <span className="white-line"></span>
      </header>

      {/* MOBILE SLIDE-IN MENU */}
      {menuOpen && (
  <div className="mobile-menu">
    {navItems.map(({ label, columns }) => {
      const isSectionOpen = mobileAccordions[label];

      return (
        <div key={label} className="accordion-section">
          <div className="accordion-header" onClick={() => toggleAccordion(label)}>
            <span className="accordion-label">{label}</span>
            <span className="accordion-icon">
              {isSectionOpen ? <FaMinus /> : <FaPlus />}
            </span>
          </div>

          {isSectionOpen && (
            <div className="accordion-subsection">
              {columns.map(({ title, items }) => {
                const titleKey = `${label}-${title}`;
                const isTitleOpen = mobileAccordions[titleKey];

                return (
                  <div key={title} className="nested-accordion">
                    <div className="accordion-header" onClick={() => toggleAccordion(titleKey)}>
                      <span className="accordion-title">{title}</span>
                      <span className="accordion-icon">
                        {isTitleOpen ? <FaMinus /> : <FaPlus />}
                      </span>
                    </div>

                    {isTitleOpen && (
                      <ul className="accordion-list">
                        {items.map((item) => (
                          <li key={item}>
                            <a href="#" className="accordion-link">{item}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    })}
  </div>
)}



    </>
  );
};

export default Navbar;
