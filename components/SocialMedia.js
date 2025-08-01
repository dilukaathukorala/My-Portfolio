"use client";

import React from "react";
import "../styles/SocialMedia.css";

export default function SocialMedia() {
  const icons = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/diluka-athukorala-703247214/",
      svgPath: (
        <path
          fill="currentColor"
          d="M19 0h-14c-2.761 0-5 2.239-5 
          5v14c0 2.761 2.239 5 5 
          5h14c2.761 0 5-2.239 
          5-5v-14c0-2.761-2.239-5-5-5zm-11 
          19h-3v-9h3v9zm-1.5-10.268c-.966 
          0-1.75-.784-1.75-1.75s.784-1.75 
          1.75-1.75 1.75.784 
          1.75 1.75-.784 1.75-1.75 
          1.75zm13.5 10.268h-3v-4.5c0-1.105-.895-2-2-2s-2 
          .895-2 2v4.5h-3v-9h3v1.354c.69-.859 
          1.768-1.354 3-1.354 2.206 
          0 4 1.794 4 4v5z"
        />
      ),
      viewBox: "0 0 24 24",
      fill: "#0274b3",
    },
    {
      name: "GitHub",
      href: "https://github.com/dilukaathukorala",
      svgPath: (
        <path
          fill="currentColor"
          d="M8 0C3.58 0 0 3.58 0 
          8c0 3.54 2.29 6.53 5.47 
          7.59.4.07.55-.17.55-.38 
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
          0 0 0 16 8c0-4.42-3.58-8-8-8z"
        />
      ),
      viewBox: "0 0 16 16",
      fill: "#24262a",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/dilu_athukorala/",
      svgPath: (
        <path
          fill="currentColor"
          d="M349.33,69.33H162.67A93.34,93.34,0,0,0,69.33,162.67v186.66A93.34,93.34,0,0,0,162.67,
          442.67h186.66A93.34,93.34,0,0,0,442.67,349.33V162.67A93.34,93.34,0,0,0,349.33,69.33ZM464,
          349.33A114.68,114.68,0,0,1,349.33,464H162.67A114.68,114.68,0,0,1,48,349.33V162.67A114.68,
          114.68,0,0,1,162.67,48H349.33A114.68,114.68,0,0,1,464,162.67ZM256,144a112,112,0,1,0,112,
          112A112,112,0,0,0,256,144Zm0,186.67A74.67,74.67,0,1,1,330.67,256,74.77,74.77,0,0,1,
          256,330.67ZM370.67,144a26.67,26.67,0,1,0,26.66,26.67A26.69,26.69,0,0,0,370.67,144Z"
        />
      ),
      viewBox: "0 0 512 512",
      fill: "linear-gradient(45deg,#405de6,#5b51db,#b33ab4,#c135b4,#e1306c,#fd1f1f)",
    },
  ];

  return (
    <ul className="social-icons">
      {icons.map((icon, index) => (
        <li className="icon-content" key={index}>
          <a
            href={icon.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={icon.name}
            data-social={icon.name.toLowerCase()}
          >
            <div className="filled" />
            <svg
              className="icon-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox={icon.viewBox}
            >
              {icon.svgPath}
            </svg>
          </a>
          <div className="tooltip">{icon.name}</div>
        </li>
      ))}
    </ul>
  );
}
