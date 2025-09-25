"use client";

import React from "react";
import { createPortal } from "react-dom";
import "../styles/SocialMedia.css";

export default function SocialMedia() {
  const [mounted, setMounted] = React.useState(false);
  const [rootEl, setRootEl] = React.useState(null);

  React.useEffect(() => {
    const existing = document.querySelector('[data-social-icons-root="true"]');
    if (existing) {
      setRootEl(existing);
      setMounted(true);
      return;
    }
    const el = document.createElement("div");
    el.setAttribute("data-social-icons-root", "true");
    document.body.appendChild(el);
    setRootEl(el);
    setMounted(true);
  }, []);

  if (!mounted || !rootEl) return null;

  // Touch flow: pre-open a blank tab (user gesture) -> animate -> set its URL.
  function handlePointerDown(e, href) {
    if (e.pointerType !== "touch") return;

    const link = e.currentTarget;
    const fillEl = link.querySelector(".filled");
    if (!fillEl) return;

    // If already animating, ignore duplicates
    if (link.classList.contains("is-activating")) return;

    // Mark so the following click doesn't re-fire navigation
    link.dataset.blockClick = "1";

    // --- Critical bit: pre-open a tab in direct gesture ---
    // Some browsers may still block; we'll handle null with a fallback.
    const preOpened = window.open("", "_blank", "noopener,noreferrer");

    // Start slow fill
    link.classList.add("is-activating");

    const onEnd = (ev) => {
      if (ev.propertyName !== "height") return;
      fillEl.removeEventListener("transitionend", onEnd);

      // Navigate the pre-opened tab if available; else fallback.
      if (preOpened && !preOpened.closed) {
        try {
          preOpened.location.href = href;
        } catch {
          // If we can't set it for some reason, fallback
          window.location.href = href; // same-tab fallback
        }
      } else {
        // Same-tab fallback avoids popup blockers entirely
        window.location.href = href;
      }

      // Cleanup so it can animate again if user returns
      setTimeout(() => {
        link.classList.remove("is-activating");
        delete link.dataset.blockClick;
      }, 200);
    };

    // Prevent the immediate native navigation so we can animate first
    e.preventDefault();
    fillEl.addEventListener("transitionend", onEnd);
  }

  // Desktop/mouse: let the anchor behave normally (open in new tab via target).
  // If a touch activation just happened, suppress this click.
  function handleClick(e) {
    const link = e.currentTarget;
    if (link.dataset.blockClick === "1" || link.classList.contains("is-activating")) {
      e.preventDefault();
    }
  }

  const icons = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/diluka-athukorala-703247214/",
      viewBox: "0 0 24 24",
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
    },
    {
      name: "GitHub",
      href: "https://github.com/dilukaathukorala",
      viewBox: "0 0 16 16",
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
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/dilu_athukorala/",
      viewBox: "0 0 512 512",
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
    },
  ];

  const list = (
    <ul className="social-icons" aria-label="Social media links">
      {icons.map((icon) => (
        <li className="icon-content" key={icon.name}>
          <a
            href={icon.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={icon.name}
            data-social={icon.name.toLowerCase()}
            onPointerDown={(e) => handlePointerDown(e, icon.href)}  // touch flow with pre-open
            onClick={handleClick}                                    // mouse flow
          >
            <div className="filled" />
            <svg
              className="icon-svg"
              xmlns="http://www.w3.org/2000/svg"
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

  return createPortal(list, rootEl);
}
