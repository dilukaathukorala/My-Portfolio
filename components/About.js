// About.js - 'use client';

import '../styles/About.css';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import SocialMedia from './SocialMedia';

const TYPE_SPEED = 45;

function useSmallScreen(maxWidth = 1024) {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setIsSmall(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, [maxWidth]);
  return isSmall;
}

const About = ({ setActiveSection, menuOpen, setMenuOpen, handleNavClick, reloadKey }) => {
  const sectionRef = useRef(null);
  const pathname = usePathname();

  // UI states
  const [startTyping, setStartTyping] = useState(false);
  const [showSecondPara, setShowSecondPara] = useState(false);
  const [startSecondTyping, setStartSecondTyping] = useState(false);
  // const [headingShift, setHeadingShift] = useState(false); // REMOVED (no heading move)
  const [textShift, setTextShift] = useState(false);
  const [showLogos, setShowLogos] = useState(false);
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(true);
  const [secondComplete, setSecondComplete] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  // typewriter states
  const [p1Text, setP1Text] = useState('');
  const [p2Text, setP2Text] = useState('');
  const p1TimerRef = useRef(null);
  const p2TimerRef = useRef(null);

  const isSmallScreen = useSmallScreen(1024);

  const paragraphOne =
    `I am a designer and technologist with a focus on creating digital experiences where logic meets clarity. My approach combines structure, creativity, and intention, ensuring that every design is not only functional but also intuitive and meaningful. With a foundation in graphic design and a passion for user centered problem solving, I strive to craft solutions that feel natural, purposeful, and impactful.`;

  const paragraphTwo =
    `Currently pursuing a degree in Information Technology at SLIIT, I bring together technical knowledge and creative design expertise to bridge the gap between usability and innovation. Having completed NVQ Level 4 in Graphic Design at IETI, I have developed strong skills in structured visual communication, which I now integrate into modern software development practices. My goal is to deliver solutions that are efficient, user-friendly, and grounded in real-world needs.`;

  const clearTimers = () => {
    if (p1TimerRef.current) clearInterval(p1TimerRef.current);
    if (p2TimerRef.current) clearInterval(p2TimerRef.current);
  };

  const resetStates = () => {
    clearTimers();
    setStartTyping(false);
    setShowSecondPara(false);
    setStartSecondTyping(false);
    setShowCursor1(true);
    setShowCursor2(true);
    // setHeadingShift(false); // REMOVED
    setTextShift(false);
    setShowLogos(false);
    setSecondComplete(false);
    setIsLeaving(false);
    setP1Text('');
    setP2Text('');
  };

  useEffect(() => {
    resetStates();
    const t = setTimeout(() => setStartTyping(true), 200);
    return () => {
      clearTimeout(t);
      clearTimers();
    };
  }, [pathname, reloadKey]);

  // Paragraph 1 typing
  useEffect(() => {
    if (!startTyping) return;
    let i = 0;
    p1TimerRef.current = setInterval(() => {
      setP1Text(() => {
        const next = paragraphOne.slice(0, i + 1);
        i++;
        if (i >= paragraphOne.length) {
          clearInterval(p1TimerRef.current);
          setShowCursor1(false);
          // setTimeout(() => setHeadingShift(true), 300); // REMOVED (no heading move)
          setTimeout(() => setShowSecondPara(true), 800);
          setTimeout(() => setStartSecondTyping(true), 1500);
        }
        return next;
      });
    }, TYPE_SPEED);

    return () => clearInterval(p1TimerRef.current);
  }, [startTyping]);

  // Paragraph 2 typing
  useEffect(() => {
    if (!startSecondTyping || secondComplete) return;
    let i = 0;

    // On small screens, show logos as soon as P2 starts
    if (isSmallScreen) setShowLogos(true);

    p2TimerRef.current = setInterval(() => {
      setP2Text(() => {
        const next = paragraphTwo.slice(0, i + 1);
        i++;
        if (i >= paragraphTwo.length) {
          clearInterval(p2TimerRef.current);
          setSecondComplete(true);
          setShowCursor2(false);
          setTextShift(true);

          // On desktop, delay logos a bit
          if (!isSmallScreen) {
            setTimeout(() => setShowLogos(true), 800);
          }
        }
        return next;
      });
    }, TYPE_SPEED);

    return () => clearInterval(p2TimerRef.current);
  }, [startSecondTyping, secondComplete, isSmallScreen]);

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
      <SocialMedia />

      <AnimatePresence mode="wait">
        {!isLeaving && (
          <motion.div
            key={`about-wrapper-${reloadKey}`}
            className={[
              'about-content-wrapper',
              startTyping && !textShift ? 'centered-start' : '',
              textShift && !isSmallScreen ? 'shift-wrapper' : ''
            ].join(' ')}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className={['about-text', textShift && !isSmallScreen ? 'shift-text' : ''].join(' ')}>
              {/* Heading stays fixed now */}
              <h2 className="about-heading">About Me</h2>

              {/* Paragraph 1 */}
              {startTyping && (
                <div className={['about-typewriter', textShift && !isSmallScreen ? 'paragraph-move' : ''].join(' ')}>
                  <span>{p1Text}</span>
                  {showCursor1 && <span className="type-cursor">|</span>}
                </div>
              )}

              {/* Paragraph 2 */}
              {showSecondPara && (
                <div className={['about-typewriter', 'second', textShift && !isSmallScreen ? 'paragraph-move' : ''].join(' ')}>
                  {!secondComplete ? (
                    <>
                      <span>{p2Text}</span>
                      {showCursor2 && <span className="type-cursor">|</span>}
                    </>
                  ) : (
                    <div className="typed-text">{paragraphTwo}</div>
                  )}
                </div>
              )}

              {/* Small screens: logos under paragraph 2 */}
              {isSmallScreen && showLogos && (
                <div className="about-logos logos-inline">
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
            </div>

            {/* Desktop: logos slide in to the side */}
            {!isSmallScreen && showLogos && (
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
