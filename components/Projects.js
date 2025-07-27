'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import '../styles/Projects.css';

const baseProjects = [
  {
    title: "EverPlant",
    imageSrc: "/everplant logo.png",
    imageClass: "everplant-image",
    description: "EverPlant is a visually engaging website for selling plants, developed using HTML, CSS, and JavaScript. It emphasizes a modern, clean UI to deliver a smooth browsing experience for users exploring plant products.",
    githubLink: "https://github.com/dilukaathukorala/EVERPLANT-Plant-Selling-Web-Application.git"
  },
  {
    title: "ToDo App",
    imageSrc: "/images/rick.png",
    imageClass: "todo-image",
    description: "A Kotlin-based ToDo app developed for a Mobile App Development module. Offers full task CRUD, task categorization, and a clean UI for efficient task management.",
    githubLink: "https://github.com/dilukaathukorala/ToDo-App.git"
  },
  {
    title: "Task Management Mobile App",
    imageSrc: "/images/morty.png",
    imageClass: "task-management-image",
    description: "A task manager built with Kotlin and SQLite, featuring task creation, reminders, and a stopwatch to boost productivity. Designed for Android devices.",
    githubLink: "https://github.com/dilukaathukorala/Task-Management-App.git"
  },
  {
    title: "Peacock Corridor Holiday House",
    imageSrc: "/images/peacock.png",
    imageClass: "peacock-image",
    description: "An inventory management system tailored for the Peacock Corridor Holiday House Resort.",
    githubLink: "https://github.com/dilukaathukorala/Peacock-Corridor-Holiday-House.git"
  },
  {
    title: "Ayurwell",
    imageSrc: "/Ayurwell.png",
    imageClass: "ayurwell-image",
    description: "An Ayurvedic healthcare platform for booking doctor appointments, locating specialists, and buying herbal products — blending tradition with tech.",
    githubLink: "https://github.com/dilukaathukorala/Ayurwell.git"
  },
  {
    title: "Lens Learn",
    imageSrc: "/images/lens.png",
    imageClass: "lens-learn-image",
    description: "A photography portfolio site built with Spring Boot, Thymeleaf, and Bootstrap. Features photo uploads, category filtering, and AWS S3 cloud storage.",
    githubLink: "https://github.com/dilukaathukorala/Lens-Learn.git"
  }
];

export default function Project() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        setTimeout(() => {
          card.classList.add('animate-in');
        }, i * 100);
      });
    });
  }, []);

  const scrollToCard = (direction) => {
    const container = containerRef.current;
    const cardWidth = container.offsetWidth;

    if (direction === 'left') {
      container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    } else if (direction === 'right') {
      container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="projects-section">
      <h2 className="projects-title">Projects</h2>

      <div className="carousel-wrapper">
        <button className="arrow-button left" onClick={() => scrollToCard('left')}>&#10094;</button>

        <div className="cards-container" ref={containerRef}>
          {baseProjects.map((project, index) => (
            <div
              className="project-card"
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <div className="card-inner">
                <div className="image-wrapper">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    layout="responsive"
                    width={16}
                    height={9}
                    className={`project-image ${project.imageClass || ""}`}
                  />
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
          ))}
        </div>

        <button className="arrow-button right" onClick={() => scrollToCard('right')}>&#10095;</button>
      </div>
    </section>
  );
}
