// src/components/StickerButton.tsx
import React from 'react';

interface StickerButtonProps {
  imgSrc?: string;
  label: string;
  onClick: () => void;
  className?: string;
  variant?: 'yellow' | 'white' | 'hologram';
}

interface CommonProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

/** 📜 Realistic Table (현실적인 표/문서) 
 * - A4 용지 질감, 격자무늬, 손글씨 느낌
 * - 클릭 시 '기본 편지' 열기
 */
export const RealisticTable: React.FC<CommonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-72 md:w-80 h-[400px] bg-[#fdfbf7] text-[#1a1a1a]
        shadow-[2px_2px_15px_rgba(0,0,0,0.2)] 
        rotate-1 hover:rotate-0 hover:scale-[1.02] hover:shadow-2xl
        transition-all duration-500 ease-out
        flex flex-col items-center p-6
        before:content-[''] before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] before:opacity-50 before:pointer-events-none
        ${className}
      `}
    >
      {/* 📌 상단 집게/테이프 장식 */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#e6cbb3] opacity-90 shadow-sm rotate-[-1deg] flex items-center justify-center">
         <span className="text-[10px] font-mono text-[#5d4037] tracking-widest">CONFIDENTIAL</span>
      </div>

      {/* 📄 표 내용 (Grid Layout) */}
      <div className="w-full h-full border-2 border-[#1a1a1a] mt-4 flex flex-col">
        {/* 헤더 */}
        <div className="h-16 border-b-2 border-[#1a1a1a] flex items-center justify-center bg-[#f0f0f0]">
          <h2 className="font-bebas text-4xl tracking-wide text-[#333]">2026 PLAN</h2>
        </div>
        
        {/* 본문 (줄 노트 느낌) */}
        <div className="flex-1 flex flex-col font-mono text-lg md:text-xl leading-relaxed text-left relative">
           {/* 배경 줄 */}
           <div className="absolute inset-0 flex flex-col">
              {[...Array(8)].map((_,i) => <div key={i} className="flex-1 border-b border-[#1a1a1a]/10"></div>)}
           </div>
           
           {/* 텍스트 내용 */}
           <div className="z-10 p-4 space-y-3 text-[#333]">
             <div className="flex justify-between">
               <span>01. Start</span>
               <span className="text-red-600 font-bold">✔ Check</span>
             </div>
             <div className="flex justify-between">
               <span>02. Resilience</span>
               <span className="font-mono text-sm mt-1 text-gray-500">In Progress...</span>
             </div>
             <p className="mt-4 text-sm text-gray-600 font-sans leading-snug">
               "Trust the uncertainty.<br/>
               The music will guide you."
             </p>
             <div className="mt-8 text-center">
               <span className="inline-block px-4 py-1 border-2 border-red-600 text-red-600 font-black -rotate-12 opacity-80 text-xl hover:scale-110 transition-transform">
                 OPEN LETTER ✉
               </span>
             </div>
           </div>
        </div>
        
        {/* 푸터 */}
        <div className="h-8 border-t-2 border-[#1a1a1a] flex items-center justify-between px-2 bg-[#f0f0f0] font-mono text-[10px]">
           <span>NO. 2026-01</span>
           <span>P.N.U</span>
        </div>
      </div>
    </button>
  );
};

/** 🏷️ 1. Dymo Label Style (다이모 - PAUSE, EJECT 용) */
export const DymoButton: React.FC<CommonProps & { variant?: 'black' | 'red' | 'blue' }> = ({ 
  onClick, 
  className = '', 
  label,
  variant = 'black'
}) => {
  const colors = {
    black: 'bg-[#1a1a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]',
    red: 'bg-[#c00] shadow-[inset_0_1px_0_rgba(255,200,200,0.3)]',
    blue: 'bg-[#0033cc] shadow-[inset_0_1px_0_rgba(200,200,255,0.3)]'
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-2 ${colors[variant]} 
        border-t border-b border-white/10
        shadow-[2px_3px_5px_rgba(0,0,0,0.5)]
        active:translate-y-[1px] active:shadow-[1px_1px_2px_rgba(0,0,0,0.5)]
        transition-all transform hover:scale-105
        flex items-center justify-center
        ${className}
      `}
    >
      <span className="font-sans font-black text-white text-lg md:text-xl tracking-[0.15em] uppercase drop-shadow-[0_1px_0_rgba(0,0,0,0.8)]">
        {label}
      </span>
      
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10" />
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-black/20" />
    </button>
  );
};

/** 🧾 Receipt Button (영수증 스타일 - 모달 트리거) */
export const ReceiptButton: React.FC<CommonProps> = ({ onClick, className = '' }) => {
  // 모달과 동일한 미색 배경
  const PAPER_COLOR = '#fdfbf7';

  return (
    <button
      onClick={onClick}
      className={`
        group relative w-28 md:w-32 bg-[#fdfbf7] text-[#1a1a1a]
        shadow-[2px_4px_12px_rgba(0,0,0,0.15)]
        rotate-[-6deg] hover:rotate-0 hover:scale-105 hover:shadow-2xl hover:z-50
        transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        flex flex-col items-center
        pt-0 pb-0
        font-mono text-[10px] leading-tight
        ${className}
      `}
    >
      {/* ✂️ 상단 찢어진 효과 */}
      <div className="w-full h-2 relative"
        style={{ 
          backgroundImage: `radial-gradient(circle, transparent 50%, ${PAPER_COLOR} 50%)`,
          backgroundSize: '8px 8px',
          backgroundPosition: '-4px -4px',
          backgroundRepeat: 'repeat-x'
        }}>
      </div>

      {/* 📄 내용 영역 */}
      <div className="w-full px-3 py-2 flex flex-col items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
        {/* 종이 질감 */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-40 mix-blend-multiply pointer-events-none"></div>

        <span className="font-bold uppercase tracking-wider border-b-2 border-black/10 pb-1 mb-1 text-xs">
          RECEIPT
        </span>
        
        <div className="w-full flex justify-between text-[8px] text-gray-500 font-bold">
            <span>DATE</span>
            <span>2026.01</span>
        </div>
        
        <div className="w-full text-left my-1 space-y-[2px]">
            <div className="flex justify-between">
                <span>1 x HAPPINESS</span>
                <span>$10.13</span>
            </div>
            <div className="flex justify-between">
                <span>1 x RESILIENCE</span>
                <span>$10.13</span>
            </div>
        </div>

        <div className="w-full border-t border-dashed border-black/30 my-1"></div>

        {/* TOTAL */}
        <div className="w-full flex justify-between text-[9px] font-black">
            <span>TOTAL</span>
            <span>HAPPY NEW YEAR</span>
        </div>

        <div className="w-full border-t border-dashed border-black/30 my-1"></div>

        {/* 🔑 코드 입력 유도 부분 (강조) */}
        <div className="mt-1 flex flex-col items-center w-full bg-black/5 p-1 rounded-sm group-hover:bg-yellow-100 transition-colors">
            <span className="font-barcode text-xl h-6 text-black">HELLO2026</span>
            <span className="text-[7px] font-black tracking-[0.1em] mt-1 text-red-600 animate-pulse">
              ENTER ACCESS CODE  
            </span>
        </div>
      </div>

      {/* ✂️ 하단 찢어진 효과 */}
      <div className="w-full h-2 relative"
        style={{ 
          backgroundImage: `radial-gradient(circle, transparent 50%, ${PAPER_COLOR} 50%)`,
          backgroundSize: '8px 8px',
          backgroundPosition: '-4px 4px',
          backgroundRepeat: 'repeat-x',
          transform: 'rotate(180deg)'
        }}>
      </div>
    </button>
  );
};

/** 📜 2. Masking Tape Style (마스킹 테이프 - 기타 텍스트 용) */
export const TapeSticker: React.FC<CommonProps & { imgSrc?: string; color?: string }> = ({ onClick, className = '', label, imgSrc, color = '#f4e7c3' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-2 text-[#1a1a1a]
        shadow-md rotate-[-1deg] hover:rotate-0 hover:scale-110
        transition-all duration-300
        ${className}
      `}
      style={{
        backgroundColor: color,
        boxShadow: '2px 3px 5px rgba(0,0,0,0.2)'
      }}
    >
      {imgSrc ? (
        <div className="relative flex flex-col items-center">
          <img src={imgSrc} alt={label} className="w-20 h-20 object-contain opacity-90" />
          <span className="font-mono font-bold text-xs mt-1 uppercase">{label}</span>
        </div>
      ) : (
        <span className="font-mono font-bold text-lg md:text-xl tracking-tighter opacity-90">
          {label}
        </span>
      )}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-30 pointer-events-none mix-blend-multiply" />
    </button>
  );
};


/** 💿 3. Messy CD Stack (어지럽게 쌓인 CD들) 
 * - 각 CD가 약간씩 회전되고 어긋나게 배치
 * - 플라스틱 반사광 + 측면 힌지 디테일
 * - mikocard_final.pdf 데이터 기반
 */
export const CDRackButton: React.FC<CommonProps> = ({ onClick, className = '' }) => {
  const cds = [
    { artist: "YOUNG K", title: "Natural", color: "#cee7f3", text: "#111", rotate: "rotate-[-2deg]", translate: "-translate-x-4" },
    { artist: "ANNE-MARIE", title: "To Be Young", color: "#181717", text: "#f2f2f2", rotate: "rotate-[3deg]", translate: "translate-x-2" },
    { artist: "POST MALONE", title: "Myself", color: "#a91b18", text: "#fff", rotate: "rotate-[-1deg]", translate: "translate-x-0" },
    { artist: "ARIANA GRANDE", title: "Twilight Zone", color: "#e5e5e5", text: "#333", rotate: "rotate-[4deg]", translate: "-translate-x-2" },
    { artist: "VALLEY", title: "Can We Make It", color: "#333", text: "#ccc", rotate: "rotate-[-3deg]", translate: "translate-x-3" },
    { artist: "BABY QUEEN", title: "Dover beach", color: "#f8faed", text: "#111", rotate: "rotate-[2deg]", translate: "-translate-x-1" },
    { artist: "WOODZ", title: "Journey", color: "#cee7f3", text: "#111", rotate: "", translate: "translate-x-1" },
  ];
  
  return (
    <div 
      onClick={onClick}
      className={`relative group cursor-pointer w-72 md:w-80 perspective-1000 ${className}`}
    >


      <div className="flex flex-col items-center hover:scale-[1.02] active:opacity-80 transition-all duration-200">
        {cds.map((cd, i) => (
          <div 
            key={i}
            className={`
              relative w-full h-10 mb-[-1px]
              border-l-[2px] border-r-[2px] border-black/20
              shadow-[0_4px_6px_-1px_rgba(0,0,0,0.4)]
              flex items-center justify-between px-4
              font-bebas tracking-wider text-lg
              ${cd.rotate} ${cd.translate}
              transition-transform duration-300 ease-out
            `}
            style={{ 
                backgroundColor: cd.color,
                color: cd.text, 
                zIndex: cds.length - i,
                // 플라스틱 반사 그라디언트
                backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.1) 100%)'
            }}
          >
            {/* 힌지 디테일 (쥬얼 케이스 스파인) */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/20"></div>
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-black/20"></div>

            {/* 스파인 텍스트 */}
            <span className="truncate w-full text-center drop-shadow-md">
              {cd.artist} <span className="opacity-60 text-sm mx-1">//</span> {cd.title}
            </span>
          </div>
        ))}
      </div>
      
      {/* 하단 그림자 (전체 스택용) */}
      <div className="absolute bottom-0 left-4 right-4 h-4 bg-black/60 blur-lg rounded-[50%] z-[-1]"></div>
    </div>
  );
};

/** 🖼️ 4. 기본 스티커 버튼 (이미지 포함 가능) */
export const StickerButton: React.FC<StickerButtonProps> = ({ 
  imgSrc, 
  label, 
  onClick, 
  className = '',
  variant = 'white'
}) => {
  const bgStyles = {
    yellow: 'bg-[#ffec40] text-black border-2 border-black/10',
    white: 'bg-[#f0f0f0] text-black border border-gray-300',
    hologram: 'bg-gradient-to-tr from-cyan-300 via-white to-purple-300 text-blue-900 border border-white/50'
  };

  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center justify-center p-2 shadow-md
        transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:z-50
        active:scale-95 active:rotate-0
        ${bgStyles[variant]}
        ${className}
      `}
      style={{
        mixBlendMode: variant === 'hologram' ? 'normal' : 'hard-light' 
      }}
    >
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />

      {imgSrc ? (
        <div className="relative flex flex-col items-center">
           <img src={imgSrc} alt={label} className="w-24 h-24 object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
           <span className="font-mono font-bold text-xs mt-1 uppercase tracking-tighter bg-black text-white px-1">
             {label}
           </span>
        </div>
      ) : (
        <div className="flex flex-col items-center px-4 py-2">
          <span className="font-barcode text-4xl leading-none select-none">* {label} *</span>
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] mt-1 uppercase">{label}</span>
        </div>
      )}
    </button>
  );
};

/** ⏯️ 5. Geometric Control Button (투박한 도형 컨트롤러) */
export const GeometricControl: React.FC<{ 
    type: 'prev' | 'play' | 'pause' | 'next'; 
    onClick: () => void;
    className?: string;
}> = ({ type, onClick, className = '' }) => {
    
    const shapeContent = () => {
        switch(type) {
            case 'prev': // 뒤로 가기 (삼각형 + 막대)
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 20L9 12L19 4V20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <line x1="5" y1="4" x2="5" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                );
            case 'next': // 앞으로 가기 (막대 + 삼각형)
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M5 4L15 12L5 20V4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                         <line x1="19" y1="4" x2="19" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                );
            case 'play': // 재생 (삼각형)
                return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                );
             case 'pause': // 일시정지 (두 개의 막대)
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <line x1="8" y1="5" x2="8" y2="19" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                        <line x1="16" y1="5" x2="16" y2="19" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                );
        }
    };

    const isMain = type === 'play' || type === 'pause';

    return (
        <button 
            onClick={onClick}
            className={`
                relative flex items-center justify-center
                text-[#e0e0e0] transition-all transform hover:scale-110 active:scale-95
                ${isMain ? 'w-16 h-16 bg-[#e0e0e0] text-[#222] rounded-full border-4 border-[#222] shadow-[2px_2px_0px_#555]' : 'w-12 h-12 bg-transparent border-2 border-[#e0e0e0] rounded-lg hover:bg-white/10'}
                ${className}
            `}
            style={{
                // 약간 삐뚤어진 손그림 느낌
                boxShadow: isMain ? '3px 3px 0px #1a1a1a' : '2px 2px 0px rgba(255,255,255,0.2)',
            }}
        >
            {shapeContent()}
        </button>
  );
};
