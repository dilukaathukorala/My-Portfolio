'use client';

import '../styles/About.css';
import { useEffect, useRef, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

const About = () => {
  const sectionRef = useRef(null);
  const [startTyping, setStartTyping] = useState(false);
  const [showSecondPara, setShowSecondPara] = useState(false);
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(true);
  const [headingShift, setHeadingShift] = useState(false);
  const [textShift, setTextShift] = useState(false);
  const [showLogos, setShowLogos] = useState(false);

  const paragraphOne = `A curious mind shaping digital design where logic meets clarity creating experiences that not only work, but feel right. I design with purpose, blending structure, creativity, and intention in every detail.`;

  const paragraphTwo = `Currently studying Information Technology at SLIIT, with a broad interest in modern software development. Completed NVQ Level 4 in Graphic Design at IETI, where curiosity for structured visual communication developed into practical design skills. With a background that bridges technology and design, the goal is to craft solutions that are efficient, intuitive, and grounded in real-world purpose.`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(false);
          setShowSecondPara(false);
          setShowCursor1(true);
          setShowCursor2(true);
          setHeadingShift(false);
          setTextShift(false);
          setShowLogos(false);

          setTimeout(() => {
            setStartTyping(true);

            const typeSpeed = 25;
            const time1 = paragraphOne.length * typeSpeed + 1000;
            const time2 = paragraphTwo.length * typeSpeed + 1000;

            setTimeout(() => {
              setShowCursor1(false);
              setHeadingShift(true);
              setShowSecondPara(true);

              setTimeout(() => {
                setShowCursor2(false);
                setTextShift(true);

                setTimeout(() => {
                  setShowLogos(true);
                }, 800);
              }, time2);
            }, time1);
          }, 200);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

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
              <Typewriter
                words={[paragraphTwo]}
                loop={1}
                typeSpeed={25}
                deleteSpeed={0}
                delaySpeed={500}
                cursor={showCursor2}
                cursorStyle="|"
              />
            </div>
          )}
        </div>

        {showLogos && (
          <div className="about-logos slide-in-right">
            <a
              href="https://www.sliit.lk/"
              target="_blank"
              rel="noopener noreferrer"
              className="logo-link"
            >
              <img src="/sliit-logo.png" alt="SLIIT Logo" className="logo-img" />
            </a>
            <a
              href="https://www.ieti.edu.lk/"
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
