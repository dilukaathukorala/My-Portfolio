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
  const [zoomIn, setZoomIn] = useState(false);

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
          setZoomIn(false);

          setTimeout(() => {
            setStartTyping(true);

            const totalChars = paragraphOne.length;
            const typeSpeed = 25;
            const estimatedTypingTime = totalChars * typeSpeed + 1000;

            setTimeout(() => {
              setShowCursor1(false);
              setShowSecondPara(true);

              const totalChars2 = paragraphTwo.length;
              const estimatedTypingTime2 = totalChars2 * typeSpeed + 1000;

              setTimeout(() => {
                setShowCursor2(false);
                setZoomIn(true); // Trigger zoom effect after all typing
              }, estimatedTypingTime2);
            }, estimatedTypingTime);
          }, 100);
        }
      },
      {
        threshold: 0.5,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <h2 className={`about-heading ${zoomIn ? 'zoom-effect' : ''}`}>
        About Me
      </h2>

      <div className={`about-typewriter ${zoomIn ? 'zoom-effect' : ''}`}>
        {startTyping && (
          <Typewriter
            words={[paragraphOne]}
            loop={1}
            typeSpeed={25}
            deleteSpeed={0}
            delaySpeed={0}
            cursor={showCursor1}
            cursorStyle="|"
          />
        )}
      </div>

      {showSecondPara && (
        <div className={`about-typewriter second ${zoomIn ? 'zoom-effect' : ''}`}>
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
    </section>
  );
};

export default About;
