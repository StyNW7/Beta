import React, { useState, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';

const joystickBaseStyle = {
  position: 'absolute',
  bottom: '50px',
  left: '50px',
  width: '120px',
  height: '120px',
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '50%',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
  zIndex: 50,
};

const joystickStickStyle = {
  width: '60px',
  height: '60px',
  background: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '50%',
  cursor: 'grab',
  transition: 'transform 0.1s',
};

export const Joystick = () => {
  const setJoystickVector = useGameStore((state) => state.setJoystickVector);
  const stickRef = useRef(null);
  const baseRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    if (stickRef.current) {
      stickRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !baseRef.current || !stickRef.current) return;
    
    const touch = e.touches[0];
    const baseRect = baseRef.current.getBoundingClientRect();
    const baseCenterX = baseRect.left + baseRect.width / 2;
    const baseCenterY = baseRect.top + baseRect.height / 2;

    let dx = touch.clientX - baseCenterX;
    let dy = touch.clientY - baseCenterY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = baseRect.width / 2;

    if (distance > maxDistance) {
      dx = (dx / distance) * maxDistance;
      dy = (dy / distance) * maxDistance;
    }

    stickRef.current.style.transform = `translate(${dx}px, ${dy}px)`;

    setJoystickVector({
      x: dx / maxDistance,
      y: dy / maxDistance,
    });
  };

  const handleTouchEnd = () => {
    if (!isDragging || !stickRef.current) return;
    setIsDragging(false);
    stickRef.current.style.transition = 'transform 0.1s';
    stickRef.current.style.transform = 'translate(0px, 0px)';
    setJoystickVector({ x: 0, y: 0 });
  };

  return (
    <div
      ref={baseRef}
      style={joystickBaseStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={stickRef} style={joystickStickStyle}></div>
    </div>
  );
};