import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Importing components
import Navbar from './components/Navbar';
import FeatureGrid from './components/FeatureGrid';
import SustainabilityReport from './components/ContackForm';
import Reading from './components/Reading';
import GoogleReviews from './components/GoogleReviews';
import Footer from './components/Footer';
import ScrollToTop from './components/utils/ScrollToTop';
import PageNotFound from './components/PageNotFound';

// Importing routing components
import Delivery from './components/footer-routing/Delivery';
import Returns from './components/footer-routing/Returns';
import Service from './components/footer-routing/Service';
import Auth from './components/authentication/Auth';
import Section from './components/Section'; // ✅ Make sure this exists

function App() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar handleClick={handleClick} />

        <div className="main-content">
          <Routes>
            {/* Main Route */}
            <Route
              path="/"
              element={
                <>
                  <Section />
                  <FeatureGrid />
                  <Reading />
                  <GoogleReviews />
                  <SustainabilityReport />
                </>
              }
            />

            {/* Authentication Nested Routing */}
            <Route path="/auth">
              <Route path="login" element={<Auth handleClick={handleClick} mode="login" />} />
              <Route path="register" element={<Auth handleClick={handleClick} mode="register" />} />
            </Route>

            {/* Footer Routing */}
            <Route path="/service" element={<Service />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/returns" element={<Returns />} />

            {/* 404 Page */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>

        <Footer handleClick={handleClick} />
      </BrowserRouter>
    </div>
  );
}

export default App;
