'use client';

import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Header from '../components/Header';
import Skills from '../components/Skills';

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLeaving, setIsLeaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0); // 👈 Used to force remount

  const handleNavClick = (section) => {
    setIsLeaving(true);

    setTimeout(() => {
      // 👇 Whether you're navigating to same OR different section
      setActiveSection(section);

      if (section === activeSection) {
        setReloadKey((prev) => prev + 1); // 👈 Force reload of the same section
      }

      setIsLeaving(false);
    }, 300);
  };

  return (
    <>
      {/* ✅ Header */}
      <Header
        activeSection={activeSection}
        handleNavClick={handleNavClick}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* ✅ Conditional rendering with reloadKey to force reload */}
      {activeSection === "hero" && (
        <Hero
          key={`hero-${reloadKey}`}
          isLeaving={isLeaving}
          setIsLeaving={setIsLeaving}
          setActiveSection={setActiveSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}

      {activeSection === "about" && (
        <About
          key={`about-${reloadKey}`}
          isLeaving={isLeaving}
          setIsLeaving={setIsLeaving}
          setActiveSection={setActiveSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}

      {activeSection === "skills" && (
        <Skills
          key={`skills-${reloadKey}`}
          isLeaving={isLeaving}
          setIsLeaving={setIsLeaving}
          setActiveSection={setActiveSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}
    </>
  );
}
