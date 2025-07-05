'use client';

import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Header from '../components/Header';

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLeaving, setIsLeaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLeaving(false), 600);
    return () => clearTimeout(timer);
  }, [activeSection]);

  const handleNavClick = (section) => {
    if (section !== activeSection) {
      setIsLeaving(true);
      setTimeout(() => {
        setActiveSection(section);
      }, 300);
    }
  };

  return (
    <>
      {/* ✅ Render Header ONCE */}
      <Header
        activeSection={activeSection}
        handleNavClick={handleNavClick}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* ✅ Section-based rendering */}
      {activeSection === "hero" && (
        <Hero
          isLeaving={isLeaving}
          setIsLeaving={setIsLeaving}
          setActiveSection={setActiveSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}
      {activeSection === "about" && (
        <About
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
