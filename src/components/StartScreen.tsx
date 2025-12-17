import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ 
  onStart, 
  onMouseEnter, 
  onMouseLeave 
}) => {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/60 backdrop-blur-[3px] animate-fade-in">
      
      {/* 🌙 메인 타이틀 영역 */}
      <div className="relative text-center mb-16 group cursor-none">
        
        {/* 장식용 별 */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-yellow-200 animate-pulse text-4xl">✨</div>

        {/* 메인 텍스트 */}
        <h1 className="text-4xl md:text-7xl font-['Press_Start_2P'] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-4 tracking-tighter">
          <span className="text-[#A5F2F3] inline-block hover:-translate-y-2 transition-transform duration-300">W</span>
          <span className="text-white inline-block hover:-translate-y-2 transition-transform duration-300 delay-75">I</span>
          <span className="text-white inline-block hover:-translate-y-2 transition-transform duration-300 delay-100">N</span>
          <span className="text-white inline-block hover:-translate-y-2 transition-transform duration-300 delay-150">T</span>
          <span className="text-white inline-block hover:-translate-y-2 transition-transform duration-300 delay-200">E</span>
          <span className="text-[#A5F2F3] inline-block hover:-translate-y-2 transition-transform duration-300 delay-300">R</span>
          <br />
          <span className="block md:inline mt-4 md:mt-0 text-3xl md:text-6xl text-[#E8E6D1]">POST OFFICE</span>
        </h1>

        {/* 서브 텍스트 (감성) */}
        <div className="mt-8 space-y-2">
          <p className="text-lg md:text-2xl text-white/80 font-['Gowun_Batang'] font-bold tracking-widest border-t border-b border-white/20 py-2 inline-block">
            You have reached end of 2025
          </p>
          <p className="text-xs text-white/40 font-mono mt-2 tracking-[0.3em]">
            By Nayeon
          </p>
        </div>
      </div>

      {/* 🚪 입장 버튼 */}
      <div className="relative group">
        <button 
          onClick={onStart}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="relative px-12 py-4 bg-transparent border-2 border-[#E8E6D1] text-[#E8E6D1] font-['Press_Start_2P'] text-sm md:text-lg tracking-widest hover:bg-[#E8E6D1] hover:text-[#050510] transition-all duration-300 shadow-[0_0_20px_rgba(232,230,209,0.2)] hover:shadow-[0_0_40px_rgba(232,230,209,0.6)] hover:scale-105 active:scale-95"
        >
          ENTER
        </button>
        
        {/* 버튼 주변 장식 (회전하는 픽셀 눈송이) */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-2xl text-[#A5F2F3] opacity-0 group-hover:opacity-100 transition-all duration-300 animate-spin-slow group-hover:scale-125">❄</div>
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-2xl text-[#A5F2F3] opacity-0 group-hover:opacity-100 transition-all duration-300 animate-spin-slow group-hover:scale-125" style={{ animationDirection: 'reverse' }}>❄</div>
        
        {/* 상단/하단 눈송이 */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 text-xl text-white/60 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-2">✨</div>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 text-xl text-white/60 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-2">✨</div>
      </div>

      {/* 하단 푸터 */}
      <div className="absolute bottom-8 text-center text-white/20 text-[10px] font-mono">
        <p className="animate-pulse">PRESS START TO CONNECT</p>
      </div>

    </div>
  );
};