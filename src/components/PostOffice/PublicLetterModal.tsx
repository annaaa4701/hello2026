import React from 'react';
import { ArrowRight, Disc } from 'lucide-react';
import { PUBLIC_MESSAGE } from '../../constants/messages';

interface PublicLetterModalProps {
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const PublicLetterModal: React.FC<PublicLetterModalProps> = ({
  onClose,
  onMouseEnter,
  onMouseLeave
}) => {
  // 배경 스크롤 방지
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 animate-fade-in">
      
      {/* Booklet Container */}
      <div className="relative w-full max-w-5xl h-[80vh] bg-[#F0F0F0] text-[#111] shadow-[0_0_50px_rgba(255,255,255,0.1)] flex flex-col md:flex-row overflow-hidden transform transition-all duration-500">
        
        {/* Left Page: Artwork & Title */}
        <div className="w-full md:w-1/2 bg-[#050505] text-[#E0E0E0] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border-r border-gray-800">
          <div className="absolute inset-0 bg-noise opacity-20"></div>
          
          {/* Decorative Circle */}
          <div className="absolute -right-24 -top-24 w-64 h-64 border border-white/10 rounded-full animate-spin-slow"></div>

          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-gray-500">
              <Disc size={14} />
              <span>LINER NOTES</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight italic">
              TRUST<br/>THE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A5F2F3] to-[#FF00FF]">UNCERTAINTY</span>.
            </h2>
          </div>

          <div className="space-y-4 z-10">
            <p className="text-sm font-mono text-gray-400 border-l border-gray-700 pl-4">
              "Thanks to all the dips and cracks.<br/>
              They made me who I am."
            </p>
          </div>
        </div>

        {/* Right Page: Message Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col relative bg-[#F5F5F0]">
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}></div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
            <div className="font-mono text-xs text-gray-500 mb-8 tracking-widest uppercase border-b border-gray-300 pb-2">
              Foreword by {PUBLIC_MESSAGE.from}
            </div>
            
            <p className="text-base md:text-lg leading-loose font-serif text-[#111] whitespace-pre-line text-justify">
              {PUBLIC_MESSAGE.content}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-300 flex justify-between items-center">
            <span className="font-mono text-[10px] text-gray-400">PAGE 01 / 01</span>
            
            <button
              onClick={onClose}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className="group flex items-center gap-2 px-6 py-3 bg-[#111] text-white font-mono text-xs hover:bg-[#000] transition-all"
            >
              <span>VIEW TRACKLIST</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Center Spine Shadow */}
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none hidden md:block"></div>
      </div>
    </div>
  );
};