import React from 'react';
import '../assets/FeatureGrid.css';

const features = [
  {
    img: 'https://picsum.photos/id/1018/600/400',
    title: 'Best Dressed',
    subtitle: 'WINDOWS',
    desc: 'Step into the new season with the best dressed windows. With hundreds of designs to choose from.',
  },
  {
    img: 'https://picsum.photos/id/1024/600/400',
    title: 'Shades of',
    subtitle: '2025',
    desc: 'We’ve created a cheat sheet of the colours tipped to be the go-to shades of 2025.',
  },
  {
    img: 'https://picsum.photos/id/1039/600/400',
    title: 'Community',
    subtitle: 'FAVOURITES',
    desc: 'It’s all about you! Shop the most popular designs and colours for your next project.',
  },
  {
    img: 'https://picsum.photos/id/1056/600/400',
    title: 'The perfect Fit',
    subtitle: 'BESPOKE MURALS',
    desc: 'Shop our collection of wall murals. All made to size for your walls.',
  },
  {
    img: 'https://picsum.photos/id/1074/600/400',
    title: 'Oh so new…',
    subtitle: 'LATEST ARRIVALS',
    desc: 'Floral to stripes and all things in-between. Discover the beautifully fresh, design-led new arrivals.',
  },
  {
    img: 'https://picsum.photos/id/1084/600/400',
    title: 'Guest Room',
    subtitle: 'READY',
    desc: 'Our luxurious bed linens deliver exceptional comfort and timeless style.',
  },
];

function FeatureGrid() {
  return (
    <section className="feature-grid">
      <div className="grid">
        {features.map((item, idx) => (
          <div className="grid-item" key={idx}>
          <img src={item.img} alt={item.subtitle} className="grid-img" loading="lazy" />
          <div className="grid-text">
            <h4>{item.title}</h4>
            <h3>{item.subtitle}</h3>
            <p>{item.desc}</p>
            <button className="shop-btn">SHOP NOW</button>
          </div>
        </div>
        
        ))}
      </div>
    </section>
  );
}

export default FeatureGrid;
