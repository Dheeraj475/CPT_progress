import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/authentication-styles/Auth.css';

const Auth = ({ handleClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const defaultFormData = {
    username: '',
    email: '',
    password: '',
    reenterPassword: ''
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    setIsSignUp(location.pathname === '/auth/register');
    setFormData(defaultFormData); // Reset form on route change
  }, [location.pathname]);

  const handleInputChange = (e, key) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, reenterPassword } = formData;

    if (isSignUp) {
      if (!username || !email || !password || !reenterPassword) {
        alert("All fields are required.");
        return;
      }
      if (password !== reenterPassword) {
        alert("Passwords do not match.");
        return;
      }
    } else {
      if (!email || !password) {
        alert("Email and Password are required.");
        return;
      }
    }

    const BASE_URL = 'http://localhost:3000/api/auth';
    const endpoint = isSignUp ? `${BASE_URL}/register` : `${BASE_URL}/login`;

    const payload = isSignUp
      ? { username: username.trim(), email: email.trim(), password, reenterPassword }
      : { email: email.trim(), password };

    try {
      const response = await axios.post(endpoint, payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      const data = response.data;
      alert(isSignUp ? 'Registration successful!' : 'Login successful!');

      // ✅ Clear form after successful submission
      setFormData(defaultFormData);

      // If logged in, store token and redirect
      if (!isSignUp && data.token || isSignUp && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || 'Something went wrong.';
      alert(`❌ Error: ${errMsg}`);
      console.error("❌ Full error:", error.response || error);
    }
  };

  const loginInputs = [
    { label: "Email", type: "email", key: "email" },
    { label: "Password", type: "password", key: "password" }
  ];

  const signupInputs = [
    { label: "Username", type: "text", key: "username" },
    { label: "Email", type: "email", key: "email" },
    { label: "Password", type: "password", key: "password" },
    { label: "Re-enter Password", type: "password", key: "reenterPassword" }
  ];

  const renderInputs = (inputs) =>
    inputs.map(({ label, type, key }) => (
      <div className="field field-in" key={key}>
        <label className="label">{label}</label>
        <input
          className="input"
          type={type}
          value={formData[key]}
          onChange={(e) => handleInputChange(e, key)}
          required
        />
      </div>
    ));

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setFormData(defaultFormData); // Reset form when toggling
    handleClick?.();
  };

  return (
    <section className="auth-container">
      <div className={isSignUp ? 'login login-closed' : 'login'}>
        <h1>Log In</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          {renderInputs(loginInputs)}
          <hr />
          <button className="submit-button" type="submit">Submit</button>
        </form>
        <div className="signup-link">
          <p className="in-out">
            Don’t have an account?{' '}
            <span onClick={(e) => { e.preventDefault(); toggleForm(); }}>
              <Link to="/auth/register">Sign Up Here</Link>
            </span>
          </p>
        </div>
      </div>

      <div className={isSignUp ? 'sign-up' : 'sign-up sign-up-closed'}>
        <h1>Sign Up</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          {renderInputs(signupInputs)}
          <hr />
          <button className="submit-button" type="submit">Submit</button>
        </form>
        <div className="signup-link">
          <p className="in-out">
            Already have an account?{' '}
            <span onClick={(e) => { e.preventDefault(); toggleForm(); }}>
              <Link to="/auth/login">Log In Here</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Auth;
