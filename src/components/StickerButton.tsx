import React from 'react';
import { Lock, Disc, Music2 } from 'lucide-react';

interface StickerButtonProps {
  id: number;
  isTarget: boolean; // 내가 찾아야 할 트랙인지 (로그인 성공 시)
  isOpen: boolean;   // 열려 있는지 (재생 중)
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export const StickerButton: React.FC<StickerButtonProps> = ({ 
  id, 
  isTarget, 
  isOpen,
  onMouseEnter, 
  onMouseLeave,
  onClick
}) => {
  // 트랙 제목 더미 데이터 (분위기용)
  const trackTitles = [
    "Intro: Uncertainty", "Natural", "Deep Dive", "Cracks",
    "Winter Haze", "Cocoa Break", "Fireplace", "Polaris",
    "Music Box", "Midnight Blue", "Side B", "Shelter"
  ];

  return (
    <div 
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative group cursor-none w-full h-24 border-b border-white/10 flex items-center px-4 hover:bg-white/5 transition-colors overflow-hidden ${
        isTarget ? 'animate-pulse bg-white/10' : ''
      }`}
    >
      {/* 배경 노이즈 (Hover 시 등장) */}
      <div className="absolute inset-0 bg-noise opacity-0 group-hover:opacity-20 transition-opacity"></div>

      {/* 왼쪽: 트랙 번호 */}
      <div className="w-12 text-sm font-mono text-gray-500 group-hover:text-[#A5F2F3] transition-colors">
        {String(id).padStart(2, '0')}
      </div>

      {/* 중앙: 트랙 정보 */}
      <div className="flex-1 flex flex-col justify-center ml-2">
        <div className={`font-serif text-lg text-gray-300 group-hover:text-white group-hover:tracking-wider transition-all duration-300 ${isTarget ? 'glitch-wrapper' : ''}`} data-text={trackTitles[id-1]}>
          {trackTitles[id-1]}
        </div>
        <div className="text-[10px] text-gray-600 font-mono group-hover:text-gray-400">
          3:24 • REMASTERED 2026
        </div>
      </div>

      {/* 오른쪽: 상태 아이콘 */}
      <div className="ml-4 text-gray-600 group-hover:text-white transition-colors">
        {isOpen ? (
          <Disc size={20} className="animate-spin-slow text-[#A5F2F3]" />
        ) : isTarget ? (
          <Music2 size={20} className="animate-bounce text-[#FF00FF]" />
        ) : (
          <Lock size={16} className="opacity-50" />
        )}
      </div>

      {/* 재생 바 (Hover 시 늘어남) */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[#A5F2F3] to-[#FF00FF] w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
      
      {/* Glitch Overlay (타겟일 때) */}
      {isTarget && (
        <div className="absolute inset-0 bg-white/5 animate-pulse mix-blend-overlay pointer-events-none"></div>
      )}
    </div>
  );
};