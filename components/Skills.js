'use client';

import '../styles/Skills.css';
import { useEffect, useRef, useState } from 'react';
import SocialMedia from './SocialMedia';

const skillsList = [
  { name: 'JavaScript', level: 75 },
  { name: 'Java', level: 60 },
  { name: 'HTML', level: 70 },
  { name: 'Kotlin', level: 50 },
  { name: 'SQL', level: 60 },
  { name: 'PHP', level: 65 },
  { name: 'C++', level: 60 },
  { name: 'CSS', level: 70 },
  { name: 'Figma', level: 75 },
  { name: 'Canva', level: 75 },
  { name: 'Adobe Illustrator', level: 75 },
  { name: 'Adobe Photoshop', level: 75 }
];

const Skills = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <SocialMedia/>
      <div className={`skills-box ${visible ? 'show' : ''}`}>
        <h2 className="skills-heading">Skills</h2>
        <div className="skills-grid">
          {skillsList.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="circle">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient
                      id={`gradient-${index}`}
                      x1="0"
                      y1="0"
                      x2="100"
                      y2="100"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#2a72e9" />
                      <stop offset="33%" stopColor="#e6e9f9" />
                      <stop offset="66%" stopColor="#5eb0f9" />
                      <stop offset="75%" stopColor="#2a72e9" />
                    </linearGradient>
                  </defs>
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="14" />
                  {/* Foreground progress ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={`url(#gradient-${index})`}
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray="282"
                    strokeDashoffset={
                      visible ? 282 - (282 * skill.level) / 100 : 282
                    }
                    style={{ transition: 'stroke-dashoffset 2.5s ease-in-out' }}
                  />
                </svg>
                <div className="percentage">{skill.level}%</div>
              </div>
              <p className="skill-name">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
