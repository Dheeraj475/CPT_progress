// import { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Section from './components/Section';
import FeatureGrid from './components/FeatureGrip';
import SustainabilityReport from './components/ContackForm';
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
        <Reading/>
        <GoogleReviews/>
        <SustainabilityReport/>
        <Footer/>
      </div>
    </>
  )
}

export default App
