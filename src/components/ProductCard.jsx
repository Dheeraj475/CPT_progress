import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../assets/ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return null;
  }

  const {
    id,
    title,
    subtitle,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    images = [],
    inStock = true,
    category,
    brand
  } = product;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleImageNavigation = (direction, e) => {
    e.stopPropagation();
    if (direction === 'next') {
      setCurrentImageIndex((prev) => 
        prev === images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={title}
              className="product-image"
              loading="lazy"
            />
            {images.length > 1 && (
              <>
                <button
                  className="image-nav prev"
                  onClick={(e) => handleImageNavigation('prev', e)}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  className="image-nav next"
                  onClick={(e) => handleImageNavigation('next', e)}
                  aria-label="Next image"
                >
                  ›
                </button>
                <div className="image-indicators">
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="no-image">
            <span>No Image</span>
          </div>
        )}

        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>

        {discount && (
          <div className="discount-badge">
            -{discount}%
          </div>
        )}

        {!inStock && (
          <div className="out-of-stock-overlay">
            <span>Out of Stock</span>
          </div>
        )}
      </div>

      <div className="product-info">
        <div className="product-category">{category}</div>
        <h3 className="product-title">{title}</h3>
        {subtitle && <p className="product-subtitle">{subtitle}</p>}
        
        <div className="product-rating">
          <div className="stars">
            {renderStars(rating)}
          </div>
          <span className="rating-text">
            {rating} ({reviews} reviews)
          </span>
        </div>

        <div className="product-pricing">
          <span className="current-price">{formatPrice(price)}</span>
          {originalPrice && originalPrice > price && (
            <span className="original-price">{formatPrice(originalPrice)}</span>
          )}
        </div>

        {brand && <div className="product-brand">by {brand}</div>}

        <div className="product-actions">
          <button
            className={`add-to-cart-btn ${!inStock ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;