import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import profileImage from '../assets/images/profile.png';
import './About.css';

const StatLine = ({ label, value, startDelay }) => {
  const [isTyping, setIsTyping] = useState(true);

  return (
    <div className="f1-stat" style={{ animationDelay: `${startDelay / 1000}s` }}>
      <span className="f1-stat-label">{label}</span>
      {isTyping ? (
        <TypeAnimation
          sequence={[startDelay, value, () => setIsTyping(false)]}
          wrapper="span"
          cursor={false}
          repeat={0}
          speed={40}
          className="f1-stat-value"
        />
      ) : (
        <span className="f1-stat-value">{value}</span>
      )}
    </div>
  );
};

const Stats = () => {
  const stats = [
    { label: 'AGE', value: '25' },
    { label: 'EXPERIENCE', value: '4 years' },
    { label: 'EDUCATION', value: 'B.Tech' },
    { label: 'CITY', value: 'Chennai, TN' },
    { label: 'COMPANY', value: 'M2P' },
    { label: 'ROLE', value: 'Developer' },
    { label: 'DOMAIN', value: 'Fintech' },
    { label: 'Product', value: 'Credit' },

  ];

  return (
    <div className="f1-stats-card">
      <img src={profileImage} alt="Profile" className="f1-profile-image" />
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatLine
            key={index}
            label={stat.label}
            value={stat.value}
            startDelay={200 + index * 100} // Animation delay for slide-in
          />
        ))}
      </div>
    </div>
  );
};

export default Stats;
