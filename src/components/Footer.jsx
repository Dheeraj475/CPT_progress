import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import '../assets/Footer.css';

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setActiveIndex(null); // Reset accordion in desktop
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleAccordion = (index) => {
    if (!isMobile) return;
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const footerData = [
    {
      title: 'HOW CAN WE HELP?',
      items: ['Delivery', 'Returns', 'Sample Service'],
    },
    {
      title: 'CORPORATE',
      items: ['Our Heritage', 'Public Relation Contacts', 'Our Sustainability Pledge', 'Privacy & Legal'],
    },
    {
      title: 'USEFUL LINKS',
      items: ['Loving Home Magazine', 'Wallpaper', 'Paint', 'Curtains', 'Blinds', 'Bed Linen'],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-links">
        {footerData.map((section, index) => (
          <div key={index} className="footer-section">
            <h4 className="footer-heading" onClick={() => toggleAccordion(index)}>
              {section.title}
              {isMobile && (
                  <span className="accordion-arrow">
                    {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                )}

            </h4>
            {(isMobile ? activeIndex === index : true) && (
              <ul className="footer-list">
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

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
          <span>F</span><span>X</span><span>IG</span><span>YT</span><span>P</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
