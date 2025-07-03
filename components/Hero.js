"use client";

import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';

export default function Hero() {
  const [cvStatus, setCvStatus] = useState('idle');
  const [rays, setRays] = useState([]);

  const handleDownload = () => {
    setCvStatus('loading');

    setTimeout(() => {
      setCvStatus('completed');
    }, 2000);

    const link = document.createElement('a');
    link.href = '/Diluka_CV.pdf';
    link.download = 'Diluka_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Fix hydration: generate random ray styles client-side only
  useEffect(() => {
    const raysData = [...Array(60)].map((_, i) => ({
      rotation: (360 / 60) * i,
      i: Math.floor(Math.random() * 800),
      dotSize: `${4 + Math.random() * 3}px`,
      speed: `${3 + Math.random()}1s`,
    }));
    setRays(raysData);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-header">
        <div className="hero-name">Diluka<span className="Hero-fullName">Athukorala</span></div>
        
        <div className="tabs">
          <input type="radio" id="nav-home" name="nav" defaultChecked />
          <label className="tab" htmlFor="nav-home">
            <a href="#hero">Home</a>
          </label>

          <input type="radio" id="nav-about" name="nav" />
          <label className="tab" htmlFor="nav-about">
            <a href="#about">About me</a>
          </label>

          <input type="radio" id="nav-skills" name="nav" />
          <label className="tab" htmlFor="nav-skills">
            <a href="#skills">Skills</a>
          </label>

          <input type="radio" id="nav-projects" name="nav" />
          <label className="tab" htmlFor="nav-projects">
            <a href="#portfolio">Projects</a>
          </label>

          <input type="radio" id="nav-contact" name="nav" />
          <label className="tab" htmlFor="nav-contact">
            <a href="#contact">Contact me</a>
          </label>

          <span className="glider"></span>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-left">
          <p className="hero-intro">Welcome to my portfolio!</p>
          <h1 className="hero-title">
            Hello, I am <span className="highlight">Diluka</span>.
          </h1>
          <p className="hero-description">
            I'm a full-stack web developer from Sri Lanka. <br />
            Currently studying at <span className="mention">Sri Lanka Institute of Information Technoilogy</span> as a IT Specialist.
          </p>

          <div className="hero-buttons">
            {cvStatus === 'completed' ? (
              <a href="/Diluka_CV.pdf" target="_blank" className="btn primary completed">
                Open
              </a>
            ) : (
              <button
                className={`btn primary ${cvStatus}`}
                onClick={handleDownload}
                disabled={cvStatus === 'loading'}
              >
                {cvStatus === 'loading' ? <span className="fill-bar" /> : 'Download CV'}
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
    </section>
  );
}
