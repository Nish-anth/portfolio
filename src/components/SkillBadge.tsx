import React, { useRef, useEffect } from 'react';
import './SkillBadge.css';

interface SkillBadgeProps {
  title: string;
  subtitle?: string;
  className: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ title, subtitle, className }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (isMobile || !wrapper) {
      if (wrapper) {
        wrapper.style.transform = 'translate(0, 0)';
      }
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);

      if (distance < 150) {
        wrapper.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      } else {
        wrapper.style.transform = 'translate(0, 0)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (wrapper) {
        wrapper.style.transform = 'translate(0, 0)';
      }
    };
  }, [isMobile]);

  return (
    <div ref={wrapperRef} className={`skill-badge-wrapper ${className}`}>
      <div className='skill-badge'>
        <div className="skill-badge-title">{title}</div>
        {subtitle && <div className="skill-badge-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
};

export default SkillBadge;
