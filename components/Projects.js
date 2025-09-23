'use client';

import { useRef, useEffect, useState, forwardRef } from 'react';
import Image from 'next/image';
import '../styles/Projects.css';
import SocialMedia from "./SocialMedia";

const baseProjects = [
  {
    title: "EverPlant",
    images: ["/everplant1.png", "/everplant2.png", "/everplant3.png", "/everplant4.png"],
    description: "EverPlant is a visually engaging website for selling plants, developed using HTML, CSS, and JavaScript.",
    githubLink: "https://github.com/dilukaathukorala/EVERPLANT-Plant-Selling-Web-Application.git"
  },
  {
    title: "ToDo App",
    images: ["/placeholder.png", "/placeholder.png", "/placeholder.png", "/placeholder.png"],
    description: "A Kotlin-based ToDo app developed for a Mobile App Development module.",
    githubLink: "https://github.com/dilukaathukorala/ToDo-App.git"
  },
  {
    title: "Task Management Mobile App",
    images: ["/placeholder.png", "/placeholder.png", "/placeholder.png", "/placeholder.png"],
    description: "A task manager built with Kotlin and SQLite, featuring task creation, reminders, and a stopwatch.",
    githubLink: "https://github.com/dilukaathukorala/Task-Management-App.git"
  },
  {
    title: "Peacock Corridor Holiday House",
    images: ["/peacock1.png", "/peacock2.png", "/peacock3.png", "/peacock4.png"],
    description: "An inventory management system tailored for the Peacock Corridor Holiday House Resort.",
    githubLink: "https://github.com/dilukaathukorala/Peacock-Corridor-Holiday-House.git"
  },
  {
    title: "Ayurwell",
    images: ["/ayurwell1.png", "/ayurwell2.png", "/ayurwell3.png", "/ayurwell4.png"],
    description: "An Ayurvedic healthcare platform for booking doctor appointments and buying herbal products.",
    githubLink: "https://github.com/dilukaathukorala/Ayurwell.git"
  },
  {
    title: "Lens Learn",
    images: ["/placeholder.png", "/placeholder.png", "/placeholder.png", "/placeholder.png"],
    description: "A photography portfolio site built with Spring Boot, Thymeleaf, and AWS S3 cloud storage.",
    githubLink: "https://github.com/dilukaathukorala/Lens-Learn.git"
  }
];

export default function Project() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // 3x duplication supports seamless wrap-around
  const [projects] = useState([
    ...baseProjects,
    ...baseProjects,
    ...baseProjects
  ]);

  const isSmallScreen = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 1024px)').matches;

  const scrollToCard = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth; // full viewport width chunk
    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const recalcAndCenter = () => {
      // place at the start of the middle copy
      const oneLoop = container.scrollWidth / 3;
      container.style.scrollBehavior = 'auto';
      container.scrollLeft = oneLoop;
      requestAnimationFrame(() => (container.style.scrollBehavior = 'smooth'));
    };

    recalcAndCenter();

    const handleScroll = () => {
      const oneLoop = container.scrollWidth / 3;
      const viewWidth = container.clientWidth;
      const x = container.scrollLeft;

      // loop left
      if (x <= oneLoop * 0.5) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = x + oneLoop;
        requestAnimationFrame(() => (container.style.scrollBehavior = 'smooth'));
      }
      // loop right
      else if (x >= oneLoop * 2.5 - viewWidth) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = x - oneLoop;
        requestAnimationFrame(() => (container.style.scrollBehavior = 'smooth'));
      }
    };

    const handleResize = () => {
      recalcAndCenter();
    };

    // Desktop-only keyboard arrows
    const handleKeyDown = (e) => {
      if (isSmallScreen()) return; // ignore on tablet/mobile
      const sec = sectionRef.current;
      if (!sec) return;

      const active = document.activeElement;
      const withinSection = active && sec.contains(active);
      const allow = withinSection || active === document.body || active === document.documentElement;
      if (!allow) return;

      if (e.key === 'ArrowLeft' || e.key === 'Left') {
        e.preventDefault();
        scrollToCard('left');
      } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        e.preventDefault();
        scrollToCard('right');
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    // Entrance animations
    requestAnimationFrame(() => {
      // Fade in cards (all sizes)
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        setTimeout(() => card.classList.add('animate-in'), i * 100);
      });

      // Slide-in arrow buttons (DESKTOP ONLY)
      if (!isSmallScreen()) {
        setTimeout(() => {
          const leftBtn = document.querySelector('.arrow-button.left');
          const rightBtn = document.querySelector('.arrow-button.right');
          if (leftBtn && rightBtn) {
            leftBtn.classList.remove('arrow-hidden');
            rightBtn.classList.remove('arrow-hidden');
            leftBtn.classList.add('arrow-slide-left');
            rightBtn.classList.add('arrow-slide-right');
            leftBtn.style.pointerEvents = 'auto';
            rightBtn.style.pointerEvents = 'auto';
          }
        }, 800);
      }
    });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section className="projects-section" ref={sectionRef} tabIndex={-1} aria-label="Projects carousel">
      {/* ✅ Topic heading just below the nav bar */}
      <div className="projects-header">
        <h2 className="projects-topic">Projects</h2>
      </div>

      <div className="carousel-wrapper">
        {/* Hidden via CSS on <=1024px (buttons for desktop only) */}
        <button
          className="arrow-button left arrow-hidden"
          onClick={() => scrollToCard('left')}
          aria-label="Previous project"
        >
          &#10094;
        </button>

        <div className="cards-container" ref={containerRef}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              ref={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>

        <button
          className="arrow-button right arrow-hidden"
          onClick={() => scrollToCard('right')}
          aria-label="Next project"
        >
          &#10095;
        </button>
      </div>

      <SocialMedia />
    </section>
  );
}

const ProjectCard = forwardRef(({ project }, ref) => {
  const [centerIndex, setCenterIndex] = useState(0);
  const total = project.images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % total);
    }, 2000);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <div className="project-card" ref={ref}>
      <div className="card-inner">
        <div className="image-carousel-container">
          <div className="image-carousel">
            {project.images.map((src, idx) => {
              let position = "hidden";
              if (idx === centerIndex) position = "center";
              else if (idx === (centerIndex - 1 + total) % total) position = "left";
              else if (idx === (centerIndex + 1) % total) position = "right";

              return (
                <div key={idx} className={`carousel-image-wrapper ${position}`}>
                  <div className="carousel-frame">
                    <Image
                      src={src}
                      alt={`${project.title} ${idx + 1}`}
                      fill
                      sizes="(max-width: 480px) 140px,
                             (max-width: 768px) 180px,
                             180px"
                      className="carousel-image"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="github-link">
          View on GitHub
        </a>
      </div>
    </div>
  );
});
