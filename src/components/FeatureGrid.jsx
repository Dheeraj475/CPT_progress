import React from 'react';
import ProductCard from './ProductCard';
import '../assets/FeatureGrid.css';
import Wallpaper from '../assets/images/wallpaper.jpg'
import Blinds from '../assets/images/blinds.jpg'
import VinylFlooring from '../assets/images/vinyl-flooring.jpg'
import BespokeMurals from '../assets/images/bespoke-murals.jpg'
import CrystalFrames from '../assets/images/crystal-frames.jpg'
import CanvasFrames from '../assets/images/canvas-frames.jpg'

const features = [
  {
    id: 1,
    img: Wallpaper,
    title: 'Wall Wonders',
    subtitle: 'WALLPAPER',
    desc: 'Transform your spaces with our stunning collection of wallpapers. Whether you love bold patterns or soft textures, our wallpapers are designed to inspire and bring every wall to life.',
    price: 2500
  },
  {
    id: 2,
    img: Blinds,
    title: 'Perfect Control, Stylish Charm',
    subtitle: 'BLINDS',
    desc: 'Add beauty and function with our sleek range of blinds. Tailored to fit any window, our designs balance privacy, light control, and contemporary style for every room.',
    price: 3500
  },
  {
    id: 3,
    img: VinylFlooring,
    title: 'Step into Luxury',
    subtitle: 'VINYL FLOORING',
    desc: 'Durable meets design with our vinyl flooring options. From rustic wood looks to modern textures, experience comfort underfoot and style in every step.',
    price: 4500
  },
  {
    id: 4,
    img: BespokeMurals,
    title: 'The perfect Fit',
    subtitle: 'BESPOKE MURALS',
    desc: 'Shop our collection of wall murals. All made to size for your walls.',
    price: 8500
  },
  {
    id: 5,
    img: CrystalFrames,
    title: 'Framed in Elegance',
    subtitle: 'CRYSTAL FRAMES',
    desc: 'Give your memories the royal treatment with our crystal frames. Designed to sparkle in any light, they make a statement in sophistication and sentiment.',
    price: 1500
  },
  {
    id: 6,
    img: CanvasFrames,
    title: 'Art that Speaks',
    subtitle: 'CANVAS FRAMES',
    desc: 'Turn your walls into galleries with our hand-crafted canvas frames. Rich in color and texture, each piece is a timeless addition to your décor story.',
    price: 2000
  },
];

function FeatureGrid() {
  return (
    <section className="feature-grid">
      <div className="grid">
        {features.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}

export default FeatureGrid;