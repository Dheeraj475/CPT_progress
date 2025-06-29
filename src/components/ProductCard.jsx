import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoginPrompt from './LoginPrompt';
import '../assets/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useCart();
  const { isAuthenticated } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const images = product.images || [product.img];
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    setIsLoading(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addToCart(product);
    setIsInCart(true);
    setShowAddedAnimation(true);
    setIsLoading(false);
    
    // Hide animation after 2 seconds
    setTimeout(() => {
      setShowAddedAnimation(false);
    }, 2000);
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
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
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    return stars.join('');
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <div className="image-carousel">
          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="carousel-slide">
                  <img src={image} alt={`${product.title} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {images.length > 1 && (
            <>
              <button className="carousel-nav prev" onClick={prevImage}>
                ‹
              </button>
              <button className="carousel-nav next" onClick={nextImage}>
                ›
              </button>
              
              <div className="carousel-indicators">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => goToImage(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="image-counter">
            {currentImageIndex + 1}/{images.length}
          </div>
        )}

        <button 
          className={`wishlist-btn ${isInWishlist ? 'in-wishlist' : ''}`}
          onClick={handleWishlistToggle}
        >
          {isInWishlist ? '❤️' : '🤍'}
        </button>

        {showAddedAnimation && (
          <div className="added-to-cart-animation">
            <div className="success-checkmark">✓</div>
            Added to Cart!
          </div>
        )}
      </div>

      <div className="product-info">
        <h4>{product.subtitle}</h4>
        <h3>{product.title}</h3>
        <p>{product.desc}</p>
        
        {product.rating && (
          <div className="product-rating">
            <span className="rating-stars">{renderStars(product.rating)}</span>
            <span className="rating-text">({product.reviews} reviews)</span>
          </div>
        )}
        
        <div className="product-price">{formatPrice(product.price)}</div>
        
        <div className="product-actions">
          {isInCart ? (
            <div className="cart-actions">
              <button className="go-to-cart-btn">
                🛒 Go to Cart
              </button>
              <button className="buy-now-btn">
                ⚡ Buy Now
              </button>
            </div>
          ) : (
            <div className="cart-actions">
              <button 
                className={`add-to-cart-btn ${isLoading ? 'loading' : ''}`}
                onClick={handleAddToCart}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    🛒 Add to Cart
                  </>
                )}
              </button>
              <button className="buy-now-btn">
                ⚡ Buy Now
              </button>
            </div>
          )}
        </div>
      </div>

      <LoginPrompt 
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        message="Please login to add items to cart or wishlist"
      />
    </div>
  );
};

// Explicitly set displayName to help vite:react-swc plugin
ProductCard.displayName = 'ProductCard';

export default ProductCard;