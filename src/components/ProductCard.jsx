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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const isInCart = cartItems.some(item => item.id === product.id);

  // Create product images array with proper fallback handling
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : product.img 
      ? [product.img]
      : ['https://via.placeholder.com/300x300?text=No+Image'];

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
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
          <div className="image-carousel">
            {/* Image Counter */}
            <div className="image-counter">
              {currentImageIndex + 1}/{productImages.length}
            </div>

            {/* Carousel Container */}
            <div className="carousel-container">
              <div 
                className="carousel-track"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {productImages.map((image, index) => (
                  <div key={index} className="carousel-slide">
                    <img 
                      src={image} 
                      alt={`${product.title || product.name} - View ${index + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {productImages.length > 1 && (
              <>
                <button 
                  className="carousel-nav prev"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button 
                  className="carousel-nav next"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}

            {/* Indicators */}
            {productImages.length > 1 && (
              <div className="carousel-indicators">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => goToImage(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Wishlist Button */}
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
        </div>
        
        <div className="product-info">
          <h4>{product.subtitle}</h4>
          <h3>{product.title || product.name}</h3>
          <p>{product.desc || product.description}</p>
          
          {/* Rating and Reviews */}
          {product.rating && (
            <div className="product-rating">
              <span className="rating-stars">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="rating-text">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          )}
          
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