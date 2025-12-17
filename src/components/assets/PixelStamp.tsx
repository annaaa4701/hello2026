import React from 'react';

interface PixelStampProps {
  variant?: 'heart' | 'tree' | 'snowflake';
  className?: string;
  onClick?: () => void;
}

export const PixelStamp: React.FC<PixelStampProps> = ({ 
  variant = 'heart', 
  className = '',
  onClick 
}) => {
  const bgColors = {
    heart: '#FF6B6B',
    tree: '#2ECC71',
    snowflake: '#4FAEF7'
  };

  return (
    <div 
      onClick={onClick}
      className={`relative inline-flex items-center justify-center bg-white border-2 border-dashed border-gray-300 shadow-sm cursor-none transition-transform ${className}`}
      style={{
        width: '64px',
        height: '74px',
        imageRendering: 'pixelated'
      }}
    >
      <div className="absolute inset-0 w-full h-full" 
           style={{
             background: `
               radial-gradient(circle, transparent 3px, ${bgColors[variant]} 3.5px) -4px -4px / 10px 10px repeat-x,
               radial-gradient(circle, transparent 3px, ${bgColors[variant]} 3.5px) -4px 68px / 10px 10px repeat-x,
               radial-gradient(circle, transparent 3px, ${bgColors[variant]} 3.5px) -4px -4px / 10px 10px repeat-y,
               radial-gradient(circle, transparent 3px, ${bgColors[variant]} 3.5px) 58px -4px / 10px 10px repeat-y,
               ${bgColors[variant]}
             `
           }}
      />
      
      <svg viewBox="0 0 16 16" className="w-8 h-8 relative z-10 drop-shadow-md" style={{ shapeRendering: 'crispEdges' }}>
        {variant === 'heart' && <path d="M4 4h3v1h2V4h3v1h1v3h-1v1h-1v1h-1v1h-1v1H9v1H7v-1H6v-1H5v-1H4v-1H3V8H2V5h1V4z" fill="white"/>}
        {variant === 'tree' && <path d="M7 1h2v2h-1v1h2v1h-1v1h3v1h-1v1h2v2H3V8h2V7h-1V6h3V5H6V4h2V3H7V1zm0 9h2v4H7v-4z" fill="white"/>}
        {variant === 'snowflake' && <path d="M7 0h2v3h2v-1h2v2h-1v1h3v2h-3v1h1v2h-2v-1h-2v3H7v-3H5v1H3v-2h1v-1H1V5h3V4H3V2h2v1h2V0z" fill="white"/>}
      </svg>
      
      <div className="absolute -bottom-2 -right-2 w-10 h-10 border-2 border-black/20 rounded-full flex items-center justify-center rotate-[-15deg] pointer-events-none">
         <span className="text-[6px] font-bold text-black/20 font-mono">DEC 25</span>
      </div>
    </div>
  );
};