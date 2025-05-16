// src/components/authentication/Register.jsx
import React, { useState } from 'react';
import '../../assets/authentication-styles/Auth.css';

const Register = ({ show, toggleForm }) => {
  const [signupInputs, setSignupInputs] = useState([
    { label: "User Name", type: "text", show: true, validated: "", id: "c" },
    { label: "Email", type: "email", show: true, validated: "", id: "d" },
    { label: "Password", type: "password", show: true, validated: "", id: "e" },
    { label: "Re-Enter Password", type: "password", show: true, validated: "", id: "f" },
  ]);

  const validateField = (event, id) => {
    const value = event.target.value;
    const isValid = value.length > 0;
    const updatedInputs = signupInputs.map(field =>
      field.id === id ? { ...field, validated: isValid } : field
    );
    setSignupInputs(updatedInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
  };

  return (
    <section className={`register-container ${show ? '' : 'hidden'}`}>
      <h1>Sign Up</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        {signupInputs.map(({ label, type, show, validated, id }) => (
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
          Already have an account?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>
            Log In Here
          </a>
        </p>
      </div>
    </section>
  );
};

export default Register;
