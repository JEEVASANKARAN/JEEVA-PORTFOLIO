import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Projects.css';
import FadeContent from './FadeContent';
import ShinyText from './ShinyText';

const PROJECTS = [
  {
    id: 1,
    title: 'Ultra-Spaced Task Management App',
    impact: 'Powered by React 19, Firebase 12, and Vite 7 for real-time Firestore synchronization.',
    desc: 'A premium, "Ultra Spaced" Task Management Application designed for professional focus and visual excellence. Built with React 19, Vite 7, and Firebase 12, it moves away from cluttered interfaces to provide an airy, high-end "gallery" experience with secure OAuth logins.',
    tags: ['React 19', 'Vite 7', 'Firebase 12', 'Firestore', 'OAuth', 'Gmail API', 'Framer Motion'],
    color: '#a855f7',
    image: '/projects/task-manager.jpg',
  },
  {
    id: 2,
    title: 'Student Management System',
    impact: 'Designed modular JDBC architecture with full exception handling and transactional integrity.',
    desc: 'Developed a Java-based CRUD application that connects to an Oracle database, enabling complete management of student records. Uses JDBC to facilitate operations such as adding, updating, searching, deleting, and listing student data. Showcases SQL integration, exception handling, and proper use of JDBC to ensure robust database operations.',
    tags: ['Java', 'JDBC', 'Oracle SQL', 'OOP', 'CRUD'],
    color: '#f89820',
    image: '/projects/student-management.jpg',
  },
  {
    id: 3,
    title: 'Library Management System',
    impact: 'Applied OOP encapsulation and class hierarchy to manage 7 independent operations cleanly.',
    desc: 'Created a Java-based library management application to handle book borrowing and returns. Manages book inventory, tracks borrowers, and calculates fines for overdue books using OOP principles. The intuitive console interface allows for adding, issuing, returning, searching, and listing books — demonstrating encapsulation, class hierarchy, and logic to manage library operations efficiently.',
    tags: ['Java', 'OOP', 'File I/O', 'Console App', 'Encapsulation'],
    color: '#22d3ee',
    image: '/projects/library-management.jpg',
  },
  {
    id: 4,
    title: 'Console-Based Banking System',
    impact: 'Implemented file-based persistence layer simulating a lightweight database for account transactions.',
    desc: 'Developed a banking application using Java, demonstrating core OOP principles. Manages account creation, transactions, withdrawals, and account balance inquiries via a command-line interface. Data is persistently stored using file handling techniques to simulate a basic database, ensuring efficient and secure operations. Showcases exception handling, class design, and encapsulation in a real-world banking context.',
    tags: ['Java', 'OOP', 'File Handling', 'Console App', 'Exception Handling'],
    color: '#10a37f',
    image: '/projects/banking-system.jpg',
  },
];

export default function Projects() {
  const cardRefs = useRef([]);

  const handleCardClick = (idx) => {
    const ref = cardRefs.current[idx];
    if (ref) {
      gsap.fromTo(ref,
        { rotateY: 0, scale: 1 },
        {
          rotateY: 6, scale: 1.02, duration: 0.2, ease: 'power2.out',
          onComplete: () => gsap.to(ref, { rotateY: 0, scale: 1, duration: 0.25, ease: 'power2.in' })
        }
      );
    }
  };

  return (
    <div className="projects-section" id="projects">
      <div className="projects-inner section-container">
        <FadeContent blur duration={900}>
          <h2 className="projects-heading">
            <ShinyText
              text="Projects That Matter"
              speed={3}
              color="#94a3b8"
              shineColor="#e9d5ff"
              spread={100}
              direction="left"
            />
          </h2>
          <p className="projects-subheading">Real-world solutions engineered with precision</p>
        </FadeContent>

        <div className="projects-grid">
          {PROJECTS.map((project, idx) => (
            <FadeContent key={project.id} blur duration={900} delay={idx * 120}>
              <div
                className="project-card"
                ref={el => cardRefs.current[idx] = el}
                style={{ '--pc': project.color }}
                onClick={() => handleCardClick(idx)}
              >
                {/* Project image */}
                <div className="project-img-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-img"
                    loading="lazy"
                  />
                  <div className="project-img-overlay" />
                </div>

                {/* Content below image */}
                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  {project.impact && (
                    <p className="project-impact">
                      <span className="project-impact-icon">✦</span>
                      {project.impact}
                    </p>
                  )}
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeContent>
          ))}
        </div>

        {/* GitHub CTA */}
        <FadeContent blur duration={900} delay={500}>
          <div className="projects-cta">
            <p>Explore all my work and contributions</p>
            <a href="https://github.com/JEEVASANKARAN" target="_blank" rel="noopener noreferrer" className="projects-github-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Explore GitHub Profile
            </a>
          </div>
        </FadeContent>
      </div>
    </div>
  );
}
