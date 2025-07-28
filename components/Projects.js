'use client';

import { useRef, useEffect, useState, forwardRef } from 'react';
import Image from 'next/image';
import '../styles/Projects.css';

const baseProjects = [
  {
    title: "EverPlant",
    images: ["/placeholder.png", "/placeholder.png", "/placeholder.png", "/placeholder.png"],
    description: "EverPlant is a visually engaging website for selling plants, developed using HTML, CSS, and JavaScript. It emphasizes a modern, clean UI to deliver a smooth browsing experience for users exploring plant products.",
    githubLink: "https://github.com/dilukaathukorala/EVERPLANT-Plant-Selling-Web-Application.git"
  },
  {
    title: "ToDo App",
    images: ["/placeholder.png", "/placeholder.png", "/placeholder.png", "/placeholder.png"],
    description: "A Kotlin-based ToDo app developed for a Mobile App Development module. Offers full task CRUD, task categorization, and a clean UI for efficient task management.",
    githubLink: "https://github.com/dilukaathukorala/ToDo-App.git"
  },
  {
    title: "Task Management Mobile App",
    images: ["/placeholder.png", "/placeholder.png", "/placeholder.png", "/placeholder.png"],
    description: "A task manager built with Kotlin and SQLite, featuring task creation, reminders, and a stopwatch to boost productivity. Designed for Android devices.",
    githubLink: "https://github.com/dilukaathukorala/Task-Management-App.git"
  },
  {
    title: "Peacock Corridor Holiday House",
    images: ["/placeholder.png", "/placeholder.png", "/placeholder.png", "/placeholder.png"],
    description: "An inventory management system tailored for the Peacock Corridor Holiday House Resort.",
    githubLink: "https://github.com/dilukaathukorala/Peacock-Corridor-Holiday-House.git"
  },
  {
    title: "Ayurwell",
    images: ["/placeholder.png", "/placeholder.png", "/placeholder.png", "/placeholder.png"],
    description: "An Ayurvedic healthcare platform for booking doctor appointments, locating specialists, and buying herbal products — blending tradition with tech.",
    githubLink: "https://github.com/dilukaathukorala/Ayurwell.git"
  },
  {
    title: "Lens Learn",
    images: ["/placeholder.png", "/placeholder.png", "/placeholder.png", "/placeholder.png"],
    description: "A photography portfolio site built with Spring Boot, Thymeleaf, and Bootstrap. Features photo uploads, category filtering, and AWS S3 cloud storage.",
    githubLink: "https://github.com/dilukaathukorala/Lens-Learn.git"
  }
];

export default function Project() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  const [projects, setProjects] = useState([...baseProjects, ...baseProjects, ...baseProjects]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scroll to middle clone on load
    const third = container.scrollWidth / 3;
    container.scrollLeft = third;

    requestAnimationFrame(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        setTimeout(() => {
          card.classList.add('animate-in');
        }, i * 100);
      });
    });
  }, [projects]);

  const scrollToCard = (direction) => {
    const container = containerRef.current;
    const cardWidth = container.offsetWidth;

    if (!container) return;

    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    // Reset to middle clone if at edges
    setTimeout(() => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth;
      const third = maxScroll / 3;

      if (scrollLeft <= 0) {
        container.scrollLeft = scrollLeft + third;
      } else if (scrollLeft + container.clientWidth >= maxScroll) {
        container.scrollLeft = scrollLeft - third;
      }
    }, 350);
  };

  return (
    <section className="projects-section">
      <h2 className="projects-title">Projects</h2>

      <div className="carousel-wrapper">
        <button className="arrow-button left" onClick={() => scrollToCard('left')}>&#10094;</button>

        <div className="cards-container" ref={containerRef}>
          {projects.map((project, index) => (
            <ProjectCard project={project} key={index} ref={(el) => (cardRefs.current[index] = el)} />
          ))}
        </div>

        <button className="arrow-button right" onClick={() => scrollToCard('right')}>&#10095;</button>
      </div>
    </section>
  );
}

const ProjectCard = forwardRef(({ project }, ref) => {
  const [centerIndex, setCenterIndex] = useState(0);
  const total = project.images.length;

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
                    <Image src={src} alt={`${project.title} ${idx}`} fill className="carousel-image" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
});
