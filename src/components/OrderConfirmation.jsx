import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../assets/OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { orders } = useCart();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const foundOrder = orders.find(o => o.id === orderId);
    setOrder(foundOrder);
  }, [orderId, orders]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!order) {
    return (
      <div className="order-confirmation-container">
        <div className="order-not-found">
          <h2>Order Not Found</h2>
          <p>The order you're looking for doesn't exist.</p>
          <Link to="/" className="home-link">Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-container">
      <div className="confirmation-content">
        <div className="success-animation">
          <div className="checkmark">✓</div>
        </div>
        
        <h1>Order Confirmed!</h1>
        <p className="confirmation-message">
          Thank you for your order. We've received your order and will process it shortly.
        </p>
        
        <div className="order-details">
          <div className="order-header">
            <h2>Order Details</h2>
            <div className="order-info">
              <span className="order-id">Order ID: #{order.id}</span>
              <span className="order-date">{formatDate(order.createdAt)}</span>
            </div>
          </div>
          
          <div className="order-items">
            <h3>Items Ordered</h3>
            {order.items.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.img || item.image} alt={item.title || item.name} />
                <div className="item-info">
                  <span className="item-name">{item.title || item.name}</span>
                  <span className="item-qty">Quantity: {item.quantity}</span>
                </div>
                <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          
          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (18%):</span>
              <span>{formatPrice(order.total * 0.18)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total Paid:</span>
              <span>{formatPrice(order.total * 1.18)}</span>
            </div>
          </div>
          
          <div className="shipping-info">
            <h3>Shipping Address</h3>
            <div className="address">
              <p>{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
              <p>{order.customerInfo.address}</p>
              <p>{order.customerInfo.city}, {order.customerInfo.state} - {order.customerInfo.pincode}</p>
              <p>Phone: {order.customerInfo.phone}</p>
            </div>
          </div>
          
          <div className="payment-info">
            <h3>Payment Method</h3>
            <p className="payment-method">
              {order.paymentMethod === 'rupay' && '💳 RuPay Card'}
              {order.paymentMethod === 'upi' && '📱 UPI'}
              {order.paymentMethod === 'cod' && '💰 Cash on Delivery'}
            </p>
          </div>
        </div>
        
        <div className="action-buttons">
          <Link to={`/track-order/${order.id}`} className="track-order-btn">
            Track Your Order
          </Link>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;