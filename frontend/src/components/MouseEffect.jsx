import React, { useEffect, useState, useRef } from 'react';

const MouseEffect = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState([]);

  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const ambientGlowRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Disable on mobile / touch devices
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (ambientGlowRef.current) {
        ambientGlowRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
      }
    };

    const handleMouseDown = (e) => {
      setIsClicked(true);
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 650);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer') ||
          target.closest('button') ||
          target.closest('a'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Smooth spring/lerp loop for trailing ring
    const render = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Ambient Orange Torch Light that tracks cursor */}
      <div
        ref={ambientGlowRef}
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(244, 132, 0, 0.12) 0%, rgba(244, 132, 0, 0.03) 45%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* Tactile Soundwave Ripples on Click */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none animate-mouse-ripple"
          style={{
            left: `${ripple.x - 16}px`,
            top: `${ripple.y - 16}px`,
          }}
        />
      ))}

      {/* Trailing Fluid Outer Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 rounded-full border pointer-events-none transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 border-primary bg-primary/15 shadow-[0_0_16px_rgba(244,132,0,0.5)]'
            : isClicked
            ? 'w-6 h-6 -ml-3 -mt-3 border-amber-400 bg-primary/30'
            : 'w-8 h-8 border-primary/50 bg-transparent'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Precise Central Indicator Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 rounded-full pointer-events-none transition-transform duration-75 ease-out ${
          isHovered ? 'w-2.5 h-2.5 -ml-1.25 -mt-1.25 bg-white' : 'w-2 h-2 bg-primary'
        }`}
        style={{
          boxShadow: '0 0 10px rgba(244, 132, 0, 0.95)',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default MouseEffect;

