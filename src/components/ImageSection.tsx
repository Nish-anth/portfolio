import React from 'react';
import './ImageSection.css';
import SkillBadge from './SkillBadge';
import Typewriter from './Typewriter';
import profileImage from '../assets/images/profile.png';

const ImageSection: React.FC = () => {
  return (
    <section className="landing-section-container">
      <div className="image-section">
        <div className="typewriter-left">
          <Typewriter text={["Hey, there. I'm Nishanth"]} className="intro-text" />
        </div>
        <img src={profileImage} alt="Nishanth" className="profile-image" />
        <div className="typewriter-right">
          <Typewriter text={['I weave elegance in design, precision in code;', 'crafting a digital tapestry.']} />
        </div>
        <SkillBadge title="full-stack developer" className="full-stack" />
        <SkillBadge title="fintech" className="fintech" />
        <SkillBadge title="gamer" className="gamer" />
        <SkillBadge title="bike enthusiast" className="bike-enthusiast" />
      </div>
      <div className="typewriter-container-mobile">
        <Typewriter text={["Hey, there. I'm Nishanth"]} textClassName="mobile-typewriter-text" />
        <Typewriter text={['I weave elegance in design, precision in code;', 'crafting a digital tapestry.']} textClassName="mobile-typewriter-text" />
      </div>
    </section>
  );
};

export default ImageSection;
