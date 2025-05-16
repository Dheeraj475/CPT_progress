// src/components/Auth.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/authentication-styles/Auth.css';

const Auth = (props) => {

  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);

   useEffect(() => {
    // Automatically switch form based on route
    if (location.pathname === '/auth/register') {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }
  }, [location.pathname]);

  const [loginInputs, setLoginInputs] = useState([
    { label: "User Name", type: "text", show: true, validated: "", id: "a" },
    { label: "Password", type: "password", show: true, validated: "", id: "b" }
  ]);

  const [signupInputs, setSignupInputs] = useState([
    { label: "User Name", type: "text", show: false, validated: "", id: "c" },
    { label: "Email", type: "email", show: false, validated: "", id: "d" },
    { label: "Password", type: "password", show: false, validated: "", id: "e" },
    { label: "Re-Enter Password", type: "password", show: false, validated: "", id: "f" }
  ]);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    animateFields(isSignUp ? "signupInputs" : "loginInputs");
    setTimeout(() => animateFields(isSignUp ? "loginInputs" : "signupInputs"), 100);
  };

  const animateFields = (formName) => {
    let formState = formName === "signupInputs" ? [...signupInputs] : [...loginInputs];
    let setter = formName === "signupInputs" ? setSignupInputs : setLoginInputs;
    let i = 0;

    const stagger = () => {
      if (i < formState.length) {
        setTimeout(() => {
          formState[i].show = !formState[i].show;
          setter([...formState]);
          i++;
          stagger();
        }, 70);
      }
    };
    stagger();
  };

  const validateField = (e, id) => {
    const value = e.target.value;
    const isValid = value.trim().length > 0;

    if (isSignUp) {
      const updated = signupInputs.map(field =>
        field.id === id ? { ...field, validated: isValid } : field
      );
      setSignupInputs(updated);
    } else {
      const updated = loginInputs.map(field =>
        field.id === id ? { ...field, validated: isValid } : field
      );
      setLoginInputs(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submit logic here
  };

  const renderInputs = (inputs) => (
    inputs.map(({ label, type, show, validated, id }) => (
      <div className={show ? "field field-in" : "field"} key={id}>
        <label className="label">
          {label}
          {validated && <i className="fa fa-check animate-check" />}
        </label>
        <input
          className="input"
          type={type}
          onBlur={(e) => validateField(e, id)}
        />
      </div>
    ))
  );

  return (
    <>
      {/* Login Form */}
      <section className="auth-container">
      <div className={isSignUp ? "login login-closed" : "login"}>
        <h1>Log In</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          {renderInputs(loginInputs)}
          <hr />
          <button className="submit-button" type="submit">Submit</button>
        </form>
        <div className="signup-link">
          <p className="in-out">
            Don’t have an account?
            <span to="/auth/register" onClick={(e) => { e.preventDefault(); toggleForm(); props.handleClick();  }}><Link to="/auth/register">Sign Up Here</Link></span>
          </p>
        </div>
      </div>

      {/* Signup Form */}
      <div className={isSignUp ? "sign-up" : "sign-up sign-up-closed"}>
        <h1>Sign Up</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          {renderInputs(signupInputs)}
          <hr />
          <button className="submit-button" type="submit">Submit</button>
        </form>
        <div className="signup-link">
          <p className="in-out">
            Already have an account?
            <span onClick={(e) => { e.preventDefault(); toggleForm(); props.handleClick(); }}><Link to="/auth/login">Log In Here</Link></span>
          </p>
        </div>
      </div>


      </section>
    </>
  );
};

export default Auth;
