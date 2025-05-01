// import { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Section from './components/Section';
import FeatureGrid from './components/FeatureGrip';
import SustainabilityReport from './components/SustainabilityReport';
import Reading from './components/Reading';


function App() {

  return (
    <>
      <div>
        <Navbar />
        <Section />
        <FeatureGrid />
        <SustainabilityReport/>
        <Reading/>
      </div>
    </>
  )
}

export default App
