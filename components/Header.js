"use client";

import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Header.css"; // Import only the necessary styles

export default function Header({ menuOpen, setMenuOpen, handleNavClick }) {
  return (
    <div className="hero-header">
      <div className="hero-name">
        Diluka<span className="Hero-fullName">Athukorala</span>
      </div>

      <div className="tabs desktop-nav">
        <input type="radio" id="nav-home" name="nav" defaultChecked />
        <label className="tab" htmlFor="nav-home">
          <a onClick={() => handleNavClick("hero")}>Home</a>
        </label>
        <input type="radio" id="nav-about" name="nav" />
        <label className="tab" htmlFor="nav-about">
          <a onClick={() => handleNavClick("about")}>About me</a>
        </label>
        <input type="radio" id="nav-skills" name="nav" />
        <label className="tab" htmlFor="nav-skills">
          <a onClick={() => handleNavClick("skills")}>Skills</a>
        </label>
        <input type="radio" id="nav-projects" name="nav" />
        <label className="tab" htmlFor="nav-projects">
          <a onClick={() => handleNavClick("portfolio")}>Projects</a>
        </label>
        <input type="radio" id="nav-contact" name="nav" />
        <label className="tab" htmlFor="nav-contact">
          <a onClick={() => handleNavClick("contact")}>Contact me</a>
        </label>
        <span className="glider"></span>
      </div>

      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  );
}
