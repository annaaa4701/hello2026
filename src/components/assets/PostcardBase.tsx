import React from 'react';

// 공통 엽서 스타일 (앞면/뒷면 컨테이너)
export const PostcardContainer: React.FC<{ children: React.ReactNode, className?: string, isFlipped?: boolean }> = ({ 
  children, 
  className = '', 
  isFlipped = false 
}) => (
  <div className={`perspective-1000 w-full max-w-2xl aspect-[3/2] ${className}`}>
    <div className={`w-full h-full relative transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
      {children}
    </div>
  </div>
);

export const PostcardSide: React.FC<{ children: React.ReactNode, side: 'front' | 'back', className?: string }> = ({ 
  children, 
  side,
  className = ''
}) => (
  <div className={`absolute inset-0 w-full h-full backface-hidden bg-[#FFFDF0] shadow-2xl overflow-hidden border-4 border-[#E8E6D1] ${side === 'back' ? 'rotate-y-180' : ''} ${className}`}>
    {/* 종이 질감 노이즈 */}
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply" 
         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
    />
    {children}
  </div>
);

// 줄 노트 패턴 영역
export const LinedPaperArea: React.FC<{ 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void 
}> = ({ value, onChange }) => (
  <div className="relative w-full h-full p-6">
    <textarea
      value={value}
      onChange={onChange}
      placeholder="따뜻한 마음을 적어주세요..."
      className="w-full h-full bg-transparent resize-none outline-none text-[#2C3E50] text-sm md:text-lg leading-[2rem] korean-text"
      style={{
        backgroundImage: 'linear-gradient(transparent 95%, #E0D4B4 95%)',
        backgroundSize: '100% 2rem',
        backgroundAttachment: 'local',
        marginTop: '0.3rem'
      }}
    />
  </div>
);