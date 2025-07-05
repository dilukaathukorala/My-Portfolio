"use client";

import React, { useState, useEffect } from "react";
import "../styles/Hero.css";
import Header from "./Header";
import SocialMedia from "./SocialMedia";
import { motion } from "framer-motion";

export default function Hero({ setActiveSection }) {
  const [cvStatus, setCvStatus] = useState("idle");
  const [rays, setRays] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const raysData = [...Array(60)].map((_, i) => ({
      rotation: (360 / 60) * i,
      i: Math.floor(Math.random() * 800),
      dotSize: `${4 + Math.random() * 3}px`,
      speed: `${3 + Math.random()}1s`,
    }));
    setRays(raysData);
  }, []);

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

  const handleNavClick = (section) => {
    setIsLeaving(true);
    setTimeout(() => {
      setActiveSection(section);
    }, 600);
  };

  return (
    <section id="hero" className="hero-section">
      {/* ✅ Header Component */}
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        handleNavClick={handleNavClick}
      />

      {/* ✅ Mobile Menu */}
      {menuOpen && (
        <>
          <div className="menu-backdrop" onClick={closeMenu}></div>
          <div className="mobile-menu">
            <a onClick={() => { closeMenu(); handleNavClick("hero"); }}>Home</a>
            <a onClick={() => { closeMenu(); handleNavClick("about"); }}>About me</a>
            <a onClick={() => { closeMenu(); handleNavClick("skills"); }}>Skills</a>
            <a onClick={() => { closeMenu(); handleNavClick("portfolio"); }}>Projects</a>
            <a onClick={() => { closeMenu(); handleNavClick("contact"); }}>Contact me</a>
          </div>
        </>
      )}

      {/* ✅ Hero Content */}
      <div className="hero-content">
        <motion.div
          className="hero-left"
          initial={{ opacity: 1, x: 0 }}
          animate={isLeaving ? { opacity: 0, x: -100 } : { opacity: 1, x: 0 }}
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
              <a href="/Diluka_CV.pdf" target="_blank" className="btn primary completed">Open CV</a>
            ) : (
              <button
                className={`btn primary ${cvStatus}`}
                onClick={handleDownload}
                disabled={cvStatus === "loading"}
              >
                {cvStatus === "loading" ? <span className="fill-bar" /> : "Download CV"}
              </button>
            )}
            <button className="btn secondary" onClick={() => handleNavClick("about")}>
             See my Projects <span className="arrow">➜</span>
            </button>

          </div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 1, x: 0 }}
          animate={isLeaving ? { opacity: 0, x: 100 } : { opacity: 1, x: 0 }}
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
      </div>

      {/* ✅ Fixed Social Icons (Modularized) */}
      <SocialMedia />
    </section>
  );
}
