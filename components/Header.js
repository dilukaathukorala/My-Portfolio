"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Header.css";

export default function Header({
  menuOpen,
  setMenuOpen,
  handleNavClick,
  activeSection,
}) {
  const containerRef = useRef(null);
  const tabRefs = {
    hero: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    portfolio: useRef(null),
    contact: useRef(null),
  };

  const [gliderPos, setGliderPos] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const ref = tabRefs[activeSection]?.current;
    const container = containerRef.current;

    if (ref && container) {
      const containerLeft = container.getBoundingClientRect().left;
      const { left, width } = ref.getBoundingClientRect();
      setGliderPos({ left: left - containerLeft, width });
    }
  }, [activeSection]);

  const navItems = {
    hero: "Home",
    about: "About me",
    skills: "Skills",
    portfolio: "Projects",
    contact: "Contact me",
  };

  return (
    <div className="hero-header">
      <div className="hero-name">
        Diluka<span className="Hero-fullName">Athukorala</span>
      </div>

      <div className="tabs desktop-nav" ref={containerRef}>
        {Object.entries(navItems).map(([key, label]) => (
          <div
            key={key}
            ref={tabRefs[key]}
            className={`tab ${activeSection === key ? "active" : ""}`}
            onClick={() => handleNavClick(key)}
          >
            <a>{label}</a>
          </div>
        ))}

        <span
          className="glider"
          style={{
            transform: `translateX(${gliderPos.left}px)`,
            width: `${gliderPos.width}px`,
            opacity: gliderPos.width === 0 ? 0 : 1,
          }}
        ></span>
      </div>

      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {menuOpen && (
        <div className="mobile-nav">
          {Object.entries(navItems).map(([key, label]) => (
            <a
              key={key}
              onClick={() => {
                handleNavClick(key);
                setMenuOpen(false);
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
