import React, { useState, useEffect } from 'react';
import { CursorVariant } from '../types';

interface CustomCursorProps {
  variant: CursorVariant;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ variant }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 모바일 감지
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // 모바일에서는 커서 렌더링 안 함
  if (isMobile) return null;

  return (
    <div 
      className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out mix-blend-difference"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`
      }}
    >
      {/* 🖱️ 기본 커서: 심플한 링 */}
      {variant === 'default' && (
        <div className="w-4 h-4 border border-white rounded-full"></div>
      )}

      {/* 👆 포인터: 채워진 원 */}
      {variant === 'pointer' && (
        <div className="w-4 h-4 bg-white rounded-full opacity-80 animate-pulse"></div>
      )}

      {/* 🔑 열쇠 (트랙 선택): 십자선 */}
      {variant === 'key' && (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-white"></div>
          <div className="absolute h-full w-[1px] bg-white"></div>
          <div className="w-2 h-2 border border-white rounded-full bg-transparent"></div>
        </div>
      )}
      
      {/* ❄️ 눈꽃 대체 -> CD 아이콘 (로비 대기 상태) */}
      {variant === 'snowflake' && (
         <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center animate-spin-slow">
            <div className="w-2 h-2 bg-white rounded-full"></div>
         </div>
      )}

      {/* ✒️ 깃펜 대체 -> 매직펜 (답장) */}
      {variant === 'quill' && (
        <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]"></div>
      )}

      {/* 📮 우표 대체 -> Burn 아이콘 */}
      {variant === 'stamp' && (
        <div className="w-6 h-6 border border-dashed border-white rotate-45"></div>
      )}
    </div>
  );
};