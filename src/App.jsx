// import { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Section from './components/Section';
import FeatureGrid from './components/FeatureGrip';
import SustainabilityReport from './components/SustainabilityReport';
import Reading from './components/Reading';
import GoogleReviews from './components/GoogleReviews';
import Footer from './components/Footer';


function App() {

  return (
    <>
      <div>
        <Navbar />
        <Section />
        <FeatureGrid />
        <SustainabilityReport/>
        <Reading/>
        <GoogleReviews/>
        <Footer/>
      </div>
    </>
  )
}

export default App
