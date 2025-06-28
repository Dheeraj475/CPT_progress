import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoginPrompt from './LoginPrompt';
import '../assets/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, wishlistItems } = useCart();
  const { isAuthenticated } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setLoginMessage('Please login to add items to cart');
      setShowLoginPrompt(true);
      return;
    }
    addToCart(product);
  };

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      setLoginMessage('Please login to add items to wishlist');
      setShowLoginPrompt(true);
      return;
    }
    if (!isInWishlist) {
      addToWishlist(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <>
      <div className="product-card">
        <div className="product-image">
          <img src={product.img || product.image} alt={product.title || product.name} />
          <button 
            className={`wishlist-btn ${isInWishlist ? 'in-wishlist' : ''}`}
            onClick={handleAddToWishlist}
          >
            {isInWishlist ? '❤️' : '🤍'}
          </button>
        </div>
        
        <div className="product-info">
          <h4>{product.subtitle}</h4>
          <h3>{product.title || product.name}</h3>
          <p>{product.desc || product.description}</p>
          <div className="product-price">{formatPrice(product.price)}</div>
          
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>
        </div>
      </div>

      <LoginPrompt 
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        message={loginMessage}
      />
    </>
  );
};

export default ProductCard;