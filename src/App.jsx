import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Importing components
import Navbar from './components/Navbar';
import FeatureGrid from './components/FeatureGrid';
import SustainabilityReport from './components/ContackForm';
import Reading from './components/Reading';
import GoogleReviews from './components/GoogleReviews';
import Footer from './components/Footer';
import ScrollToTop from './components/utils/ScrollToTop';
import PageNotFound from './components/PageNotFound';
import SearchResults from './components/SearchResults';
import ProductsPage from './components/ProductsPage';

// E-commerce components
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import TrackOrder from './components/TrackOrder';
import Profile from './components/Profile';

// Importing routing components
import Delivery from './components/footer-routing/Delivery';
import Returns from './components/footer-routing/Returns';
import Service from './components/footer-routing/Service';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Section from './components/Section';

// Import product data
import Wallpaper from './assets/images/wallpaper.jpg'
import Blinds from './assets/images/blinds.jpg'
import VinylFlooring from './assets/images/vinyl-flooring.jpg'
import BespokeMurals from './assets/images/bespoke-murals.jpg'
import CrystalFrames from './assets/images/crystal-frames.jpg'
import CanvasFrames from './assets/images/canvas-frames.jpg'

const allProducts = [
  {
    id: 1,
    img: Wallpaper,
    title: 'Wall Wonders',
    subtitle: 'WALLPAPER',
    desc: 'Transform your spaces with our stunning collection of wallpapers. Whether you love bold patterns or soft textures, our wallpapers are designed to inspire and bring every wall to life.',
    price: 2500,
    category: 'wallpaper',
    rating: 4.5,
    reviews: 128,
    brand: 'WallVish',
    inStock: true
  },
  {
    id: 2,
    img: Blinds,
    title: 'Perfect Control, Stylish Charm',
    subtitle: 'BLINDS',
    desc: 'Add beauty and function with our sleek range of blinds. Tailored to fit any window, our designs balance privacy, light control, and contemporary style for every room.',
    price: 3500,
    category: 'blinds',
    rating: 4.3,
    reviews: 89,
    brand: 'WallVish',
    inStock: true
  },
  {
    id: 3,
    img: VinylFlooring,
    title: 'Step into Luxury',
    subtitle: 'VINYL FLOORING',
    desc: 'Durable meets design with our vinyl flooring options. From rustic wood looks to modern textures, experience comfort underfoot and style in every step.',
    price: 4500,
    category: 'vinyl-flooring',
    rating: 4.7,
    reviews: 156,
    brand: 'WallVish',
    inStock: true
  },
  {
    id: 4,
    img: BespokeMurals,
    title: 'The perfect Fit',
    subtitle: 'BESPOKE MURALS',
    desc: 'Shop our collection of wall murals. All made to size for your walls.',
    price: 8500,
    category: 'bespoke-murals',
    rating: 4.8,
    reviews: 67,
    brand: 'WallVish',
    inStock: true
  },
  {
    id: 5,
    img: CrystalFrames,
    title: 'Framed in Elegance',
    subtitle: 'CRYSTAL FRAMES',
    desc: 'Give your memories the royal treatment with our crystal frames. Designed to sparkle in any light, they make a statement in sophistication and sentiment.',
    price: 1500,
    category: 'crystal-frames',
    rating: 4.4,
    reviews: 203,
    brand: 'WallVish',
    inStock: true
  },
  {
    id: 6,
    img: CanvasFrames,
    title: 'Art that Speaks',
    subtitle: 'CANVAS FRAMES',
    desc: 'Turn your walls into galleries with our hand-crafted canvas frames. Rich in color and texture, each piece is a timeless addition to your décor story.',
    price: 2000,
    category: 'canvas-frames',
    rating: 4.6,
    reviews: 145,
    brand: 'WallVish',
    inStock: true
  },
  // Additional products for better filtering demo
  {
    id: 7,
    img: Wallpaper,
    title: 'Premium Textured Wallpaper',
    subtitle: 'WALLPAPER',
    desc: 'Luxury textured wallpaper with premium finish for sophisticated interiors.',
    price: 3200,
    category: 'wallpaper',
    rating: 4.2,
    reviews: 78,
    brand: 'Premium',
    inStock: true
  },
  {
    id: 8,
    img: Blinds,
    title: 'Smart Motorized Blinds',
    subtitle: 'BLINDS',
    desc: 'Modern motorized blinds with smart home integration and remote control.',
    price: 5500,
    category: 'blinds',
    rating: 4.9,
    reviews: 34,
    brand: 'Smart Home',
    inStock: false
  },
  {
    id: 9,
    img: VinylFlooring,
    title: 'Waterproof Vinyl Planks',
    subtitle: 'VINYL FLOORING',
    desc: 'Completely waterproof vinyl flooring perfect for kitchens and bathrooms.',
    price: 3800,
    category: 'vinyl-flooring',
    rating: 4.5,
    reviews: 92,
    brand: 'AquaFloor',
    inStock: true
  },
  {
    id: 10,
    img: CrystalFrames,
    title: 'LED Crystal Display Frame',
    subtitle: 'CRYSTAL FRAMES',
    desc: 'Illuminated crystal frame with LED backlighting for stunning photo display.',
    price: 2800,
    category: 'crystal-frames',
    rating: 4.7,
    reviews: 56,
    brand: 'LuxFrame',
    inStock: true
  }
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    // Filter products based on search query
    const results = allProducts.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      product.desc.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <BrowserRouter>
            <ScrollToTop />
            <Navbar handleClick={handleClick} onSearch={handleSearch} />

            <div className="main-content">
              <Routes>
                {/* Main Route */}
                <Route
                  path="/"
                  element={
                    searchQuery ? (
                      <SearchResults 
                        searchQuery={searchQuery}
                        searchResults={searchResults}
                        onClearSearch={clearSearch}
                      />
                    ) : (
                      <>
                        <Section />
                        <FeatureGrid />
                        <Reading />
                        <GoogleReviews />
                        <SustainabilityReport />
                      </>
                    )
                  }
                />

                {/* Products Page */}
                <Route 
                  path="/products" 
                  element={<ProductsPage allProducts={allProducts} />} 
                />

                {/* E-commerce Routes */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                <Route path="/track-order/:orderId" element={<TrackOrder />} />
                <Route path="/profile" element={<Profile />} />

                {/* Authentication Routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />

                {/* Footer Routing */}
                <Route path="/service" element={<Service />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/returns" element={<Returns />} />

                {/* 404 Page */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>

            <Footer handleClick={handleClick} />
          </BrowserRouter>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;