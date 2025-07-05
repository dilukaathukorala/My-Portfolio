'use client';

import { useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Header from '../components/Header';
import Skills from '../components/Skills';

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const handleNavClick = (section) => {
    const isSameSection = section === activeSection;

    if (isSameSection) {
      // ✅ Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // ✅ Force remount to reload content
      setReloadKey((prev) => prev + 1);
    } else {
      setActiveSection(section);
      setReloadKey(0); // Reset for next time
    }
  };

  return (
    <>
      <Header
        activeSection={activeSection}
        handleNavClick={handleNavClick}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {activeSection === "hero" && (
        <Hero
          key={`hero-${reloadKey}`}
          handleNavClick={handleNavClick} // ✅ Pass this
          setActiveSection={setActiveSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}

      {activeSection === "about" && (
        <About
          key={`about-${reloadKey}`}
          handleNavClick={handleNavClick} // ✅ Pass this
          setActiveSection={setActiveSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}

      {activeSection === "skills" && (
        <Skills
          key={`skills-${reloadKey}`}
          handleNavClick={handleNavClick} // ✅ Pass this
          setActiveSection={setActiveSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}
    </>
  );
}
