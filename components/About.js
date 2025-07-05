'use client';

import '../styles/About.css';
import { useEffect, useRef, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from './Header';
import SocialMedia from './SocialMedia';

const About = ({
  isLeaving,
  setIsLeaving,
  setActiveSection,
  menuOpen,
  setMenuOpen
}) => {
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
  const [isExiting, setIsExiting] = useState(false); // ✅ local zoom out trigger

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
    setIsExiting(false);
  };

  useEffect(() => {
    const currentRef = sectionRef.current;
    let observer;

    const handleIntersect = ([entry]) => {
      if (entry.isIntersecting) {
        resetStates();
        setTimeout(() => {
          setStartTyping(true);
        }, 200);
      }
    };

    if (currentRef) {
      observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 });
      observer.observe(currentRef);
    }

    return () => {
      if (observer && currentRef) observer.unobserve(currentRef);
      resetStates();
    };
  }, [pathname]);

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

  const handleNavClick = (section) => {
    setIsExiting(true); // ✅ Zoom + fade trigger
    setIsLeaving(true); // ✅ Notify parent

    closeMenu();

    setTimeout(() => {
      setActiveSection(section);
    }, 600); // Matches zoom animation
  };

  return (
    <motion.section
      id="about"
      className="about-section"
      ref={sectionRef}
      // ✅ NO x-slide animation, just fade container
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        handleNavClick={handleNavClick}
      />

      {menuOpen && (
        <>
          <div className="menu-backdrop" onClick={closeMenu}></div>
          <div className="mobile-menu">
            <a onClick={() => handleNavClick("hero")}>Home</a>
            <a onClick={() => handleNavClick("about")}>About me</a>
            <a onClick={() => handleNavClick("skills")}>Skills</a>
            <a onClick={() => handleNavClick("portfolio")}>Projects</a>
            <a onClick={() => handleNavClick("contact")}>Contact me</a>
          </div>
        </>
      )}

      <SocialMedia />

      {/* ✅ Smooth zoom-out on exit only */}
      <motion.div
        className={`
          about-content-wrapper
          ${startTyping && !textShift ? 'centered-start' : ''}
          ${textShift ? 'shift-wrapper' : ''}
        `}
        initial={{ scale: 1, opacity: 1 }}
        animate={isExiting ? { scale: 0.85, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className={`about-text ${textShift ? 'shift-text' : ''}`}>
          <h2 className={`about-heading ${headingShift ? 'heading-move' : ''}`}>
            About Me
          </h2>

          {startTyping && (
            <div className={`about-typewriter ${textShift ? 'paragraph-move' : ''}`}>
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
            <div className={`about-typewriter second ${textShift ? 'paragraph-move' : ''}`}>
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
              {secondComplete && (
                <div className="typed-text">{paragraphTwo}</div>
              )}
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
    </motion.section>
  );
};

export default About;
