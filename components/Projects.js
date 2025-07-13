'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import '../styles/Projects.css';

const projects = [
  {
    title: "Rick's Portal Tracker",
    imageSrc: "/images/rick.png",
    description: "Track Rick's interdimensional travels.",
    githubLink: "https://github.com/yourusername/ricks-portal-tracker"
  },
  {
    title: "Morty's Journal",
    imageSrc: "/images/morty.png",
    description: "A personal journal built with Next.js.",
    githubLink: "https://github.com/yourusername/morty-journal"
  },
  {
    title: "Summer’s Scheduler",
    imageSrc: "/images/summer.png",
    description: "Plan your summer events and tasks.",
    githubLink: "https://github.com/yourusername/summer-scheduler"
  },
  {
    title: "Beth's Organizer",
    imageSrc: "/images/beth.png",
    description: "A minimalist productivity app.",
    githubLink: "https://github.com/yourusername/beth-organizer"
  }
];

export default function Project() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const updateTransforms = () => {
      const centerX = container.scrollLeft + container.offsetWidth / 2;
      const cards = Array.from(container.children).filter(el => el.classList.contains('project-card'));

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const offset = cardCenter - centerX;

        const scale = 1 - Math.min(Math.abs(offset) / container.offsetWidth, 1) * 0.4;
        const zIndex = 1000 - Math.abs(Math.round(offset));
        const opacity = 0.4 + (1 - Math.min(Math.abs(offset) / container.offsetWidth, 1)) * 0.6;

        card.style.transform = `scale(${scale})`;
        card.style.zIndex = zIndex;
        card.style.opacity = opacity;
      });
    };

    const snapToCenter = () => {
      const centerX = container.scrollLeft + container.offsetWidth / 2;
      const cards = Array.from(container.children).filter(el => el.classList.contains('project-card'));

      let closestCard = null;
      let minDist = Infinity;

      cards.forEach((card) => {
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

    const onScroll = () => {
      updateTransforms();
      clearTimeout(container._snapTimeout);
      container._snapTimeout = setTimeout(snapToCenter, 100);
    };

    container.addEventListener('scroll', onScroll);
    window.addEventListener('resize', updateTransforms);
    updateTransforms();

    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateTransforms);
    };
  }, []);

  return (
    <section className="projects-section">
      <h2 className="projects-title">Projects</h2>
      <div className="cards-container" ref={containerRef}>
        <div className="spacer" />
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <Image
              src={project.imageSrc}
              alt={project.title}
              width={300}
              height={200}
              className="project-image"
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
