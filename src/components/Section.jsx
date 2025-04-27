import React, { useState, useEffect } from 'react';
import '../assets/Section.css'; // Import the CSS file for styling

const Section = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'; // Your high-quality image URL
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <section className={`hero ${imageLoaded ? 'loaded' : ''}`}>
      <div className="hero-content">
        <h1>New Wallpaper Trends</h1>
        <button className="shop-button">Shop Now</button>
      </div>
    </section>
  );
};

export default Section;
