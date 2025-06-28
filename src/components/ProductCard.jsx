import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginPrompt from './LoginPrompt';
import '../assets/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems, cartItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);

  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setLoginMessage('Please login to add items to cart');
      setShowLoginPrompt(true);
      return;
    }

    setIsAddingToCart(true);
    
    // Simulate adding to cart with animation
    setTimeout(() => {
      addToCart(product);
      setIsAddingToCart(false);
      setShowAddedAnimation(true);
      
      // Hide animation after 2 seconds
      setTimeout(() => {
        setShowAddedAnimation(false);
      }, 2000);
    }, 800);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setLoginMessage('Please login to buy this item');
      setShowLoginPrompt(true);
      return;
    }

    // Add to cart if not already added
    if (!isInCart) {
      addToCart(product);
    }
    
    // Navigate to checkout
    navigate('/checkout');
  };

  const handleToggleWishlist = () => {
    if (!isAuthenticated) {
      setLoginMessage('Please login to add items to wishlist');
      setShowLoginPrompt(true);
      return;
    }
    
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
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
            onClick={handleToggleWishlist}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isInWishlist ? '❤️' : '🤍'}
          </button>
          
          {/* Added to Cart Animation */}
          {showAddedAnimation && (
            <div className="added-to-cart-animation">
              <div className="success-checkmark">✓</div>
              <span>Added to Cart!</span>
            </div>
          )}
        </div>
        
        <div className="product-info">
          <h4>{product.subtitle}</h4>
          <h3>{product.title || product.name}</h3>
          <p>{product.desc || product.description}</p>
          <div className="product-price">{formatPrice(product.price)}</div>
          
          <div className="product-actions">
            {isInCart ? (
              <div className="cart-actions">
                <button 
                  className="buy-now-btn"
                  onClick={handleBuyNow}
                >
                  🛒 Buy Now
                </button>
                <button 
                  className="go-to-cart-btn"
                  onClick={() => navigate('/cart')}
                >
                  📦 Go to Cart
                </button>
              </div>
            ) : (
              <div className="cart-actions">
                <button 
                  className={`add-to-cart-btn ${isAddingToCart ? 'loading' : ''}`}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    <>
                      <span className="loading-spinner"></span>
                      Adding...
                    </>
                  ) : (
                    <>🛒 Add to Cart</>
                  )}
                </button>
                <button 
                  className="buy-now-btn"
                  onClick={handleBuyNow}
                >
                  ⚡ Buy Now
                </button>
              </div>
            )}
          </div>
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