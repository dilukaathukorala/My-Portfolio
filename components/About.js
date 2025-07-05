'use client';

import '../styles/About.css';
import { useEffect, useRef, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { usePathname } from 'next/navigation';

const About = () => {
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

  const paragraphOne = `A curious mind shaping digital design where logic meets clarity creating experiences that not only work, but feel right. I design with purpose, blending structure, creativity, and intention in every detail.`;

  const paragraphTwo = `Currently studying Information Technology at SLIIT, with a broad interest in modern software development. Completed NVQ Level 4 in Graphic Design at IETI, where curiosity for structured visual communication developed into practical design skills. With a background that bridges technology and design, the goal is to craft solutions that are efficient, intuitive, and grounded in real-world purpose.`;

  // Reset function to clean up all states
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

  // Use a timer approach to ensure second paragraph triggers
  useEffect(() => {
    if (startTyping) {
      // Calculate approximate time for first paragraph to complete
      const firstParagraphLength = paragraphOne.length;
      const typeSpeed = 25; // milliseconds per character
      const approximateTime = firstParagraphLength * typeSpeed + 500; // Add buffer
      
      console.log('First paragraph will take approximately:', approximateTime, 'ms');
      
      const timer = setTimeout(() => {
        console.log('Timer triggered - starting second paragraph sequence');
        setShowCursor1(false);
        
        // Delay the heading shift for smoother transition
        setTimeout(() => {
          setHeadingShift(true);
        }, 300);
        
        // Show second paragraph after heading starts moving
        setTimeout(() => {
          setShowSecondPara(true);
        }, 800);
        
        // Start second typewriter after everything is positioned
        setTimeout(() => {
          console.log('Starting second typewriter');
          setStartSecondTyping(true);
        }, 1500);
      }, approximateTime);

      return () => clearTimeout(timer);
    }
  }, [startTyping, paragraphOne.length]);

  // Handle second typewriter completion
  useEffect(() => {
    if (startSecondTyping && !secondComplete) {
      const secondParagraphLength = paragraphTwo.length;
      const typeSpeed = 25;
      const approximateTime = secondParagraphLength * typeSpeed + 500;
      
      console.log('Second paragraph will take approximately:', approximateTime, 'ms');
      
      const timer = setTimeout(() => {
        console.log('Second paragraph complete - showing logos');
        setSecondComplete(true);
        setShowCursor2(false);
        setTextShift(true);
        
        setTimeout(() => {
          setShowLogos(true);
        }, 800);
      }, approximateTime);

      return () => clearTimeout(timer);
    }
  }, [startSecondTyping, paragraphTwo.length, secondComplete]);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div
        className={`about-content-wrapper
          ${startTyping && !textShift ? 'centered-start' : ''}
          ${textShift ? 'shift-wrapper' : ''}
        `}
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
                <div className="typed-text">
                  {paragraphTwo}
                </div>
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
      </div>
    </section>
  );
};

export default About;