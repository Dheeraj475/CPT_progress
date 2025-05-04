import React, { useState, useEffect } from 'react';
import '../assets/Section.css';

const Section = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c';
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <>
      {/* Hero section with background image */}
      <section className={`hero ${imageLoaded ? 'loaded' : ''}`}>
        {/* <div className="hero-content">
          <h1>New Wallpaper Trends</h1>
        </div> */}
      </section>

      {/* Graham & Brown x The Sensory Home section */}
      <section className="collaboration-section">
        <div className="collaboration-content">
          <h2 className="brand-title">
            <span className="graham">WallVish Decor</span>
            <br />
            <span className="establish">Where Every Wall Tells a Story </span>
            <br />
            <br />
            <span className="sensory">The Signature Touch of Elegance</span>
          </h2>
          <p className="collaboration-description">
          Inspired by the desire to make every corner unforgettable, 
          WallvishDecor blends art and function to redefine interior beauty. 
          Explore a world of stunning wallpapers, dazzling crystal and canvas frames, 
          elegant blinds, and high-end vinyl flooring—each designed to infuse your space with style, 
          depth, and soul. Whether you're refreshing a room or reimagining your entire home, our creations 
          promise a transformation that captivates and lasts.

          </p>
          <button className="shop-button">SHOP NOW</button>
        </div>
      </section>
    </>
  );
};

export default Section;
