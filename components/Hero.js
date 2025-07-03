"use client";

import React, { useState, useEffect } from "react";
import "../styles/Hero.css";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Hero() {
  const [cvStatus, setCvStatus] = useState("idle");
  const [rays, setRays] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

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
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
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

  return (
    <section id="hero" className="hero-section">
      {/* Header */}
      <div className="hero-header">
        <div className="hero-name">
          Diluka<span className="Hero-fullName">Athukorala</span>
        </div>

        <div className="tabs desktop-nav">
          <input type="radio" id="nav-home" name="nav" defaultChecked />
          <label className="tab" htmlFor="nav-home"><a href="#hero">Home</a></label>
          <input type="radio" id="nav-about" name="nav" />
          <label className="tab" htmlFor="nav-about"><a href="#about">About me</a></label>
          <input type="radio" id="nav-skills" name="nav" />
          <label className="tab" htmlFor="nav-skills"><a href="#skills">Skills</a></label>
          <input type="radio" id="nav-projects" name="nav" />
          <label className="tab" htmlFor="nav-projects"><a href="#portfolio">Projects</a></label>
          <input type="radio" id="nav-contact" name="nav" />
          <label className="tab" htmlFor="nav-contact"><a href="#contact">Contact me</a></label>
          <span className="glider"></span>
        </div>

        <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="menu-backdrop" onClick={closeMenu}></div>
          <div className="mobile-menu">
            <a href="#hero" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About me</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#portfolio" onClick={closeMenu}>Projects</a>
            <a href="#contact" onClick={closeMenu}>Contact me</a>
          </div>
        </>
      )}

      <div className="hero-content">
        <div className="hero-left">
          <p className="hero-intro">Welcome to my portfolio!</p>
          <h1 className="hero-title">
            Hello, I am <span className="highlight">Diluka</span>.
          </h1>
          <p className="hero-description">
            I'm a full-stack web developer from Sri Lanka. <br />
            Currently studying at <span className="mention">Sri Lanka Institute of Information Technology</span> as an IT Specialist.
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
            <a href="#portfolio" className="btn secondary">See my work →</a>
          </div>
        </div>

        <div className="hero-right">
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
        </div>
      </div>

      <ul className="example-2 fixed-icons">
        <li className="icon-content">
          <a href="https://linkedin.com/" aria-label="LinkedIn" data-social="linkedin">
            <div className="filled"></div>
            <svg className="icon-svg" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 16 16">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 
              1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 
              1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 
              3.226 2.4 3.934c0 .694.521 1.248 1.327 
              1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 
              1.232-.878.869 0 1.216.662 1.216 
              1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 
              0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 
              0 7.225 0 7.225z" />
            </svg>
          </a>
          <div className="tooltip">LinkedIn</div>
        </li>

        <li className="icon-content">
          <a href="https://github.com/" aria-label="GitHub" data-social="github">
            <div className="filled"></div>
            <svg className="icon-svg" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 
              3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 
              1.08.58 1.23.82.72 1.21 1.87.87 
              2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 
              0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 
              0 0 .67-.21 2.2.82.64-.18 
              1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 
              2.2-.82 2.2-.82.44 1.1.16 1.92.08 
              2.12.51.56.82 1.27.82 2.15 
              0 3.07-1.87 3.75-3.65 
              3.95.29.25.54.73.54 
              1.48 0 1.07-.01 1.93-.01 
              2.2 0 .21.15.46.55.38A8.01 8.01 
              0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
          </a>
          <div className="tooltip">GitHub</div>
        </li>

        <li className="icon-content">
          <a href="https://www.instagram.com/dilu_athukorala/" aria-label="Instagram" data-social="instagram">
            <div className="filled"></div>
            <svg className="icon-svg" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 512 512">
              <path d="M349.33,69.33H162.67A93.34,93.34,0,0,0,69.33,162.67v186.66A93.34,93.34,0,0,0,162.67,
              442.67h186.66A93.34,93.34,0,0,0,442.67,349.33V162.67A93.34,93.34,0,0,0,349.33,69.33ZM464,
              349.33A114.68,114.68,0,0,1,349.33,464H162.67A114.68,114.68,0,0,1,48,349.33V162.67A114.68,
              114.68,0,0,1,162.67,48H349.33A114.68,114.68,0,0,1,464,162.67ZM256,144a112,112,0,1,0,112,
              112A112,112,0,0,0,256,144Zm0,186.67A74.67,74.67,0,1,1,330.67,256,74.77,74.77,0,0,1,
              256,330.67ZM370.67,144a26.67,26.67,0,1,0,26.66,26.67A26.69,26.69,0,0,0,370.67,144Z" />
            </svg>
          </a>
          <div className="tooltip">Instagram</div>
        </li>
      </ul>
    </section>
  );
}