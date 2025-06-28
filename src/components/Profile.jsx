import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../assets/Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const { orders } = useCart();
  const [activeTab, setActiveTab] = useState('profile');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getOrderStatus = (order) => {
    const completedStages = order.trackingStages.filter(stage => stage.completed).length;
    const totalStages = order.trackingStages.length;
    
    if (completedStages === totalStages) return 'Delivered';
    if (completedStages === totalStages - 1) return 'Out for Delivery';
    if (completedStages >= 2) return 'Shipped';
    if (completedStages >= 1) return 'Processing';
    return 'Confirmed';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#28a745';
      case 'Out for Delivery': return '#fd7e14';
      case 'Shipped': return '#007bff';
      case 'Processing': return '#ffc107';
      case 'Confirmed': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="user-info">
          <div className="user-avatar">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h3>{user?.username || 'User'}</h3>
          <p>{user?.email}</p>
        </div>
        
        <nav className="profile-nav">
          <button 
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            👤 My Profile
          </button>
          <button 
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            📦 My Orders ({orders.length})
          </button>
          <button onClick={logout} className="logout-btn">
            🚪 Logout
          </button>
        </nav>
      </div>

      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <h2>My Profile</h2>
            
            <div className="profile-card">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Username:</label>
                  <span>{user?.username || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{user?.email || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <label>Member Since:</label>
                  <span>{formatDate(new Date())}</span>
                </div>
              </div>
            </div>

            <div className="profile-card">
              <h3>Account Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">{orders.length}</span>
                  <span className="stat-label">Total Orders</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">
                    {formatPrice(orders.reduce((total, order) => total + (order.total * 1.18), 0))}
                  </span>
                  <span className="stat-label">Total Spent</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">
                    {orders.filter(order => getOrderStatus(order) === 'Delivered').length}
                  </span>
                  <span className="stat-label">Delivered Orders</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-tab">
            <h2>My Orders</h2>
            
            {orders.length === 0 ? (
              <div className="no-orders">
                <div className="no-orders-icon">📦</div>
                <h3>No Orders Yet</h3>
                <p>You haven't placed any orders yet.</p>
                <Link to="/" className="shop-now-btn">Start Shopping</Link>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <span className="order-id">Order #{order.id}</span>
                        <span className="order-date">{formatDate(order.createdAt)}</span>
                      </div>
                      <div className="order-status">
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(getOrderStatus(order)) }}
                        >
                          {getOrderStatus(order)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="order-items">
                      {order.items.slice(0, 2).map(item => (
                        <div key={item.id} className="order-item">
                          <img src={item.img || item.image} alt={item.title || item.name} />
                          <div className="item-details">
                            <span className="item-name">{item.title || item.name}</span>
                            <span className="item-qty">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="more-items">
                          +{order.items.length - 2} more items
                        </div>
                      )}
                    </div>
                    
                    <div className="order-footer">
                      <div className="order-total">
                        Total: {formatPrice(order.total * 1.18)}
                      </div>
                      <div className="order-actions">
                        <Link 
                          to={`/track-order/${order.id}`} 
                          className="track-btn"
                        >
                          Track Order
                        </Link>
                        <Link 
                          to={`/order-confirmation/${order.id}`} 
                          className="view-btn"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;