'use client';

import React, { useState, useEffect } from "react";
import "../styles/Hero.css";
import Header from "./Header";
import SocialMedia from "./SocialMedia";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero({
  handleNavClick,
  setActiveSection,
  menuOpen,
  setMenuOpen,
  reloadKey
}) {
  const [cvStatus, setCvStatus] = useState("idle");
  const [rays, setRays] = useState([]);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const raysData = Array.from({ length: 60 }, (_, i) => ({
      rotation: (360 / 60) * i,
      i: Math.floor(Math.random() * 100),
      dotSize: `${4 + Math.random() * 3}px`,
      speed: `${3 + Math.random()}1s`,
    }));
    setRays(raysData);
  }, [reloadKey]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
  }, [menuOpen]);

  const handleDownload = () => {
    setCvStatus("loading");
    setTimeout(() => {
      setCvStatus("completed");
    }, 2000);

    const link = document.createElement("a");
    link.href = "/Diluka_CV.pdf";
    link.download = "Diluka_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeMenu = () => setMenuOpen(false);

  // ✅ This sets the active section with animation delay
  const handleLeave = (section) => {
    const normalized = section.toLowerCase(); // normalize for safety
    setIsLeaving(true);
    setTimeout(() => {
      setActiveSection(normalized); // ✅ must match section keys
      setIsLeaving(false);
    }, 500);
  };

  return (
    <section id="hero" className="hero-section">
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        handleNavClick={handleLeave}
      />

      {menuOpen && (
        <>
          <div className="menu-backdrop" onClick={closeMenu}></div>
          <div className="mobile-menu">
            <a onClick={() => { closeMenu(); handleLeave("hero"); }}>Home</a>
            <a onClick={() => { closeMenu(); handleLeave("about"); }}>About me</a>
            <a onClick={() => { closeMenu(); handleLeave("skills"); }}>Skills</a>
            <a onClick={() => { closeMenu(); handleLeave("projects"); }}>Projects</a> {/* ✅ FIXED */}
            <a onClick={() => { closeMenu(); handleLeave("contact"); }}>Contact me</a>
          </div>
        </>
      )}

      <div className="hero-content">
        <AnimatePresence mode="wait">
          {!isLeaving && (
            <>
              <motion.div
                className="hero-left"
                key={`hero-left-${reloadKey}`}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <p className="hero-intro">Welcome to my portfolio!</p>
                <h1 className="hero-title">
                  Hello, I am <span className="highlight">Diluka</span>.
                </h1>
                <p className="hero-description">
                  Full-stack web developer from Sri Lanka. <br /><br />
                  Currently studying at <span className="mention">Sri Lanka Institute of Information Technology</span> as an IT Specialist Undergraduate. (<span className="sup">3<sup>rd</sup></span> Year)
                </p>

                <div className="hero-buttons">
                  {cvStatus === "completed" ? (
                    <a href="/Diluka_CV.pdf" target="_blank" className="btn primary completed">
                      Open CV<span className="doc">📄</span>
                    </a>
                  ) : (
                    <button
                      className={`btn primary ${cvStatus}`}
                      onClick={handleDownload}
                      disabled={cvStatus === "loading"}
                    >
                      {cvStatus === "loading" ? <span className="fill-bar" /> : "Download CV"}
                    </button>
                  )}

                  {/* ✅ FIXED: Call correct section key */}
                  <button
                    className="btn secondary"
                    onClick={() => handleLeave("projects")} // ✅ this must match your rendering logic
                  >
                    See my Projects <span className="arrow">➜</span>
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="hero-right"
                key={`hero-right-${reloadKey}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="back-ray-emitter">
                  {rays.map((ray, i) => (
                    <div
                      key={i}
                      className="dot-ray"
                      style={{
                        transform: `rotate(${ray.rotation}deg)`,
                        '--i': ray.i,
                        '--dot-size': ray.dotSize,
                        '--speed': ray.speed,
                      }}
                    />
                  ))}
                </div>

                <div className="hero-image-frame">
                  <img
                    src="/Portfolio.jpg"
                    alt="Diluka Athukorala"
                    className="hero-image"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <SocialMedia />
    </section>
  );
}
