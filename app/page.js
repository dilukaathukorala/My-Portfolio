'use client';

import { useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Header from '../components/Header';
import Skills from '../components/Skills';
import Projects from '../components/Projects'; // ✅ import

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const handleNavClick = (section) => {
    const isSameSection = section === activeSection;

    if (isSameSection) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setReloadKey((prev) => prev + 1);
    } else {
      setActiveSection(section);
      setReloadKey(0);
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
          handleNavClick={handleNavClick}
          setActiveSection={setActiveSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}

      {activeSection === "about" && (
        <About
          key={`about-${reloadKey}`}
          handleNavClick={handleNavClick}
          setActiveSection={setActiveSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}

      {activeSection === "skills" && (
        <Skills
          key={`skills-${reloadKey}`}
          handleNavClick={handleNavClick}
          setActiveSection={setActiveSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}

      {activeSection === "projects" && (
        <Projects
          key={`projects-${reloadKey}`}
          handleNavClick={handleNavClick}
          setActiveSection={setActiveSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}
    </>
  );
}
