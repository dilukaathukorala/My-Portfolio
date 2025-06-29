'use client'
import { useState } from 'react';
import '../styles/Navbar.css';

const navItems = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <nav className="navbar-container">
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`nav-item ${index === activeIndex ? 'active' : ''}`}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}
