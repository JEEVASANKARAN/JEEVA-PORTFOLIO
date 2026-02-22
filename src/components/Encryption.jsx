import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import FadeContent from './FadeContent';
import './Encryption.css';

const CLEAR_TEXT = "From clean architecture to secure deployment — every system I build is designed to perform, protect, and scale.";
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

function glitchChar() { return CHARS[Math.floor(Math.random() * CHARS.length)]; }

export default function Encryption() {
  const [locked, setLocked] = useState(true);
  const [decoded, setDecoded] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [hovered, setHovered] = useState(false);
  const lockRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const glitchIntervalRef = useRef(null);

  // Glitch effect for locked state
  useEffect(() => {
    if (locked && !decoded) {
      glitchIntervalRef.current = setInterval(() => {
        setDisplayText(CLEAR_TEXT.split('').map(c => c === ' ' ? ' ' : glitchChar()).join(''));
      }, 80);
    } else {
      clearInterval(glitchIntervalRef.current);
    }
    return () => clearInterval(glitchIntervalRef.current);
  }, [locked, decoded]);

  const animateUnlock = () => {
    if (!lockRef.current) return;
    gsap.to(lockRef.current, {
      scale: 1.15,
      rotation: 5,
      duration: 0.2,
      yoyo: true,
      repeat: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to(lockRef.current, { scale: 1, rotation: 0, duration: 0.2 });
      }
    });
  };

  const handleClick = () => {
    if (locked) {
      animateUnlock();
      setLocked(false);
      setDecoded(false);
      clearInterval(glitchIntervalRef.current);
      let idx = 0;
      setDisplayText(CLEAR_TEXT.split('').map(() => glitchChar()).join(''));
      intervalRef.current = setInterval(() => {
        idx++;
        setDisplayText(prev => {
          return CLEAR_TEXT.split('').map((ch, i) => {
            if (i < idx) return ch;
            return ch === ' ' ? ' ' : glitchChar();
          }).join('');
        });
        if (idx >= CLEAR_TEXT.length) {
          clearInterval(intervalRef.current);
          setDecoded(true);
        }
      }, 28);
    } else {
      // Re-lock
      clearInterval(intervalRef.current);
      setDecoded(false);
      setLocked(true);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (!locked) {
      // Re-encode after brief delay
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        clearInterval(intervalRef.current);
        setDecoded(false);
        setLocked(true);
      }, 2500);
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
    clearTimeout(timeoutRef.current);
    if (!locked) {
      // Animate lock shake on hover when unlocked
      if (lockRef.current) {
        gsap.to(lockRef.current, { x: 2, duration: 0.08, yoyo: true, repeat: 5, ease: 'none' });
      }
    }
  };

  useEffect(() => () => { clearInterval(intervalRef.current); clearTimeout(timeoutRef.current); }, []);

  return (
    <div className="enc-section" id="security">
      {/* Encryption video bg */}
      <div className="enc-video-wrap">
        <video autoPlay muted loop playsInline className="enc-video">
          <source src="https://github.com/Jenin82/SpacePortfolio/raw/refs/heads/main/public/encryption.mp4" type="video/mp4" />
        </video>
        <div className="enc-video-overlay" />
      </div>

      <div className="enc-inner section-container">
        <FadeContent blur duration={900} className="enc-label-wrap">
          <h2 className="enc-heading">Built to Perform.<br />Secured by Design.</h2>
        </FadeContent>

        <FadeContent blur duration={900} delay={200} className="enc-card-wrap">
          <div
            className={`enc-card${locked ? ' locked' : ' unlocked'}${hovered ? ' hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            title={locked ? 'Click to reveal' : 'Click to lock'}
          >
            <div className="enc-lock-wrap" ref={lockRef}>
              {locked ? (
                <svg className="enc-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              ) : (
                <svg className="enc-lock-icon unlocked-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                </svg>
              )}
            </div>

            <p className={`enc-text${decoded ? ' decoded' : ' glitched'}${!decoded && !locked ? ' decoding' : ''}`}>
              {displayText || (locked ? CLEAR_TEXT.split('').map(c => c === ' ' ? ' ' : glitchChar()).join('') : CLEAR_TEXT)}
            </p>

            <p className="enc-hint">
              {locked ? 'Click to decrypt' : decoded ? 'Click to re-lock' : 'Decrypting...'}
            </p>
          </div>
        </FadeContent>

        {/* Stats row */}
        <FadeContent blur duration={900} delay={400}>
          <div className="enc-stats">
            {[
              { label: 'Uptime SLA', val: '99.9%', icon: '📈' },
              { label: 'Auth Standard', val: 'JWT + OAuth2', icon: '🔑' },
              { label: 'Infra', val: 'Docker + K8s', icon: '🐋' },
              { label: 'Cloud', val: 'AWS  Deployed', icon: '☁️' },
            ].map(({ label, val, icon }) => (
              <div key={label} className="enc-stat">
                <span className="enc-stat-icon">{icon}</span>
                <span className="enc-stat-val">{val}</span>
                <span className="enc-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </FadeContent>
      </div>
    </div>
  );
}
