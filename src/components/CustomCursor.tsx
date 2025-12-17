import React, { useState, useEffect } from 'react';
import { CursorVariant } from '../types';

interface CustomCursorProps {
  variant: CursorVariant;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ variant }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-[9999]"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: variant === 'coin' ? 'normal' : 'difference'
      }}
    >
      {variant === 'default' && (
        <svg width="32" height="32" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="2" width="1" height="9" fill="#00FFFF"/>
          <rect x="2" y="6" width="9" height="1" fill="#00FFFF"/>
          <rect x="4" y="4" width="1" height="1" fill="#00BFFF"/>
          <rect x="8" y="4" width="1" height="1" fill="#00BFFF"/>
          <rect x="4" y="8" width="1" height="1" fill="#00BFFF"/>
          <rect x="8" y="8" width="1" height="1" fill="#00BFFF"/>
          <rect x="6" y="0" width="1" height="1" fill="#E0FFFF"/>
          <rect x="6" y="12" width="1" height="1" fill="#E0FFFF"/>
          <rect x="0" y="6" width="1" height="1" fill="#E0FFFF"/>
          <rect x="12" y="6" width="1" height="1" fill="#E0FFFF"/>
          <rect x="5" y="5" width="3" height="3" fill="#00FFFF" fillOpacity="0.5"/>
        </svg>
      )}
      
      {variant === 'pointer' && (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
          <path d="M12.5 2C15.5376 2 18 4.46243 18 7.5C18 10.5376 15.5376 13 12.5 13C11.1683 13 9.94726 12.5273 9 11.7383V16H11V18H9V20H11V22H7V10.1504C6.38605 9.42905 6 8.50813 6 7.5C6 4.46243 8.46243 2 12.5 2ZM12.5 4C10.567 4 9 5.567 9 7.5C9 9.433 10.567 11 12.5 11C14.433 11 16 9.433 16 7.5C16 5.567 14.433 4 12.5 4ZM14 6H12V9H14V6Z" fill="#FFFF00"/>
        </svg>
      )}

      {variant === 'coin' && (
        <svg width="40" height="40" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow">
          <rect x="5" y="0" width="6" height="1" fill="#FFD700"/>
          <rect x="3" y="1" width="2" height="1" fill="#FFD700"/>
          <rect x="11" y="1" width="2" height="1" fill="#FFD700"/>
          <rect x="2" y="2" width="1" height="1" fill="#FFD700"/>
          <rect x="13" y="2" width="1" height="1" fill="#FFD700"/>
          <rect x="1" y="3" width="1" height="2" fill="#FFD700"/>
          <rect x="14" y="3" width="1" height="2" fill="#FFD700"/>
          <rect x="0" y="5" width="1" height="6" fill="#FFD700"/>
          <rect x="15" y="5" width="1" height="6" fill="#FFD700"/>
          <rect x="1" y="11" width="1" height="2" fill="#FFD700"/>
          <rect x="14" y="11" width="1" height="2" fill="#FFD700"/>
          <rect x="2" y="13" width="1" height="1" fill="#FFD700"/>
          <rect x="13" y="13" width="1" height="1" fill="#FFD700"/>
          <rect x="3" y="14" width="2" height="1" fill="#FFD700"/>
          <rect x="11" y="14" width="2" height="1" fill="#FFD700"/>
          <rect x="5" y="15" width="6" height="1" fill="#FFD700"/>
          <rect x="4" y="4" width="2" height="2" fill="#FFFFE0"/>
          <rect x="7" y="4" width="2" height="8" fill="#B8860B"/>
        </svg>
      )}
    </div>
  );
};
