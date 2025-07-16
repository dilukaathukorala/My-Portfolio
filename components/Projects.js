'use client';

import { useLayoutEffect, useRef, useEffect } from 'react';
import Image from 'next/image';
import '../styles/Projects.css';

const baseProjects = [
  {
    title: "EverPlant",
    imageSrc: "/everplant logo.png",
    imageClass: "everplant-image",
    description: "EverPlant is a basic yet visually engaging website for selling plants, developed using HTML, CSS, and JavaScript. The project emphasizes a modern, clean UI to deliver a smooth and attractive browsing experience for users exploring plant products.",
    githubLink: "https://github.com/dilukaathukorala/EVERPLANT-Plant-Selling-Web-Application.git"
  },
  {
    title: "ToDo App",
    imageSrc: "/images/rick.png",
    imageClass: "todo-image",
    description: "Developed as part of a Mobile Application Development module, this Kotlin-based ToDo app offers a streamlined solution for managing daily tasks. Core features include full task CRUD functionality (create, read, update, delete), task categorization by type or priority, and a clean, user-friendly interface to ensure a smooth and intuitive user experience.",
    githubLink: "https://github.com/dilukaathukorala/ToDo-App.git"
  },
  {
    title: "Task Management Mobile App",
    imageSrc: "/images/morty.png",
    imageClass: "task-management-image",
    description: "A simple and efficient task management app built with Kotlin and SQLite. It allows users to create, read, update, and delete tasks, set reminders, and use a built-in stopwatch to track time spent on tasks. Designed for productivity and ease of use on Android devices.",
    githubLink: "https://github.com/dilukaathukorala/Task-Management-App.git"
  },
  {
    title: "Peacock Corridor Holiday House",
    imageSrc: "/images/peacock.png",
    imageClass: "peacock-image",
    description: "Inventory management for Peacock Corridor Holiday House Resort.",
    githubLink: "https://github.com/dilukaathukorala/Peacock-Corridor-Holiday-House.git"
  },
  {
    title: "Ayurwell",
    imageSrc: "/Ayurwell.png",
    imageClass: "ayurwell-image",
    description: "A smart Ayurvedic healthcare platform for booking doctor appointments, finding nearby specialists, and purchasing herbal products blending traditional healing with modern convenience.",
    githubLink: "https://github.com/dilukaathukorala/Ayurwell.git"
  },
  {
    title: "Lens Learn",
    imageSrc: "/images/lens.png",
    imageClass: "lens-learn-image",
    description: "A responsive photography portfolio website built with Spring Boot, Thymeleaf, and Bootstrap. Features user auth, photo uploads, category filtering, and AWS S3 integration for cloud storage.",
    githubLink: "https://github.com/dilukaathukorala/Lens-Learn.git"
  }
];

const repeatedProjects = Array.from({ length: 100 }, (_, i) => baseProjects[i % baseProjects.length]);

export default function Project() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  // Scroll to the 3rd card on mount
  useLayoutEffect(() => {
    const container = containerRef.current;
    const desiredIndex = 2;

    const desiredCard = cardRefs.current[desiredIndex];
    if (container && desiredCard) {
      const scrollTo =
        desiredCard.offsetLeft +
        desiredCard.offsetWidth / 2 -
        container.clientWidth / 2;

      container.scrollLeft = scrollTo;
      updateTransforms();
    }
  }, []);

  // Apply entry animation
  useEffect(() => {
    requestAnimationFrame(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        setTimeout(() => {
          card.classList.add('animate-in');
        }, i * 10); // staggered animation
      });
    });
  }, []);

  const updateTransforms = () => {
    const container = containerRef.current;
    const centerX = container.scrollLeft + container.offsetWidth / 2;
    const cards = cardRefs.current;

    cards.forEach((card) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const offset = cardCenter - centerX;
      const scale = 1 - Math.min(Math.abs(offset) / container.offsetWidth, 1) * 0.6;
      const zIndex = 1000 - Math.abs(Math.round(offset));
      const opacity = 0.4 + (1 - Math.min(Math.abs(offset) / container.offsetWidth, 1)) * 0.6;

      card.style.transform = `scale(${scale})`;
      card.style.zIndex = zIndex;
      card.style.opacity = opacity;
    });
  };

  const snapToCenter = () => {
    const container = containerRef.current;
    const centerX = container.scrollLeft + container.offsetWidth / 2;
    const cards = cardRefs.current;

    let closestCard = null;
    let minDist = Infinity;

    cards.forEach((card) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - centerX);
      if (dist < minDist) {
        minDist = dist;
        closestCard = card;
      }
    });

    if (closestCard) {
      const scrollTo = closestCard.offsetLeft + closestCard.offsetWidth / 2 - container.offsetWidth / 2;
      container.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    updateTransforms();
    clearTimeout(containerRef.current._snapTimeout);
    containerRef.current._snapTimeout = setTimeout(snapToCenter, 150);
  };

  return (
    <section className="projects-section">
      <h2 className="projects-title">Projects</h2>
      <div
        className="cards-container"
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div className="spacer" />
        {repeatedProjects.map((project, index) => (
          <div
            className="project-card"
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
          >
           <Image
              src={project.imageSrc}
              alt={project.title}
              width={300}
              height={200}
              className={`project-image ${project.imageClass || ""}`}
            />

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
        ))}
        <div className="spacer" />
      </div>
    </section>
  );
}
