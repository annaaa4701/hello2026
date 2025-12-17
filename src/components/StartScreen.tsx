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
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
      {/* 메인 로고 */}
      <div className="relative mb-12 transform hover:scale-105 transition-transform duration-300">
        <h1 
          className="text-6xl md:text-8xl text-center font-bold tracking-tighter chrome-text snow-cap animate-rainbow"
          data-text="HEART-BIT"
        >
          HEART-BIT
        </h1>
        <div className="absolute -bottom-8 w-full text-center">
          <span className="text-[#FF00FF] text-lg md:text-xl tracking-[0.2em] font-bold drop-shadow-[0_0_10px_#FF00FF] animate-pulse">
            8-BIT WINTER LOVE
          </span>
        </div>
        
        {/* 반짝이는 별 장식 */}
        <div className="absolute -top-4 -right-8 text-yellow-300 animate-sparkle text-4xl">✦</div>
        <div className="absolute top-12 -left-12 text-cyan-300 animate-sparkle text-2xl" style={{animationDelay: '0.5s'}}>✦</div>
        <div className="absolute -bottom-4 right-0 text-pink-300 animate-sparkle text-3xl" style={{animationDelay: '1s'}}>✦</div>
      </div>

      {/* START 버튼 */}
      <button 
        onClick={onStart}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group relative px-10 py-5 bg-black border-4 text-2xl font-bold animate-coin transition-all transform hover:scale-110"
      >
        <span className="drop-shadow-md">INSERT COIN</span>
        
        {/* 버튼 빛나는 효과 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 group-hover:animate-pulse"></div>
      </button>
      
      {/* 하단 정보 */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-white/80 text-xs bg-black/50 px-3 py-1 rounded border border-white/20 animate-pulse">
          SOUND CARD: <span className="text-[#00FF00]">DETECTED</span>
        </p>
        <p className="text-white/60 text-[10px]">© 198X WINTER SOFT / ALL MEMORIES RESERVED</p>
      </div>

      {/* 장식용 픽셀 프레임 */}
      <div className="absolute top-8 left-8 w-16 h-16 border-4 border-cyan-400 animate-pulse"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-4 border-pink-400 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-4 border-yellow-400 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-4 border-green-400 animate-pulse" style={{animationDelay: '1.5s'}}></div>
    </div>
  );
};
