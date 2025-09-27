// About.js
'use client';

import '../styles/About.css';
import { useMemo, useState, useEffect } from 'react';
import SocialMedia from './SocialMedia';

/** -------- Safari-safe sentence splitter (no lookbehind) --------
 * Splits text into sentences ending with ., !, or ?
 */
function toLines(text) {
  if (!text) return [];
  const out = [];
  let start = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '.' || ch === '!' || ch === '?') {
      // include the punctuation
      out.push(text.slice(start, i + 1).trim());
      // skip following spaces
      while (i + 1 < text.length && /\s/.test(text[i + 1])) i++;
      start = i + 1;
    }
  }
  // trailing text without punctuation
  if (start < text.length) out.push(text.slice(start).trim());
  return out.filter(Boolean);
}

/** -------- Old-Safari-friendly hook for (max-width: 1024px) -------- */
function useSmallScreen() {
  const [isSmall, setIsSmall] = useState(null); // null until mounted (prevents hydration mismatch)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    const update = () => setIsSmall(!!mq.matches);

    update();

    // Older Safari only has addListener/removeListener
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    } else if (typeof mq.addListener === 'function') {
      mq.addListener(update);
      return () => mq.removeListener(update);
    } else {
      // very old fallback: listen to resize
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }
  }, []);

  return isSmall;
}

// === Animation timings ===
const STAGGER = 0.9;       // seconds between sentences
const DURATION = 0.65;     // duration of sentence fade
const GAP_AFTER_P1 = 0.4;  // pause before paragraph 2
const LOGO_EXTRA_DELAY = 0.2; // pause before logos

const About = () => {
  const isSmallScreen = useSmallScreen();

  const paragraphOne =
    `I am a designer and technologist with a focus on creating digital experiences where logic meets clarity. My approach combines structure, creativity, and intention, ensuring that every design is not only functional but also intuitive and meaningful. With a foundation in graphic design and a passion for user centered problem solving, I strive to craft solutions that feel natural, purposeful, and impactful.`;

  const paragraphTwo =
    `Currently pursuing a degree in Information Technology at SLIIT, I bring together technical knowledge and creative design expertise to bridge the gap between usability and innovation. Having completed NVQ Level 4 in Graphic Design at IETI, I have developed strong skills in structured visual communication, which I now integrate into modern software development practices. My goal is to deliver solutions that are efficient, user-friendly, and grounded in real-world needs.`;

  const p1Lines = useMemo(() => toLines(paragraphOne), [paragraphOne]);
  const p2Lines = useMemo(() => toLines(paragraphTwo), [paragraphTwo]);

  // Timings
  const p1DoneAt = p1Lines.length * STAGGER;
  const p2BaseDelay = p1DoneAt + GAP_AFTER_P1;
  const logosDelay = p1DoneAt + LOGO_EXTRA_DELAY;

  return (
    <section id="about" className="about-section" style={{ backgroundColor: 'transparent' }}>
      <SocialMedia />

      <div className="about-content-wrapper">
        <div className="about-text">
          <h2 className="about-heading">About Me</h2>

        {/* Paragraph 1 */}
          <div className="about-lines">
            {p1Lines.map((line, idx) => (
              <p
                key={`p1-${idx}`}
                className="about-line line-reveal"
                style={{
                  animationDelay: `${idx * STAGGER}s`,
                  ['--line-duration']: `${DURATION}s`,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Paragraph 2 */}
          <div className="about-lines second">
            {p2Lines.map((line, idx) => (
              <p
                key={`p2-${idx}`}
                className="about-line line-reveal"
                style={{
                  animationDelay: `${p2BaseDelay + idx * STAGGER}s`,
                  ['--line-duration']: `${DURATION}s`,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Only render logos after mount to avoid hydration issues */}
          {isSmallScreen === true && (
            <div
              className="about-logos logos-inline logos-reveal"
              style={{ animationDelay: `${logosDelay}s` }}
            >
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

        {isSmallScreen === false && (
          <div
            className="about-logos logos-static-right logos-reveal"
            style={{ animationDelay: `${logosDelay}s` }}
          >
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
