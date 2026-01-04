// src/components/PlaylistModal.tsx
import React from 'react';
import { X, Play, Music, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

// 🎵 트랙 데이터 수정 (앨범 아트 & 선곡 이유 추가)
// cover: 앨범 아트 경로 (public/assets/ 폴더 안에 넣어주세요)
// note: 이 노래를 고른 이유
const tracks = [
  { 
    id: 1, 
    artist: 'Young K', 
    title: 'Natural', 
    cover: '/assets/1.jpg', 
    note: "And I can't get enough\nI wish I could've been there myself" 
  },
  { 
    id: 2, 
    artist: 'Anne-Marie', 
    title: 'To Be Young', 
    cover: '/assets/2.jpg', 
    note: "We're all a mess,\nbut I guess\nThis is what it feels like to be young" 
  },
  { 
    id: 3, 
    artist: 'Post Malone', 
    title: 'Myself', 
    cover: '/assets/3.jpg', 
    note: "Hope this might be the last one\n'Cause I'm not fooling anyone" 
  },
  { 
    id: 4, 
    artist: 'Ariana Grande', 
    title: 'Twilight Zone', 
    cover: '/assets/4.jpg', 
    note: "And I swear I'm gonna lose it\nIf I keep playing your music\nBut what else is there to do?\nEverywhere I look I just see you" 
  },
  { 
    id: 5, 
    artist: 'Valley', 
    title: 'Can We Make It', 
    cover: '/assets/5.jpg', 
    note: "The world doesn't have to be so scary\nHelp me help you help me get some clarity" 
  },
  { 
    id: 6, 
    artist: 'Baby Queen', 
    title: 'Dover beach', 
    cover: '/assets/6.jpg', 
    note: "당연히 있을게 매일같이\n이 시간같이 힘들일 필요 없이" 
  },
  { 
    id: 7, 
    artist: 'Woodz', 
    title: 'Journey', 
    cover: '/assets/7.jpg', 
    note: "아무도 모르는 나의 깊은 맘속 맑은 하늘 넓은 바다가 있어\n파도보다 더 크게 외쳐 when tears filled my eyes 울어도 돼\n시원한 바람이 불어올 때 내 몸을 맡긴 채로 날아 멀리\n이 바다 너머 저 작은 섬의 또 다른 나를 마주쳤어" 
  },
];

interface PlaylistModalProps {
  onClose: () => void;
  currentTrackIndex: number;
  isPlaying: boolean;
  onTrackSelect: (index: number) => void;
  onTogglePlay: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
}

export const PlaylistModal: React.FC<PlaylistModalProps> = ({ 
  onClose, 
  currentTrackIndex, 
  isPlaying, 
  onTrackSelect,
  onTogglePlay,
  onPrevTrack,
  onNextTrack
}) => {
  // 현재 선택된 트랙
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-4 animate-fade-in-up">
      
      {/* 💿 CD 자켓 컨테이너 - 화면 너비에 맞춰 최대 너비 설정 */}
      <div className="relative bg-[#f4f4f0] w-full max-w-[95vw] md:max-w-6xl h-full md:h-auto md:max-h-[85vh] shadow-2xl flex flex-col md:flex-row overflow-hidden border-0 md:border-4 border-[#1a1a1a] rounded-none md:rounded-sm">
        
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black text-white hover:bg-red-600 transition-colors rounded-full">
          <X size={20} />
        </button>

        {/* [왼쪽/상단] 앨범 아트 & 선곡 이유 */}
        <div className="flex w-full md:w-5/12 bg-[#1a1a1a] relative flex-col text-white min-h-[40vh] md:min-h-0">
           
           {/* 1. 앨범 아트 이미지 (배경으로 깔기) - 클릭 시 재생/일시정지 */}
           <button 
             onClick={onTogglePlay}
             className="absolute inset-0 opacity-40 hover:opacity-60 transition-opacity group cursor-pointer"
           >
             <img 
               src={currentTrack.cover} 
               alt="album art" 
               className="w-full h-full object-cover grayscale transition-all duration-500"
               onError={(e) => (e.currentTarget.src = '/assets/b60527.png')} 
             />
             {/* 재생/일시정지 아이콘 오버레이 */}
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               {isPlaying ? (
                 <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                   <div className="flex gap-2">
                     <div className="w-2 h-8 bg-black"></div>
                     <div className="w-2 h-8 bg-black"></div>
                   </div>
                 </div>
               ) : (
                 <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                   <div className="w-0 h-0 border-l-[16px] border-l-black border-y-[10px] border-y-transparent ml-1"></div>
                 </div>
               )}
             </div>
           </button>

           {/* 2. 선곡 코멘트 (Liner Note) */}
           <div className="relative z-10 p-4 md:p-8 h-full flex flex-col justify-center">
              <div className="mb-4 md:mb-6 text-[#A5F2F3]">
                <Quote size={32} className="md:w-10 md:h-10 rotate-180 opacity-50" />
              </div>
              
              <p className="font-hand text-base md:text-2xl leading-relaxed tracking-wide break-keep drop-shadow-lg">
                "{currentTrack.note}"
              </p>

              <div className="mt-4 md:mt-8 pt-3 md:pt-4 border-t border-white/20">
                <p className="font-bebas text-2xl md:text-3xl tracking-wider">{currentTrack.title}</p>
                <p className="font-mono text-xs md:text-sm text-gray-400 uppercase tracking-[0.2em]">{currentTrack.artist}</p>
              </div>

              {/* 이전/다음 트랙 버튼 */}
              <div className="flex items-center justify-center gap-3 md:gap-4 mt-4 md:mt-6">
                <button 
                  onClick={onPrevTrack}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110 active:scale-95"
                  aria-label="이전 트랙"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button 
                  onClick={onTogglePlay}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all hover:scale-110 active:scale-95"
                  aria-label={isPlaying ? "일시정지" : "재생"}
                >
                  {isPlaying ? (
                    <div className="flex gap-1">
                      <div className="w-1 h-4 bg-white"></div>
                      <div className="w-1 h-4 bg-white"></div>
                    </div>
                  ) : (
                    <Play fill="white" size={16} />
                  )}
                </button>

                <button 
                  onClick={onNextTrack}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110 active:scale-95"
                  aria-label="다음 트랙"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
           </div>

           {/* CD 돌아가는 장식 (하단) */}
           <div className="absolute -bottom-12 -right-12 w-40 h-40 animate-spin-slow opacity-20">
             <img src="/assets/b60527.png" alt="cd" className="w-full h-full object-cover rounded-full" />
           </div>
        </div>


        {/* [오른쪽/하단] 트랙 리스트 */}
        <div className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] flex flex-col min-h-0">
           
           {/* 헤더 */}
           <div className="p-4 md:p-8 pb-3 md:pb-4 border-b-2 border-dashed border-black/10">
             <h2 className="font-black text-2xl md:text-4xl uppercase tracking-tighter flex items-center gap-2 md:gap-3">
               <Music className="w-8 h-8" strokeWidth={2.5} />
               Resilience Mix
             </h2>
             <p className="font-mono text-xs text-gray-500 mt-2 tracking-widest pl-1">
               SELECTED TRACKS FOR 2026
             </p>
           </div>
           
           {/* 리스트 (스크롤 가능) */}
           <ul className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
             {tracks.map((track, index) => (
               <li 
                 key={track.id}
                 onClick={() => onTrackSelect(index)}
                 className={`
                   group flex items-center gap-2 md:gap-4 p-2 md:p-4 cursor-pointer transition-all border-l-4
                   ${currentTrackIndex === index 
                     ? 'bg-yellow-100 border-black shadow-sm translate-x-2' 
                     : 'border-transparent hover:bg-black/5 hover:border-gray-300'
                   }
                 `}
               >
                 <span className={`font-mono font-bold text-sm md:text-xl w-6 md:w-8 ${currentTrackIndex === index ? 'text-black' : 'text-gray-400'}`}>
                   {String(index + 1).padStart(2, '0')}
                 </span>
                 
                 {/* 모바일에서만 보이는 작은 썸네일 */}
                 <img src={track.cover} alt="art" className="md:hidden w-8 h-8 rounded shadow-sm object-cover" />

                 <div className="flex-1 min-w-0">
                   <p className="font-bold text-sm md:text-lg uppercase truncate font-sans tracking-tight">
                     {track.title}
                   </p>
                   <p className="text-xs text-gray-500 uppercase font-mono tracking-wider">
                     {track.artist}
                   </p>
                 </div>
                 
                 {/* 선택 표시 */}
                 {currentTrackIndex === index && (
                   <Play fill="black" size={18} className="animate-pulse flex-shrink-0" />
                 )}
               </li>
             ))}
           </ul>

           {/* 푸터 */}
           <div className="p-4 bg-[#ecece9] border-t border-black/5 text-right">
             <span className="font-barcode text-3xl opacity-40">20260101</span>
           </div>
        </div>
      </div>
    </div>
  );
};