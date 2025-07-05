'use client';

import '../styles/About.css';
import { useEffect, useRef, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import SocialMedia from './SocialMedia';

const About = ({ setActiveSection, menuOpen, setMenuOpen, handleNavClick, reloadKey }) => {
  const sectionRef = useRef(null);
  const pathname = usePathname();

  const [startTyping, setStartTyping] = useState(false);
  const [showSecondPara, setShowSecondPara] = useState(false);
  const [startSecondTyping, setStartSecondTyping] = useState(false);
  const [headingShift, setHeadingShift] = useState(false);
  const [textShift, setTextShift] = useState(false);
  const [showLogos, setShowLogos] = useState(false);
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(true);
  const [secondComplete, setSecondComplete] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const paragraphOne = `A curious mind shaping digital design where logic meets clarity creating experiences that not only work, but feel right. I design with purpose, blending structure, creativity, and intention in every detail.`;

  const paragraphTwo = `Currently studying Information Technology at SLIIT, with a broad interest in modern software development. Completed NVQ Level 4 in Graphic Design at IETI, where curiosity for structured visual communication developed into practical design skills. With a background that bridges technology and design, the goal is to craft solutions that are efficient, intuitive, and grounded in real-world purpose.`;

  const resetStates = () => {
    setStartTyping(false);
    setShowSecondPara(false);
    setStartSecondTyping(false);
    setShowCursor1(true);
    setShowCursor2(true);
    setHeadingShift(false);
    setTextShift(false);
    setShowLogos(false);
    setSecondComplete(false);
    setIsLeaving(false);
  };

  useEffect(() => {
    resetStates();
    setTimeout(() => setStartTyping(true), 200);
  }, [pathname, reloadKey]);

  useEffect(() => {
    if (startTyping) {
      const typeSpeed = 25;
      const approximateTime = paragraphOne.length * typeSpeed + 500;

      const timer = setTimeout(() => {
        setShowCursor1(false);
        setTimeout(() => setHeadingShift(true), 300);
        setTimeout(() => setShowSecondPara(true), 800);
        setTimeout(() => setStartSecondTyping(true), 1500);
      }, approximateTime);

      return () => clearTimeout(timer);
    }
  }, [startTyping, paragraphOne.length]);

  useEffect(() => {
    if (startSecondTyping && !secondComplete) {
      const typeSpeed = 25;
      const approximateTime = paragraphTwo.length * typeSpeed + 500;

      const timer = setTimeout(() => {
        setSecondComplete(true);
        setShowCursor2(false);
        setTextShift(true);
        setTimeout(() => setShowLogos(true), 800);
      }, approximateTime);

      return () => clearTimeout(timer);
    }
  }, [startSecondTyping, paragraphTwo.length, secondComplete]);

  const closeMenu = () => setMenuOpen(false);

  const handleLeave = (section) => {
    if (section === 'about') {
      resetStates();
      setTimeout(() => setStartTyping(true), 200);
    } else {
      setIsLeaving(true);
      setTimeout(() => setActiveSection(section), 600);
    }
  };

  return (
    <motion.section
      id="about"
      className="about-section"
      ref={sectionRef}
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: 'transparent' }}
    >
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        handleNavClick={handleLeave}
      />

      {menuOpen && (
        <>
          <div className="menu-backdrop" onClick={closeMenu}></div>
          <div className="mobile-menu">
            <a onClick={() => handleLeave("hero")}>Home</a>
            <a onClick={() => handleLeave("about")}>About me</a>
            <a onClick={() => handleLeave("skills")}>Skills</a>
            <a onClick={() => handleLeave("portfolio")}>Projects</a>
            <a onClick={() => handleLeave("contact")}>Contact me</a>
          </div>
        </>
      )}

      <SocialMedia />

      <AnimatePresence mode="wait">
        {!isLeaving && (
          <motion.div
            key={`about-wrapper-${reloadKey}`}
            className={`
              about-content-wrapper
              ${startTyping && !textShift ? 'centered-start' : ''}
              ${textShift ? 'shift-wrapper' : ''}
            `}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className={`about-text ${textShift ? 'shift-text' : ''}`}>
              <h2 className={`about-heading ${headingShift ? 'heading-move' : ''}`}>
                About Me
              </h2>

              {startTyping && (
                <div
                  className={`about-typewriter ${textShift ? 'paragraph-move' : ''}`}
                >
                  <Typewriter
                    words={[paragraphOne]}
                    loop={1}
                    typeSpeed={25}
                    deleteSpeed={0}
                    delaySpeed={0}
                    cursor={showCursor1}
                    cursorStyle="|"
                  />
                </div>
              )}

              {showSecondPara && (
                <div
                  className={`about-typewriter second ${textShift ? 'paragraph-move' : ''}`}
                >
                  {startSecondTyping && !secondComplete && (
                    <Typewriter
                      key={`second-${startSecondTyping}`}
                      words={[paragraphTwo]}
                      loop={1}
                      typeSpeed={25}
                      deleteSpeed={0}
                      delaySpeed={0}
                      cursor={showCursor2}
                      cursorStyle="|"
                    />
                  )}
                  {secondComplete && <div className="typed-text">{paragraphTwo}</div>}
                </div>
              )}
            </div>

            {showLogos && (
              <div className="about-logos slide-in-right">
                <a
                  href="https://www.sliit.lk/about/about-sliit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="logo-link"
                >
                  <img src="/sliit-logo.png" alt="SLIIT Logo" className="logo-img" />
                </a>
                <a
                  href="https://naita.gov.lk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="logo-link"
                >
                  <img src="/ieti-logo.png" alt="IETI Logo" className="logo-img" />
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default About;
