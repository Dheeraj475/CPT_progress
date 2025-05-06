// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Importing components
import Navbar from './components/Navbar';
import Section from './components/Section';
import FeatureGrid from './components/FeatureGrid';
import SustainabilityReport from './components/ContackForm';
import Reading from './components/Reading';
import GoogleReviews from './components/GoogleReviews';
import Footer from './components/Footer';

// Importing routing components
import Delivery from './components/footer-routing/Delivery';
import Returns from './components/footer-routing/Returns';
import Service from './components/footer-routing/Service';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';


function App() {

  return (
    
    <div className="App">
    <BrowserRouter>
      <Navbar />

      <div className="main-content">
        <Routes>
          
          {/* Main Routing */}
          <Route path="/" element={
            <>
              <Section />
              <FeatureGrid />
              <Reading />
              <GoogleReviews />
              <SustainabilityReport />
            </>
          } />

          {/* Authentication Routing */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Footer Routing */}
          <Route path="/service" element={<Service />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/returns" element={<Returns />} />

        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  </div>
  )
}

export default App
