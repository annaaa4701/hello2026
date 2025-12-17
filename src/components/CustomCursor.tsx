import React, { useState, useEffect } from 'react';
import { CursorVariant } from '../types';

interface CustomCursorProps {
  variant: CursorVariant;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ variant }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [sparkles, setSparkles] = useState<{id: number, x: number, y: number}[]>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => {
      setIsClicking(true);
      const newSparkle = { id: Date.now(), x: position.x, y: position.y };
      setSparkles(prev => [...prev, newSparkle]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 500);
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [position.x, position.y]);

  // 커서 오프셋 조정
  let cursorOffset = { x: 0, y: 0 };
  if (variant === 'default') cursorOffset = { x: 0, y: 0 }; 
  else if (variant === 'quill') cursorOffset = { x: 0, y: -24 }; 
  else cursorOffset = { x: -50, y: -50 }; 

  return (
    <>
      <div 
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(${cursorOffset.x}%, ${cursorOffset.y}%) scale(${isClicking ? 0.9 : 1})`,
          mixBlendMode: 'normal'
        }}
      >
        {/* 🖱️ 기본 커서: 크리스마스 에디션 픽셀 화살표 */}
        {variant === 'default' && (
          <div className="relative drop-shadow-md">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ shapeRendering: 'crispEdges' }}>
              <defs>
                {/* 🎄 연말 분위기 빨강/초록 스트라이프 패턴 그라데이션 */}
                <linearGradient id="christmas-border" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(135)">
                   <stop offset="0%" stopColor="#FF0000" />
                   <stop offset="20%" stopColor="#FF0000" />
                   <stop offset="20%" stopColor="#00A86B" />
                   <stop offset="40%" stopColor="#00A86B" />
                   <stop offset="40%" stopColor="#FF0000" />
                   <stop offset="60%" stopColor="#FF0000" />
                   <stop offset="60%" stopColor="#00A86B" />
                   <stop offset="80%" stopColor="#00A86B" />
                   <stop offset="80%" stopColor="#FF0000" />
                   <stop offset="100%" stopColor="#FF0000" />
                </linearGradient>
              </defs>

              {/* 그림자 (Shadow) */}
              <path d="M2 2L2 19L6 15L9 21L11 20L8 14L13 14L2 2Z" fill="black" fillOpacity="0.3" transform="translate(2, 2)"/>
              
              {/* 테두리 배경 (White Outline Background) - 색상 테두리가 잘 보이도록 밑에 깔아줌 */}
              <path d="M2 2V19L6 15H7L8 15L11 20L13 19L10 14L13 14L2 2Z" stroke="white" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter"/>
              
              {/* 메인 테두리 (Christmas Border) */}
              <path d="M2 2V19L6 15H7L8 15L11 20L13 19L10 14L13 14L2 2Z" stroke="url(#christmas-border)" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
              
              {/* 내부 채움 (White Fill) */}
              <path d="M2 2L2 19L6 15L9 21L11 20L8 14L13 14L2 2Z" fill="white"/>
            </svg>
          </div>
        )}

        {/* ❄️ 눈꽃 커서 */}
        {variant === 'snowflake' && (
          <div className="relative transform -translate-x-1/2 -translate-y-1/2">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g stroke="white" strokeWidth="1.2" strokeLinecap="round" filter="url(#glow)">
                <path d="M12 2.5V21.5" />
                <path d="M3.77 7.25L20.23 16.75" />
                <path d="M3.77 16.75L20.23 7.25" />
                <path d="M12 9L14.6 10.5V13.5L12 15L9.4 13.5V10.5L12 9Z" fill="white" fillOpacity="0.3" stroke="none" />
                <path d="M12 9L14.6 10.5V13.5L12 15L9.4 13.5V10.5L12 9Z" stroke="white" strokeWidth="0.8" fill="none"/>
                <path d="M12 2.5L10 5" />
                <path d="M12 2.5L14 5" />
                <path d="M12 21.5L10 19" />
                <path d="M12 21.5L14 19" />
                <path d="M3.77 7.25L6.27 7.25" />
                <path d="M3.77 7.25L4.5 9.5" />
                <path d="M20.23 16.75L17.73 16.75" />
                <path d="M20.23 16.75L19.5 14.5" />
                <path d="M3.77 16.75L6.27 16.75" />
                <path d="M3.77 16.75L4.5 14.5" />
                <path d="M20.23 7.25L17.73 7.25" />
                <path d="M20.23 7.25L19.5 9.5" />
                <circle cx="12" cy="12" r="1" fill="white" />
              </g>
            </svg>
            <div className="absolute inset-0 animate-spin-slow opacity-30">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                 <circle cx="12" cy="12" r="8" stroke="url(#aura_gradient)" strokeWidth="0.5" strokeDasharray="2 2" />
                 <defs>
                   <linearGradient id="aura_gradient" x1="0" y1="0" x2="1" y2="1">
                     <stop offset="0%" stopColor="#A5F2F3" />
                     <stop offset="100%" stopColor="#FFFFFF" />
                   </linearGradient>
                 </defs>
               </svg>
            </div>
          </div>
        )}
        
        {/* 👆 포인터 (손가락) */}
        {variant === 'pointer' && (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="animate-pulse drop-shadow-[0_0_8px_#FFD700] transform -translate-x-1/2 -translate-y-1/2">
            <path d="M12.5 2C15.5 2 18 4.5 18 7.5C18 10.5 15.5 13 12.5 13C11.2 13 10 12.5 9 11.7V16H11V18H9V20H11V22H7V10.2C6.4 9.4 6 8.5 6 7.5C6 4.5 8.5 2 12.5 2ZM12.5 4C10.6 4 9 5.6 9 7.5C9 9.4 10.6 11 12.5 11C14.4 11 16 9.4 16 7.5C16 5.6 14.4 4 12.5 4ZM14 6H12V9H14V6Z" fill="#FFFF00"/>
          </svg>
        )}

        {/* 🔑 열쇠 */}
        {variant === 'key' && (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="transform -rotate-45 drop-shadow-md -translate-x-1/2 -translate-y-1/2">
            <path d="M7 14C5.9 14 5 13.1 5 12C5 10.9 5.9 10 7 10C8.1 10 9 10.9 9 12C9 13.1 8.1 14 7 14ZM12.1 11H15V14H17V11H19V14H21V9H10.8C10.4 8.4 9.7 8 9 8C6.8 8 5 9.8 5 12C5 14.2 6.8 16 9 16C9.7 16 10.4 15.6 10.8 15H12.1V11Z" fill="#FFD700" style={{ shapeRendering: 'crispEdges' }}/>
            <path d="M9 11C8.4 11 8 11.4 8 12C8 12.6 8.4 13 9 13C9.6 13 10 12.6 10 12C10 11.4 9.6 11 9 11Z" fill="black"/>
          </svg>
        )}

        {/* ✒️ 깃펜 */}
        {variant === 'quill' && (
          <div className="relative transform -translate-x-1 -translate-y-8">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
              <defs>
                 <linearGradient id="featherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#FFFFFF" />
                   <stop offset="100%" stopColor="#F0F0F0" />
                 </linearGradient>
                 <linearGradient id="nibGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#FFD700" />
                   <stop offset="100%" stopColor="#B8860B" />
                 </linearGradient>
                 <filter id="quillGlow">
                    <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                 </filter>
              </defs>
              
              <g filter="url(#quillGlow)">
                <path 
                  d="M19.5 3.5C19.5 3.5 21.5 5.5 18.5 10.5C15.5 15.5 10.5 18.5 5.5 21.5C5.5 21.5 8.5 18.5 10.5 13.5C12.5 8.5 17.5 3.5 19.5 3.5Z" 
                  fill="url(#featherGradient)" 
                  stroke="#2C3E50" 
                  strokeWidth="0.5"
                />
                <path d="M17.5 5.5C16.5 7.5 14.5 9.5 12.5 10.5" stroke="#D1D5DB" strokeWidth="0.5" strokeLinecap="round"/>
                <path d="M15.5 8.5C14.5 10 13 11.5 11.5 12.5" stroke="#D1D5DB" strokeWidth="0.5" strokeLinecap="round"/>
                <path d="M7.5 17.5L5.5 21.5L3.5 19.5L6.5 16.5C6.5 16.5 7 17 7.5 17.5Z" fill="url(#nibGradient)" />
                <path d="M5.5 21.5L2 24L3.5 19.5L5.5 21.5Z" fill="#1A202C" /> 
              </g>
              <circle cx="18.5" cy="4.5" r="0.8" fill="white" className="animate-pulse" />
            </svg>
          </div>
        )}

        {/* 📮 우표 */}
        {variant === 'stamp' && (
          <div className="w-12 h-12 bg-white border-2 border-dashed border-red-300 opacity-90 shadow-xl transform rotate-12 flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-[8px] text-white font-bold tracking-widest">LOVE</div>
          </div>
        )}
      </div>

      {/* ✨ 클릭 파티클 */}
      {sparkles.map(sparkle => (
        <div 
          key={sparkle.id}
          className="fixed pointer-events-none z-[9999] animate-ping"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="white" />
          </svg>
        </div>
      ))}
    </>
  );
};