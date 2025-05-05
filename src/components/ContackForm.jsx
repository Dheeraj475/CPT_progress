import React,{useState} from 'react';
import '../assets/ContackForm.css';
import FormImage from '../assets/images/form-image.jpg';


function ContackForm() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!firstName || !lastName || !phoneNumber || !email) {
      setErrorMessage("All fields are required.");
      return;
    }
  
    const formData = {
      firstName,
      lastName,
      phoneNumber,
      email,
    };
  
    try {
      await axios.post("https://localhost:7102/api/Form", formData);
      setSuccessMessage("Form submitted successfully!");
      setErrorMessage("");
      console.log("Form submitted:", formData);
  
     
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <section className="sustainability-section">
      <div className="sustainability-image">
        <img
          src={FormImage}
          alt="Wall art scenery"
        />
      </div>
      <div className="sustainability-content">
      <div class="contact-form">
      <div className="form-container">
      <h2 className="form-title">Contact Us</h2>

      {errorMessage && <p className="form-error">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">First Name :</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-input"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">Last Name :</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-input"
              placeholder="Enter your last name"
              required
            />
          </div>
          </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber" className="form-label">Phone Number :</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="form-input"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
    </div>
      </div>
    </section>
  );
}

export default ContackForm;
