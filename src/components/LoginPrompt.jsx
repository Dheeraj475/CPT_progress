import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/LoginPrompt.css';

const LoginPrompt = ({ isOpen, onClose, message = "Please login to continue" }) => {
  if (!isOpen) return null;

  return (
    <div className="login-prompt-overlay" onClick={onClose}>
      <div className="login-prompt-modal" onClick={e => e.stopPropagation()}>
        <div className="login-prompt-header">
          <h3>Authentication Required</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="login-prompt-body">
          <div className="login-prompt-icon">🔒</div>
          <p>{message}</p>
          <div className="login-prompt-actions">
            <Link to="/auth/login" className="login-btn" onClick={onClose}>
              Login
            </Link>
            <Link to="/auth/register" className="register-btn" onClick={onClose}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;