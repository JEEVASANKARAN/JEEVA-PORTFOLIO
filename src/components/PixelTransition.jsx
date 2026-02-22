import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './PixelTransition.css';

export default function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 8,
  pixelColor = '#a855f7',
  animationStepDuration = 0.4,
  once = false,
  aspectRatio = '100%',
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const delayedCallRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;
    pixelGridEl.innerHTML = '';
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pxl-pixel');
        pixel.style.backgroundColor = pixelColor;
        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = (activate) => {
    setIsActive(activate);
    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;
    const pixels = pixelGridEl.querySelectorAll('.pxl-pixel');
    if (!pixels.length) return;
    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) delayedCallRef.current.kill();
    gsap.set(pixels, { display: 'none' });
    const staggerDuration = animationStepDuration / pixels.length;
    gsap.to(pixels, { display: 'block', duration: 0, stagger: { each: staggerDuration, from: 'random' } });
    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? 'block' : 'none';
      activeEl.style.pointerEvents = activate ? 'none' : '';
    });
    gsap.to(pixels, { display: 'none', duration: 0, delay: animationStepDuration, stagger: { each: staggerDuration, from: 'random' } });
  };

  const handleEnter = () => { if (!isActive) animatePixels(true); };
  const handleLeave = () => { if (isActive && !once) animatePixels(false); };
  const handleClick = () => {
    if (!isActive) animatePixels(true);
    else if (!once) animatePixels(false);
  };

  return (
    <div
      ref={containerRef}
      className={`pxl-card ${className}`}
      style={style}
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
      tabIndex={0}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="pxl-default" aria-hidden={isActive}>{firstContent}</div>
      <div className="pxl-active" ref={activeRef} aria-hidden={!isActive}>{secondContent}</div>
      <div className="pxl-grid" ref={pixelGridRef} />
    </div>
  );
}
