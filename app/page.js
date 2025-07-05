'use client';

import { useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <>
      {activeSection === "hero" && (
        <Hero setActiveSection={setActiveSection} />
      )}
      {activeSection === "about" && (
        <About />
      )}
    </>
  );
}
