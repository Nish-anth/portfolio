import React, { useState, useEffect } from 'react';
import './Typewriter.css';

interface TypewriterProps {
  text: string | string[];
  speed?: number;
  className?: string;
  textClassName?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 100, className, textClassName }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const textToRender = Array.isArray(text) ? text.join('\n') : text;

  useEffect(() => {
    if (displayText.length < textToRender.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText(textToRender.substring(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timeoutId);
    } else {
      setIsComplete(true);
    }
  }, [displayText, textToRender, speed]);

  return (
    <div className={`typewriter-container ${className || ''}`}>
      <span className={`typewriter-text ${textClassName || ''}`}>{displayText}</span>
      <span className={`typewriter-cursor ${isComplete ? 'is-complete' : ''}`}>|</span>
    </div>
  );
};

export default Typewriter;
