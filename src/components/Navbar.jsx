import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
];

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/JEEVASANKARAN',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jeevasankaran-s-0a549a296',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/Jeevasankaran/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.426.233-.261a5.359 5.359 0 0 0 .835-1.328 5.242 5.242 0 0 0 .365-1.7c.041-.734-.059-1.47-.29-2.163a5.36 5.36 0 0 0-.787-1.493L19.7 11.3a.83.83 0 0 0-.64-.296.821.821 0 0 0-.64.301l-3.463 4.187a.501.501 0 0 1-.691.069l-.072-.06-1.957-1.862a.5.5 0 0 1-.004-.71L16.3 9.7a.5.5 0 0 0 0-.7l-1.46-1.46a.5.5 0 0 0-.7 0L11.1 10.58 9.44 8.92l4.5-4.5a.5.5 0 0 0 0-.7l-1.18-1.18a.503.503 0 0 0-.62-.067l-.008.006A1.37 1.37 0 0 0 13.483 0z"/>
      </svg>
    ),
  },
  {
    label: 'Codewars',
    href: 'https://www.codewars.com/users/JEEVA_S',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M5.042 0L0 5.042l5.042 5.042L10.083 5.042 5.042 0zm13.916 0l-5.041 5.042 5.041 5.042L24 5.042 18.958 0zM5.042 13.916L0 18.958 5.042 24l5.041-5.042-5.041-5.042zm13.916 0l-5.041 5.042L18.958 24 24 18.958l-5.042-5.042z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/_j1vaa',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'Gmail',
    href: 'mailto:s.jeevasankaran@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');
  const [scrolled, setScrolled] = useState(false);
  const lineRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Track scroll for navbar glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveHref('#' + entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setActiveHref(href);
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobile = () => {
    const newState = !mobileOpen;
    setMobileOpen(newState);
    if (mobileMenuRef.current) {
      if (newState) {
        gsap.set(mobileMenuRef.current, { visibility: 'visible', y: -10, opacity: 0 });
        gsap.to(mobileMenuRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' });
      } else {
        gsap.to(mobileMenuRef.current, {
          y: -10, opacity: 0, duration: 0.2, ease: 'power3.in',
          onComplete: () => gsap.set(mobileMenuRef.current, { visibility: 'hidden' })
        });
      }
    }
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        {/* Left: Name */}
        <a href="#home" className="navbar-name" onClick={(e) => handleNavClick(e, '#home')}>
          JEEVASANKARAN S
        </a>

        {/* Center: Nav Pills */}
        <div className="navbar-center">
          <ul className="navbar-links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`navbar-pill${activeHref === href ? ' active' : ''}`}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  {label}
                  <span className="pill-underline" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Social Icons */}
        <div className="navbar-socials">
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="social-icon-btn"
              title={label}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`navbar-hamburger${mobileOpen ? ' open' : ''}`}
          onClick={toggleMobile}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className="mobile-menu" ref={mobileMenuRef}>
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="mobile-link"
            onClick={(e) => handleNavClick(e, href)}
          >
            {label}
          </a>
        ))}
        <div className="mobile-socials">
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title={label}>
              {icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
