import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';
import FadeContent from './FadeContent';
import ShinyText from './ShinyText';

const SKILLS = [
  { name: 'Java', desc: 'Primary backend language — OOP, design patterns, and enterprise-grade development.', color: '#f89820', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Spring Boot', desc: 'Building production-ready REST APIs, microservices, and secure server-side applications.', color: '#6db33f', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'React', desc: 'Modern component-based UIs with hooks, context, and smooth user experiences.', color: '#61dafb', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', desc: 'ES6+, async/await, DOM manipulation, and full-stack JS development.', color: '#f7df1e', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Python', desc: 'Scripting, data processing, ML model integration, and automation tasks.', color: '#3776ab', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'PostgreSQL', desc: 'Complex SQL queries, indexing strategies, and relational data modeling.', color: '#336791', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', desc: 'Relational database management, stored procedures, and performance optimization.', color: '#00758f', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Hibernate', desc: 'ORM mapping, JPA, lazy/eager loading, and database abstraction layers.', color: '#59666C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-plain.svg' },
  { name: 'Docker', desc: 'Containerization, multi-stage builds, docker-compose, and image optimization.', color: '#2496ed', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', desc: 'Orchestrating containerized workloads, deployments, services, and configs.', color: '#326ce5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'AWS', desc: 'EC2, S3, RDS, Lambda — cloud infrastructure for scalable deployments.', color: '#ff9900', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Firebase', desc: 'Realtime databases, authentication, cloud functions, and hosting.', color: '#ffca28', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Supabase', desc: 'Open-source Firebase alternative with PostgreSQL and realtime subscriptions.', color: '#3ecf8e', icon: 'https://cdn.simpleicons.org/supabase/3ecf8e' },
  { name: 'GitHub', desc: 'Version control, CI/CD workflows, pull requests, and collaborative development.', color: '#ffffff', icon: 'https://cdn.simpleicons.org/github/ffffff' },
  { name: 'Stripe', desc: 'Payment processing, subscription billing, and financial integrations.', color: '#6772e5', icon: 'https://cdn.simpleicons.org/stripe/6772e5' },
  { name: 'OpenAI', desc: 'GPT APIs, embeddings, function calling, and LLM-powered feature development.', color: '#10a37f',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" style={{ color: '#10a37f' }}>
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
      </svg>
    )
  },
  { name: 'n8n', desc: 'Workflow automation, API integrations, and event-driven pipeline building.', color: '#ea4b71', icon: 'https://cdn.simpleicons.org/n8n/ea4b71' },
  { name: 'IntelliJ', desc: 'Primary Java IDE with advanced refactoring, debugging, and plugin support.', color: '#000000', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
  { name: 'VS Code', desc: 'Versatile editor with extensions, integrated terminal, and Git support.', color: '#007acc', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'C', desc: 'Low-level systems programming, memory management, and algorithm fundamentals.', color: '#a8b9cc', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const row1 = SKILLS.slice(0, 10);
  const row2 = SKILLS.slice(10);

  return (
    <div className="skills-section" id="skills">
      {/* Blackhole video bg */}
      <div className="skills-video-wrap">
        <video autoPlay muted loop playsInline className="skills-blackhole-video">
          <source src="https://github.com/Jenin82/SpacePortfolio/raw/refs/heads/main/public/blackhole.webm" type="video/webm" />
        </video>
      </div>

      <div className="skills-inner section-container">
        <FadeContent blur duration={900}>
          <h2 className="skills-heading1">Turning complex problems into scalable solutions</h2>
          <p className="skills-heading2">
            <ShinyText
              text="Built with precision. Delivered with performance."
              speed={3.5}
              color="rgba(196,181,253,0.7)"
              shineColor="#e9d5ff"
              spread={100}
              direction="left"
              className="skills-script"
            />
          </p>
        </FadeContent>

        {/* Scrolling skill rows */}
        <div className="skills-track-container">
          <FadeContent blur duration={900} delay={200}>
            <div className="skills-row-wrap">
              <div className="skills-track skills-track--left" style={{ '--count': row1.length }}>
                {[...row1, ...row1].map((skill, i) => (
                  <SkillCard key={`r1-${i}`} skill={skill}
                    isActive={activeSkill?.name === skill.name}
                    onClick={() => setActiveSkill(activeSkill?.name === skill.name ? null : skill)}
                  />
                ))}
              </div>
            </div>
          </FadeContent>
          <FadeContent blur duration={900} delay={350}>
            <div className="skills-row-wrap">
              <div className="skills-track skills-track--right" style={{ '--count': row2.length }}>
                {[...row2, ...row2].map((skill, i) => (
                  <SkillCard key={`r2-${i}`} skill={skill}
                    isActive={activeSkill?.name === skill.name}
                    onClick={() => setActiveSkill(activeSkill?.name === skill.name ? null : skill)}
                  />
                ))}
              </div>
            </div>
          </FadeContent>
        </div>

        {/* Active skill detail */}
        <div className={`skills-detail-panel${activeSkill ? ' visible' : ''}`}>
          {activeSkill && (
            <>
              <img src={activeSkill.icon} alt={activeSkill.name} className="skills-detail-icon" />
              <div>
                <h3 style={{ color: activeSkill.color }}>{activeSkill.name}</h3>
                <p>{activeSkill.desc}</p>
              </div>
              <button className="skills-detail-close" onClick={() => setActiveSkill(null)}>✕</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SkillCard({ skill, isActive, onClick }) {
  return (
    <button
      className={`skill-card${isActive ? ' active' : ''}`}
      style={{ '--sc': skill.color }}
      onClick={onClick}
      title={skill.name}
    >
      {skill.svg
        ? <span className="skill-card-icon skill-card-svg">{skill.svg}</span>
        : <img src={skill.icon} alt={skill.name} className="skill-card-icon" loading="lazy" />
      }
      <span className="skill-card-name">{skill.name}</span>
    </button>
  );
}
