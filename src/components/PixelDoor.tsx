import React from 'react';
import { Lock, Unlock } from 'lucide-react';

interface PixelDoorProps {
  id: number;
  isTarget: boolean; // 내가 찾아야 할 문인지
  isOpen: boolean;   // 열려 있는지
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export const PixelDoor: React.FC<PixelDoorProps> = ({ 
  id, 
  isTarget, 
  isOpen,
  onMouseEnter, 
  onMouseLeave,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative group cursor-none transition-transform duration-300 ${
        isTarget && !isOpen ? 'animate-door-shake z-10' : ''
      } ${isOpen ? 'z-20' : ''}`}
    >
      {/* 문 프레임 (외곽) - 사서함 비율 */}
      <div className="w-full aspect-[4/3] bg-[#2a1b15] p-2 rounded-sm shadow-[4px_4px_0px_rgba(0,0,0,0.5)] border-t border-l border-[#5c4033] border-b-4 border-r-4 border-black relative overflow-hidden perspective-1000">
        
        {/* 문짝 (나무 질감) - 3D 회전 효과 */}
        <div className={`w-full h-full bg-[#463325] wood-texture relative transition-all duration-1000 transform origin-left transform-style-3d ${
          isOpen ? '-rotate-y-90 translate-x-[-5%]' : ''
        } border border-[#5c4033]/30`}>
          
          {/* 금속 번호판 */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-6 bg-gradient-to-br from-[#ffd700] to-[#b8860b] flex items-center justify-center border-2 border-[#8b6508] shadow-sm">
            <span className="font-['Press_Start_2P'] text-[10px] text-[#423108]">{String(id).padStart(2, '0')}</span>
            {/* 나사 구멍 */}
            <div className="absolute top-1 left-1 w-1 h-1 bg-[#8b6508] rounded-full opacity-50"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-[#8b6508] rounded-full opacity-50"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-[#8b6508] rounded-full opacity-50"></div>
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-[#8b6508] rounded-full opacity-50"></div>
          </div>

          {/* 문 손잡이 */}
          <div className="absolute top-1/2 right-2 w-2 h-6 bg-[#2a2a2a] rounded-sm shadow-md border-l border-gray-600"></div>

          {/* 자물쇠 아이콘 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#1a1a1a]/50">
             {isOpen ? <Unlock size={14} /> : <Lock size={14} />}
          </div>

          {/* 낡은 효과 (Overlay) */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-multiply"></div>
        </div>

        {/* 문 내부 (어두운 공간 + 편지가 빛나는 연출) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] z-[-1] flex items-center justify-center">
          {isOpen && (
             <div className="relative">
               {/* 편지 봉투 */}
               <div className="w-12 h-8 bg-[#FFFDF0] rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-letter-reveal border border-[#E8E6D1]">
                 {/* 봉투 플랩 */}
                 <div className="w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[15px] border-t-[#E8E6D1] absolute top-0 left-0"></div>
                 {/* 밀랍 */}
                 <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full opacity-60"></div>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};