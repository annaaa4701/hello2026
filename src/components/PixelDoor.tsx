import React from 'react';
import { Stage } from '../types';

interface PixelDoorProps {
  stage: Stage;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const PixelDoor: React.FC<PixelDoorProps> = ({ 
  stage, 
  onClick, 
  onMouseEnter, 
  onMouseLeave 
}) => {
  const isWindowStyle = stage.id % 3 === 0;
  const isPanelStyle = stage.id % 3 !== 0;

  return (
    <div 
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative cursor-none transform hover:-translate-y-1 transition-transform duration-200 aspect-[3/5]"
    >
      <div 
        className="w-full h-full bg-[#1a1a1a] p-1 md:p-2 relative shadow-lg"
        style={{ 
          boxShadow: `4px 4px 0px rgba(0,0,0,0.5), 0 0 10px ${stage.color}40`
        }}
      >
        <div 
          className="w-full h-full p-1 md:p-2 flex flex-col relative"
          style={{ backgroundColor: stage.color, filter: 'brightness(0.7)' }}
        >
          <div className="flex-1 w-full relative border-2 border-black/20" 
               style={{ backgroundColor: stage.color, filter: 'brightness(0.9)' }}>
            
            {isWindowStyle && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-[#87CEEB] border-4 border-black/30 shadow-inner overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-white/20 -skew-x-12 translate-x-1/2"></div>
              </div>
            )}

            {isPanelStyle && (
              <div className="w-full h-full grid grid-cols-1 grid-rows-3 gap-3 p-4">
                <div className="bg-black/10 border-r-2 border-b-2 border-white/10 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)]"></div>
                <div className="bg-black/10 border-r-2 border-b-2 border-white/10 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)]"></div>
                <div className="bg-black/10 border-r-2 border-b-2 border-white/10 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)]"></div>
              </div>
            )}

            <div className="absolute bottom-[35%] right-3 w-3 h-3 md:w-4 md:h-4 bg-[#FFD700] border-b-2 border-r-2 border-[#B8860B] shadow-md group-hover:bg-[#FFFACD]"></div>

            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none mix-blend-overlay"></div>
          </div>
        </div>

        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-2 py-1 border border-white/20 text-[10px] text-white font-bold">
          STAGE {String(stage.id).padStart(2, '0')}
        </div>
      </div>

      <div className="mt-2 text-center">
        <span 
          className="text-xs md:text-sm px-2 py-0.5 bg-black/50 backdrop-blur-sm border border-white/10"
          style={{ color: stage.color, textShadow: '1px 1px 0 #000' }}
        >
          {stage.keyword}
        </span>
      </div>
    </div>
  );
};
