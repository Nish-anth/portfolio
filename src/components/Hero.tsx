import React from 'react';
import Header from './Header';
import ImageSection from './ImageSection';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <div className="hero">
      <Header />
      <main className="hero-content">
        <h1 className="hero-title">SOFTWARE ENGINEER</h1>
        {/* <div className="hero-description">
          <p>Hey, I'm Nishanth. I'm currently orchestrating credit card experiences in M2P Fintech, Chennai</p>
          <p>I'm a passionate software engineer with experience in the fintech space who uses research, data, and thoughtful design to create delightful products that scale.</p>
        </div> */}
        {/* <a href="#contact" className="get-in-touch">GET IN TOUCH →</a> */}
      </main>
      <ImageSection />
    </div>
  );
};

export default Hero;
