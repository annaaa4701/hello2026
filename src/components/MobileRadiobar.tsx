import React from 'react';

interface MobileRadioBarProps {
  isPlaying: boolean;
  currentTrack: string;
  onTogglePlay: () => void;
  onExpand: () => void;
}

export const MobileRadioBar: React.FC<MobileRadioBarProps> = ({ 
  isPlaying, 
  currentTrack, 
  onTogglePlay, 
  onExpand 
}) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#1a1a1a] text-[#f2f2f2] z-50 flex items-center shadow-xl border-b-2 border-red-600">
      
      {/* 🔴 REC Indicator (Blinking) */}
      <div className="flex items-center px-4 border-r border-white/20 h-full">
        <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse mr-2"></div>
        <span className="font-bebas text-lg tracking-widest text-red-500">REC</span>
      </div>

      {/* 📻 Scrolling Text Area */}
      <div 
        className="flex-1 overflow-hidden relative h-full flex items-center bg-[#222]" 
        onClick={onExpand}
      >
        <div className="whitespace-nowrap animate-marquee px-4 font-mono text-xs text-[#a5f2f3]">
          CURRENTLY PLAYING: {currentTrack} // 2026 RESILIENCE MIX // TRUST THE UNCERTAINTY ...
        </div>
        {/* Gradient fade on right side */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#1a1a1a] to-transparent"></div>
      </div>

      {/* ⏯ Play/Pause Button */}
      <button 
        onClick={onTogglePlay}
        className="h-full px-5 bg-[#333] hover:bg-[#444] active:bg-red-600 transition-colors border-l border-white/20"
      >
        {isPlaying ? (
          <div className="flex gap-1 h-4 items-center">
            <div className="w-1 h-full bg-white animate-[bounce_1s_infinite]"></div>
            <div className="w-1 h-full bg-white animate-[bounce_1.2s_infinite]"></div>
            <div className="w-1 h-full bg-white animate-[bounce_0.8s_infinite]"></div>
          </div>
        ) : (
          // Simple Play Triangle
          <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
        )}
      </button>
    </div>
  );
};