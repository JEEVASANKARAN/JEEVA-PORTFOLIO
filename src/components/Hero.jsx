import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import PixelTransition from './PixelTransition';
import ShinyText from './ShinyText';
import FadeContent from './FadeContent';
import './Hero.css';

// Tech stack items for the right panel
const TECH_STACKS = [
  { name: 'Java', color: '#f89820', icon: '☕' },
  { name: 'Spring Boot', color: '#6db33f', icon: '🍃' },
  { name: 'React', color: '#61dafb', icon: '⚛️' },
  { name: 'JavaScript', color: '#f7df1e', icon: '🟨' },
  { name: 'PostgreSQL', color: '#336791', icon: '🐘' },
  { name: 'Docker', color: '#2496ed', icon: '🐋' },
  { name: 'AWS', color: '#ff9900', icon: '☁️' },
  { name: 'Python', color: '#3776ab', icon: '🐍' },
];

export default function Hero() {
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Slide in from left on mount
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.3 }
      );
    }
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, []);

  return (
    <div className="hero-section" id="home">
      {/* Black hole video background */}
      <div className="hero-video-wrap">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-blackhole-video"
        >
          <source
            src="https://github.com/Jenin82/SpacePortfolio/raw/refs/heads/main/public/blackhole.webm"
            type="video/webm"
          />
        </video>
      </div>

      {/* Hero content */}
      <div className="hero-content">
        {/* Left: Profile Card */}
        <div className="hero-left" ref={cardRef}>
          <PixelTransition
            firstContent={
              <div className="hero-img-wrap">
                <img
                  src="/anime-avatar.jpg"
                  alt="Jeevasankaran S"
                  className="hero-avatar-img"
                />
                <div className="hero-img-overlay" />
              </div>
            }
            secondContent={
              <div className="pixel-reveal">
                <p className="pixel-reveal-text">HEY..!</p>
                <p className="pixel-reveal-sub">Let's build something amazing</p>
              </div>
            }
            gridSize={8}
            pixelColor="#a855f7"
            once={false}
            animationStepDuration={0.35}
            aspectRatio="110%"
            className="hero-pixel-card"
          />

          {/* Name badge under card */}
          <div className="hero-name-badge">
            <span className="hero-badge-dot" />
            <span>Available for collaboration</span>
          </div>
        </div>

        {/* Right: Info */}
        <div className="hero-right" ref={contentRef}>
          {/* Greeting */}
          <FadeContent blur duration={800} delay={200}>
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-title">JEEVASANKARAN S</h1>
          </FadeContent>

          {/* Shiny role */}
          <FadeContent blur duration={900} delay={400}>
            <div className="hero-role">
              <ShinyText
                text="✦ FULL STACK DEVELOPER"
                speed={2.5}
                color="#7c3aed"
                shineColor="#e9d5ff"
                spread={110}
                direction="left"
              />
            </div>
          </FadeContent>

          {/* Shiny tagline */}
          <FadeContent blur duration={1000} delay={600}>
            <div className="hero-tagline">
              <ShinyText
                text="Engineering scalable systems with clean architecture and real-world impact"
                speed={3}
                color="#6b7280"
                shineColor="#c084fc"
                spread={90}
                direction="left"
                className="tagline-shiny"
              />
            </div>
          </FadeContent>

          {/* About paragraph */}
          <FadeContent blur duration={1100} delay={800}>
            <p className="hero-about">
              I'm a Full Stack Software Engineer with strong expertise in Java, Spring Boot,
              Hibernate, and PostgreSQL, complemented by modern frontend development using React.
              I design and build scalable, secure, and maintainable systems grounded in solid OOP
              principles and clean architecture practices. My focus goes beyond writing code — I
              engineer robust backend systems, optimize performance, and integrate modern DevOps
              tools like Docker and cloud technologies to deliver production-ready solutions. I
              thrive on solving complex problems and transforming ideas into high-quality digital products.
            </p>
          </FadeContent>

          {/* Tech stack mini pills */}
          <FadeContent blur duration={1000} delay={1000}>
            <div className="hero-tech-mini">
              {TECH_STACKS.map(({ name, color, icon }) => (
                <span key={name} className="tech-mini-pill" style={{ '--tc': color }}>
                  <span>{icon}</span>
                  <span>{name}</span>
                </span>
              ))}
            </div>
          </FadeContent>

          {/* CTA Buttons */}
          <FadeContent blur duration={900} delay={1100}>
            <div className="hero-ctas">
              <a
                href="#projects"
                className="cta-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Projects
              </a>
              <a
                href="mailto:s.jeevasankaran@gmail.com"
                className="cta-secondary"
              >
                Contact Me
              </a>
            </div>
          </FadeContent>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint">
        <div className="scroll-arrow" />
        <span>Scroll to explore</span>
      </div>
    </div>
  );
}
