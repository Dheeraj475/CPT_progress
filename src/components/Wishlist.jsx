import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import LoginPrompt from './LoginPrompt';
import '../assets/Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, moveToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleMoveToCart = (id) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    moveToCart(id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  if (!isAuthenticated) {
    return (
      <div className="wishlist-container">
        <div className="wishlist-empty">
          <div className="empty-wishlist-icon">💝</div>
          <h2>Your Wishlist is Empty</h2>
          <p>Please login to view your wishlist items</p>
          <Link to="/auth/login" className="login-link">Login Now</Link>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-container">
        <div className="wishlist-empty">
          <div className="empty-wishlist-icon">💝</div>
          <h2>Your Wishlist is Empty</h2>
          <p>Add some items to your wishlist!</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>My Wishlist ({wishlistItems.length} items)</h1>
      </div>

      <div className="wishlist-grid">
        {wishlistItems.map(item => (
          <div key={item.id} className="wishlist-item">
            <div className="item-image">
              <img src={item.img || item.image} alt={item.title || item.name} />
              <button 
                onClick={() => removeFromWishlist(item.id)}
                className="remove-from-wishlist"
              >
                ❌
              </button>
            </div>
            
            <div className="item-info">
              <h3>{item.title || item.name}</h3>
              <p className="item-subtitle">{item.subtitle}</p>
              <p className="item-price">{formatPrice(item.price)}</p>
              
              <div className="item-actions">
                <button 
                  onClick={() => handleMoveToCart(item.id)}
                  className="move-to-cart-btn"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <LoginPrompt 
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        message="Please login to add items to cart"
      />
    </div>
  );
};

export default Wishlist;