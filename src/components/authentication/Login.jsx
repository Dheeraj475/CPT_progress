// src/components/authentication/Login.jsx
import React, { useState } from 'react';
import Register from './Register';
import '../../assets/authentication-styles/Auth.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginInputs, setLoginInputs] = useState([
    { label: "User Name", type: "text", show: true, validated: "", id: "a" },
    { label: "Password", type: "password", show: true, validated: "", id: "b" },
  ]);

  const toggleForm = () => {
    setIsSignUp(prev => !prev);
  };

  const validateField = (event, id) => {
    const value = event.target.value;
    const isValid = value.length > 0;
    const updatedInputs = loginInputs.map(field =>
      field.id === id ? { ...field, validated: isValid } : field
    );
    setLoginInputs(updatedInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission logic here
  };

  return (
    <>
      <section className={`login-container ${isSignUp ? 'hidden' : ''}`}>
        <h1>Log In</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          {loginInputs.map(({ label, type, show, validated, id }) => (
            <div className={show ? "field field-in" : "field"} key={id}>
              <label className="label">
                {label}
                {validated && <i className="fa fa-check animate-check" />}
              </label>
              <br />
              <input
                className="input"
                type={type}
                onBlur={(e) => validateField(e, id)}
              />
            </div>
          ))}
          <hr />
          <button className="submit-button" type="submit">Submit</button>
        </form>
        <div className="signup-link">
          <p className="in-out">
            Don't have an account?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>
              Sign Up Here
            </a>
          </p>
        </div>
      </section>

      <Register show={isSignUp} toggleForm={toggleForm} />
    </>
  );
};

export default Login;
