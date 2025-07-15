import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const languageKeys = ['english', 'tamil', 'hindi', 'malayalam', 'telugu'] as const;
type LanguageKey = typeof languageKeys[number];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const names: Record<LanguageKey, string> = useMemo(() => ({
    english: 'Nishanth',
    tamil: 'நிஷாந்த்',
    hindi: 'निशांत',
    malayalam: 'നിശാന്ത്',
    telugu: 'నిశాంత్',
  }), []);

  const languages = useMemo(() => Object.keys(names) as LanguageKey[], [names]);
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [displayedName, setDisplayedName] = useState(names.english);
  const intervalRef = useRef<number | undefined>(undefined);

  const scramble = useCallback((text: string) => {
    let iteration = 0;
    const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      const newText = text
        .split('')
        .map((_char, index) => {
          if (index < iteration) {
            return text[index];
          }
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join('');

      setDisplayedName(newText);

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  }, []);

  useEffect(() => {
    const nameChangeInterval = setInterval(() => {
      setCurrentLanguageIndex(prevIndex => (prevIndex + 1) % languages.length);
    }, 4000); // Change name every 4 seconds

    return () => clearInterval(nameChangeInterval);
  }, [languages.length]);

  useEffect(() => {
    scramble(names[languages[currentLanguageIndex]]);
  }, [currentLanguageIndex, languages, names, scramble]);

  const HamburgerIcon = FaBars as React.ElementType;
  const CloseIcon = FaTimes as React.ElementType;

  return (
    <header className="header">
      <div className="logo">
        <div className="logo-shape"></div>
        <span className="logo-text">{displayedName}</span>
      </div>
      <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
        <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
        <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
      </nav>
      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
      </div>
    </header>
  );
};

export default Header;
