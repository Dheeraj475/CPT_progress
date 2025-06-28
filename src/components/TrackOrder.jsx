import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../assets/TrackOrder.css';

const TrackOrder = () => {
  const { orderId } = useParams();
  const { orders, updateOrderStatus } = useCart();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const foundOrder = orders.find(o => o.id === orderId);
    setOrder(foundOrder);
    
    // Simulate order progress for demo
    if (foundOrder) {
      const currentStage = foundOrder.trackingStages.findIndex(stage => !stage.completed);
      if (currentStage > 0 && currentStage < foundOrder.trackingStages.length) {
        // Auto-progress order stages for demo (every 10 seconds)
        const interval = setInterval(() => {
          const nextIncompleteStage = foundOrder.trackingStages.findIndex(stage => !stage.completed);
          if (nextIncompleteStage !== -1 && nextIncompleteStage < foundOrder.trackingStages.length - 1) {
            updateOrderStatus(orderId, nextIncompleteStage);
          } else {
            clearInterval(interval);
          }
        }, 10000);
        
        return () => clearInterval(interval);
      }
    }
  }, [orderId, orders, updateOrderStatus]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedDelivery = () => {
    const orderDate = new Date(order.createdAt);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 7); // 7 days from order
    
    return deliveryDate.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProgressPercentage = () => {
    const completedStages = order.trackingStages.filter(stage => stage.completed).length;
    return (completedStages / order.trackingStages.length) * 100;
  };

  if (!order) {
    return (
      <div className="track-order-container">
        <div className="order-not-found">
          <h2>Order Not Found</h2>
          <p>The order you're trying to track doesn't exist.</p>
          <Link to="/profile" className="profile-link">View All Orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="track-order-container">
      <div className="tracking-content">
        <div className="tracking-header">
          <h1>Track Your Order</h1>
          <div className="order-info">
            <span className="order-id">Order ID: #{order.id}</span>
            <span className="estimated-delivery">
              Estimated Delivery: {getEstimatedDelivery()}
            </span>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          
          <div className="tracking-stages">
            {order.trackingStages.map((stage, index) => (
              <div 
                key={index} 
                className={`tracking-stage ${stage.completed ? 'completed' : 'pending'}`}
              >
                <div className="stage-icon">
                  {stage.completed ? '✓' : index + 1}
                </div>
                <div className="stage-info">
                  <h3>{stage.stage}</h3>
                  {stage.completed && stage.date && (
                    <p className="stage-date">{formatDate(stage.date)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-details">
          <div className="order-items">
            <h3>Order Items</h3>
            {order.items.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.img || item.image} alt={item.title || item.name} />
                <div className="item-info">
                  <span className="item-name">{item.title || item.name}</span>
                  <span className="item-qty">Quantity: {item.quantity}</span>
                </div>
                <span className="item-price">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="shipping-address">
            <h3>Shipping Address</h3>
            <div className="address">
              <p>{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
              <p>{order.customerInfo.address}</p>
              <p>{order.customerInfo.city}, {order.customerInfo.state} - {order.customerInfo.pincode}</p>
              <p>Phone: {order.customerInfo.phone}</p>
            </div>
          </div>
        </div>

        <div className="tracking-actions">
          <Link to="/profile" className="view-orders-btn">
            View All Orders
          </Link>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;