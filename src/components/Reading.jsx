import React, { useState } from 'react';
import '../assets/Reading.css';
import Environment from '../assets/images/environment-friendly.jpg';
import Support from '../assets/images/support.jpg';
import Returns from '../assets/images/returns.jpg';
import RequestSample from '../assets/images/request-sample.jpg';

function Reading() {
  const [readMore, setReadMore] = useState(false);

  const badges = [
    {
      src: Environment,
      label: 'RESPONSIBLE & SUSTAINABLE'
    },
    {
      src:Support,
      label: 'FRIENDLY & HELPFUL SERVICE'
    },
    {
      src: Returns,
      label: 'EASY RETURNS'
    },
    {
      src: RequestSample,
      label: 'REQUEST AVAILABLE'
    }
  ];

  return (
    <section className="reading-container">
      <h2 className="reading-title">SHOP WITH CONFIDENCE</h2>

      <div className="reading-logos">
        {badges.map((badge, i) => (
          <div key={i} className="reading-logo">
            <img src={badge.src} alt={badge.label} />
          </div>
        ))}
      </div>

      <div className="reading-text">
        <h3>WELCOME TO WALLVISH DECOR</h3>
        <p>
            Welcome to WallvishDecor, Bangalore’s trusted destination for exquisite home décor since 2022.
            Rooted in the belief that every home deserves beauty, comfort, and a personal touch, 
            WallvishDecor curates a distinctive collection of premium wallpapers, blinds, vinyl flooring, 
            crystal frames, and canvas frames—designed to elevate living spaces with timeless elegance and enduring quality.
            Blending India’s vibrant cultural heritage with evolving contemporary aesthetics, 
            WallvishDecor redefines home styling through a marriage of innovation and tradition. 
            Every offering is a testament to thoughtful design, quality craftsmanship, 
            and a steadfast commitment to excellence—making refined décor accessible without compromise.
        </p>

        {readMore && (
            
          <>  
          <h3>WHIMSICAL WALLCOVERINGS</h3>
            <q>Walls are the canvas of your dreams.</q><br />
            <q>Dress them in textures that tell your story.</q><br />
            <q>Where every pattern creates a lasting impression.</q><br />
          
          <br /><p>
            An exceptional wallpaper range transforms any environment with artistic flair and distinguished style. 
            From commanding geometrics to tranquil textures, each design breathes life into interiors—infusing 
            creativity and refinement to reflect individuality and sophistication.
          </p>

          <h3>BOUTIQUE BLINDS</h3>
            <q>Control the light, shape the mood.</q><br />
            <q>Blinds that blend precision with style.</q><br />
            <q>Designed for comfort, crafted for elegance</q><br />
          <br />

          <p>
            Masterfully engineered, this collection redefines window dressing through precision functionality 
            and graceful form. Superior in light modulation and contemporary in finish, these blinds harmonize 
            privacy and aesthetics, elevating the sensory and visual experience of every space.
          </p>

          <h3>FLAGSHIP FLOORINGS</h3>
            <q>Strong foundations, stunning finishes.</q><br />
            <q>Step into spaces that inspire.</q><br />
            <q>Flooring that fuses durability with beauty.</q><br />
          <br /> 

          <p>
            Crafted with resilient materials and detailed finesse, the vinyl flooring range introduces an 
            impeccable blend of utility and elegance. With authentic textures and rich finishes, each design 
            serves as a flawless base for stylish, practical living—delivering modern luxury beneath your feet.
          </p>

          <h3>CURATED CRYSTALS</h3>
            <q>Moments deserve brilliance.</q><br />
            <q>Encapsulate memories in crystal clarity.</q><br />
            <q>Frames that sparkle with timeless grace.</q><br />
          <br /> 

          <p>
            A fusion of luminescence and legacy, these crystal frames preserve cherished memories with 
            captivating brilliance. Each piece is an emblem of refined taste, enhancing both contemporary 
            and classic décors with their radiant presence.
          </p>

          <h3>COUTURE CANVAS</h3>
            <q>Art that speaks from your walls.</q><br />
            <q>Canvas frames that evoke emotion.</q><br />
            <q>Turning memories into masterpieces.</q><br />
          <br /> 

          <p>
            Evocative and timeless, these canvas frames are designed to transform empty walls into vibrant 
            personal galleries. Each creation is meticulously composed, combining visual storytelling with 
            artisanal quality for décor that lingers in memory.
            At WallvishDecor, everyday spaces are transformed into expressive sanctuaries. 
            Backed by a promise of quality, innovation, and cultural insight, our décor solutions invite pride, 
            meaning, and enduring beauty into every home.
          </p>

          </>
        )}

        <button
          onClick={() => setReadMore(!readMore)}
          className="reading-btn"
        >
          {readMore ? 'SHOW LESS' : 'READ MORE...'}
        </button>
      </div>
    </section>
  );
}

export default Reading;
