import React, { useState } from 'react';
import './About.css';
import GlobeComponent from './Globe';
import Stats from './Stats';
import resumePdf from '../assets/files/Resume.pdf';

const About: React.FC = () => {
  const [isGlobeHovered, setGlobeHovered] = useState(false);
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-header">
          <h2>A little more about me.</h2>
        </div>
        <div className="about-grid">
          <div className="about-card large-card gradient-card-green intro-card">
            <div className="card-content">
              <h3>Intro</h3>
              <p>Passionate software engineer specializing in crafting highly efficient systems, driven to delve deep into system intricacies and push boundaries. Combining technical expertise with a keen eye for form factor, I strive to create uniquely designed solutions. </p>
            </div>
          </div>
          <div className="about-card gradient-card-purple tall-card stats-card">
            <div className="card-content">
               <Stats />
            </div>
          </div>
          <div 
            className="about-card gradient-card-blue tall-card location-card"
            onMouseEnter={() => setGlobeHovered(true)}
            onMouseLeave={() => setGlobeHovered(false)}
          >
            <div className="card-content">
              <h3>Location</h3>
              <p>Among the countless corners of this pale blue dot, India is the one I call home.</p>
              <GlobeComponent isHovered={isGlobeHovered} />
            </div>
          </div>
          <div className="about-card resume-card gradient-card-silver">
            <div className="card-content">
              <p>Interested in my work? Feel free to download my resume for a more detailed look at my skills and experience.</p>
              <a href={resumePdf} download="Nishant_Resume.pdf" className="cta-button">
                <span className="button-text">download resume</span>
                <span className="button-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="about-card large-card gradient-card-red connect-card">
            <div className="card-content">
              <h3>Let's Connect</h3>
              <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Feel free to reach out and let's create something amazing together.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;