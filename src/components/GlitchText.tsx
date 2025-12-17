import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  as: Component = 'h1', 
  className = '' 
}) => {
  return (
    <Component className={`relative inline-block group ${className}`} data-text={text}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#0ff] opacity-0 group-hover:opacity-70 animate-glitch-1 clip-rect-1 translate-x-[2px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#f0f] opacity-0 group-hover:opacity-70 animate-glitch-2 clip-rect-2 -translate-x-[2px]">
        {text}
      </span>
    </Component>
  );
};
