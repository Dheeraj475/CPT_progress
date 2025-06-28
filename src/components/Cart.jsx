import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import LoginPrompt from './LoginPrompt';
import '../assets/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, moveToWishlist, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleMoveToWishlist = (id) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    moveToWishlist(id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  if (!isAuthenticated) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Please login to view your cart items</p>
          <Link to="/auth/login" className="login-link">Login Now</Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Add some items to get started!</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart ({cartItems.length} items)</h1>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.img || item.image} alt={item.title || item.name} />
              </div>
              
              <div className="item-details">
                <h3>{item.title || item.name}</h3>
                <p className="item-subtitle">{item.subtitle}</p>
                <p className="item-price">{formatPrice(item.price)}</p>
                
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="action-buttons">
                    <button 
                      onClick={() => handleMoveToWishlist(item.id)}
                      className="move-to-wishlist"
                    >
                      💝 Move to Wishlist
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-item"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="item-total">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>{formatPrice(getCartTotal() * 0.18)}</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total:</span>
              <span>{formatPrice(getCartTotal() * 1.18)}</span>
            </div>
            
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
            
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <LoginPrompt 
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        message="Please login to move items to wishlist"
      />
    </div>
  );
};

export default Cart;