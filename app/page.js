'use client';

import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLeaving, setIsLeaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Reset isLeaving after a section has loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(false); // allow next transition
    }, 600); // Match transition duration

    return () => clearTimeout(timer);
  }, [activeSection]);

  return (
    <>
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
