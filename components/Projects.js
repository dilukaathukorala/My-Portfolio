'use client';

import '../styles/Projects.css'; // ✅ updated import

export default function Project({ handleNavClick, setActiveSection }) {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A fully responsive animated portfolio built with Next.js and Tailwind.',
      link: 'https://your-portfolio-link.com',
    },
    {
      title: 'Hospital Management System',
      description: 'A PHP and SQL-based CRUD system for hospital admin operations.',
      link: 'https://github.com/yourusername/hms',
    },
    {
      title: 'Blockchain in Rust',
      description: 'Bitcoin-like blockchain built from scratch using Rust and P2P networking.',
      link: 'https://github.com/yourusername/rust-blockchain',
    },
  ];

  return (
    <section className="projects-section">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
