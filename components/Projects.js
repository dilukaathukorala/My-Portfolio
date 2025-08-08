'use client';

import { useRef, useEffect, useState, forwardRef } from 'react';
import Image from 'next/image';
import '../styles/Projects.css';

const baseProjects = [
  {
    title: "EverPlant",
    images: ["/placeholder.png", "/placeholder.png", "/placeholder.png", "/placeholder.png"],
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
    images: ["/placeholder.png", "/placeholder.png", "/placeholder.png", "/placeholder.png"],
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
  const cardRefs = useRef([]);

  const [projects] = useState([
    ...baseProjects,
    ...baseProjects,
    ...baseProjects
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const third = container.scrollWidth / 3;
    container.scrollLeft = third;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const viewWidth = container.clientWidth;

      if (scrollLeft <= third * 0.5) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = scrollLeft + third;
        requestAnimationFrame(() => {
          container.style.scrollBehavior = 'smooth';
        });
      } else if (scrollLeft >= third * 2.5 - viewWidth) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = scrollLeft - third;
        requestAnimationFrame(() => {
          container.style.scrollBehavior = 'smooth';
        });
      }
    };

    container.addEventListener('scroll', handleScroll);

    requestAnimationFrame(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        setTimeout(() => {
          card.classList.add('animate-in');
        }, i * 100);
      });

      setTimeout(() => {
        const leftBtn = document.querySelector('.arrow-button.left');
        const rightBtn = document.querySelector('.arrow-button.right');

        if (leftBtn && rightBtn) {
          leftBtn.classList.remove('arrow-hidden');
          rightBtn.classList.remove('arrow-hidden');
          leftBtn.classList.add('arrow-slide-left');
          rightBtn.classList.add('arrow-slide-right');

          // ✅ Ensure buttons are clickable
          leftBtn.style.pointerEvents = 'auto';
          rightBtn.style.pointerEvents = 'auto';
        }
      }, 800);
    });

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCard = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="projects-section">
      <h2 className="projects-title">Projects</h2>

      <div className="carousel-wrapper">
        <button className="arrow-button left arrow-hidden" onClick={() => scrollToCard('left')}>&#10094;</button>

        <div className="cards-container" ref={containerRef}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              ref={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>

        <button className="arrow-button right arrow-hidden" onClick={() => scrollToCard('right')}>&#10095;</button>
      </div>
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
                    <Image src={src} alt={`${project.title} ${idx}`} fill className="carousel-image" />
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
