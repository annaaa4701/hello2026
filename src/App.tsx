// src/App.tsx
import { useState, useEffect, useRef } from 'react';
import { playSound } from './utils/audio';

// Components
import { CustomCursor } from './components/CustomCursor';
import { MobileRadioBar } from './components/MobileRadiobar';
import { HandwrittenMemo } from './components/HandwrittenMemo';
import { TapeSticker, CDRackButton, ReceiptButton } from './components/StickerButton';
import { BarcodeScanner } from './components/MessageVault/BarcodeScanner';
import { HiddenTrack } from './components/MessageVault/HiddenTrack';
import { LinerNote } from './components/MessageVault/LinerNote';
import { LoadingIntro } from './components/LoadingIntro';
import { PlaylistModal } from './components/PlaylistModal';

import './styles/global.css';

// 🎵 Music Data
const TRACKS = [
  { id: 1, title: "Natural", artist: "Young K", src: "/cdplayer2025/assets/music/track1.mp3", cover: "/cdplayer2025/assets/1.jpg" },
  { id: 2, title: "To Be Young", artist: "Anne-Marie", src: "/cdplayer2025/assets/music/track2.mp3", cover: "/cdplayer2025/assets/2.jpg" },
  { id: 3, title: "Myself", artist: "Post Malone", src: "/cdplayer2025/assets/music/track3.mp3", cover: "/cdplayer2025/assets/3.jpg" },
  { id: 4, title: "Twilight Zone", artist: "Ariana Grande", src: "/cdplayer2025/assets/music/track4.mp3", cover: "/cdplayer2025/assets/4.jpg" },
  { id: 5, title: "Can We Make It", artist: "Valley", src: "/cdplayer2025/assets/music/track5.mp3", cover: "/cdplayer2025/assets/5.jpg" },
  { id: 6, title: "Dover beach", artist: "Baby Queen", src: "/cdplayer2025/assets/music/track6.mp3", cover: "/cdplayer2025/assets/6.jpg" },
  { id: 7, title: "Journey", artist: "Woodz", src: "/cdplayer2025/assets/music/track7.mp3", cover: "/cdplayer2025/assets/7.jpg" },
];

export default function App() {
  // === State Management ===
  const [started, setStarted] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPublicLetter, setShowPublicLetter] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [foundMessage, setFoundMessage] = useState<any>(null);
  const [loginError, setLoginError] = useState(false);
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  
  // === Audio State ===
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = TRACKS[currentTrackIndex];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // === Audio Logic ===
  useEffect(() => {
    if (!audioRef.current) { 
      audioRef.current = new Audio(currentTrack.src); 
      audioRef.current.loop = true; 
    } else { 
      audioRef.current.src = currentTrack.src; 
    }
    if (isPlaying && started) audioRef.current.play().catch(() => {});
    return () => { audioRef.current?.pause(); };
  }, [currentTrackIndex, started, currentTrack.src, isPlaying]);

  useEffect(() => {
    if (audioRef.current) isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  const handleStart = () => { 
    setShowPublicLetter(true); 
    playSound('click'); 
  };
  
  const togglePlayPause = () => { 
    setIsPlaying(!isPlaying); 
    playSound('click'); 
  };
  
  const nextTrack = () => { 
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length); 
    playSound('click'); 
  };
  
  const prevTrack = () => { 
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length); 
    playSound('click'); 
  };

  const handleLogin = async (pw: string) => {
    setIsLoadingMessage(true);
    setLoginError(false);
    
    try {
      const res = await fetch('/api/open', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });

      const data = await res.json();

      if (!data.ok) {
        playSound('error');
        setLoginError(true);
        return;
      }

      setLoginError(false);
      setShowLogin(false);
      setFoundMessage({
        content: data.content,
        reply: data.reply,
        from: data.from,
      });
      playSound('success');
      setTimeout(() => setShowLetter(true), 800);
    } catch (err) {
      console.error('Login error:', err);
      playSound('error');
      setLoginError(true);
    } finally {
      setIsLoadingMessage(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans text-[#1a1a1a] selection:bg-red-600 selection:text-white">
      
      {/* ==============================================
          1. BACKGROUND: 인트로와 통일된 질감
          - 미색(#f4f4f0) 배경 + 그리드 + 노이즈
      =============================================== */}
      <div className="fixed inset-0 bg-[#f4f4f0] z-0 pointer-events-none">
        {/* 모눈종이 패턴 (인트로와 연결) */}
        <div className="absolute inset-0 opacity-[0.15]" 
             style={{ backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>
        {/* 거친 노이즈 텍스처 (인트로와 동일) */}
        <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      <CustomCursor variant="default" />
      
      {!started && <LoadingIntro onStart={handleStart} onMouseEnter={() => {}} onMouseLeave={() => {}} />}

      {/* ==============================================
          2. MOBILE TOP BAR (Radio Style)
      =============================================== */}
      <MobileRadioBar 
        isPlaying={isPlaying}
        currentTrack={`${currentTrack.title} - ${currentTrack.artist}`}
        onTogglePlay={togglePlayPause}
        onExpand={() => setShowPlaylist(true)}
      />

      {/* ==============================================
          3. MAIN DESK CANVAS (무드 통일 버전)
      =============================================== */}
      <main className={`
          relative w-full min-h-screen 
          pt-24 md:pt-0 pb-20 md:pb-0
          overflow-y-auto md:overflow-hidden 
          transition-all duration-1000 ease-in-out
          ${started ? 'opacity-100 scale-100' : 'opacity-0 scale-105 filter blur-sm'}
      `}>
        
        <div className="
            relative w-full max-w-7xl mx-auto h-full min-h-[90vh] md:h-screen
            flex flex-col items-center gap-16 md:block
        ">
            
            {/* --- A. TITLE (Top Left) 인트로 스타일 통일 --- */}
            <div className="md:absolute md:top-12 md:left-12 z-10 w-full md:w-auto px-6 md:px-0 text-center md:text-left mt-8 md:mt-0">
               <h1 className="font-bebas text-7xl md:text-9xl text-[#1a1a1a] leading-[0.85] tracking-tighter drop-shadow-sm">
                  NEW<br/>BEGINNINGS
               </h1>
               {/* 인트로의 블랙 라벨 스타일 적용 */}
               <div className="inline-block relative group mt-4">
                 <p className="font-mono bg-[#1a1a1a] text-[#f4f4f0] px-3 py-1 text-sm md:text-base tracking-widest rotate-[-1deg]">
                    2026 / RESILIENCE
                 </p>
               </div>
            </div>

            {/* --- B. CD PLAYER & CD RACK (모바일: 좌우 배치, 데스크탑: 중앙) --- */}
            <div className="w-full md:w-auto flex flex-row md:block justify-center items-center gap-2 px-8 md:px-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20 my-0 md:my-0">
               {/* CD Player */}
               <div className="relative w-[180px] h-[180px] md:w-[360px] md:h-[360px] shrink-0 ml-12 md:ml-0">
                  {/* Glass Case Container (투명도 조정) */}
                  <div className="absolute inset-0 bg-[#fcfcfc]/40 backdrop-blur-md rounded-[24px] md:rounded-[40px] border border-white/60 shadow-[10px_10px_20px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] md:shadow-[20px_20px_40px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] flex flex-col items-center justify-center z-10">
                     
                     {/* Screws */}
                     <Screw className="absolute top-3 left-3 md:top-5 md:left-5" />
                     <Screw className="absolute top-3 right-3 md:top-5 md:right-5" />
                     <Screw className="absolute bottom-3 left-3 md:bottom-5 md:left-5" />
                     <Screw className="absolute bottom-3 right-3 md:bottom-5 md:right-5" />

                     {/* Spinning CD */}
                     <div className="relative w-[110px] h-[110px] md:w-[260px] md:h-[260px] rounded-full flex items-center justify-center mb-2 md:mb-6">
                        <img 
                          src={currentTrack.cover} 
                          className={`w-full h-full object-cover rounded-full shadow-xl border-[2px] md:border-[4px] border-white/20 ${isPlaying ? 'animate-spin-slow' : ''}`}
                          alt="CD"
                          onError={(e) => (e.currentTarget.src = '/cdplayer2025/assets/cd.svg')}
                        />
                        {/* Center Hole */}
                        <div className="absolute w-8 h-8 md:w-16 md:h-16 bg-[#2d3436] rounded-full border border-white/10 shadow-inner flex items-center justify-center">
                           <div className="w-2 h-2 md:w-4 md:h-4 bg-black rounded-full"></div>
                        </div>
                        {/* Glossy Reflection */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-black/40 pointer-events-none mix-blend-overlay"></div>
                     </div>

                     {/* Controls (블랙 테마로 통일) */}
                     <div className="flex items-center gap-3 md:gap-8">
                        <button onClick={prevTrack} className="opacity-50 hover:opacity-100 transition-opacity text-[#1a1a1a] scale-75 md:scale-100">
                          <PrevIcon />
                        </button>
                        <button 
                         onClick={togglePlayPause} 
                         className="w-8 h-8 md:w-14 md:h-14 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                        >
                          {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </button>
                        <button onClick={nextTrack} className="opacity-50 hover:opacity-100 transition-opacity text-[#1a1a1a] scale-75 md:scale-100">
                          <NextIcon />
                        </button>
                     </div>
                  </div>
                  {/* Drop Shadow underneath player */}
                  <div className="absolute -bottom-4 md:-bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-4 md:h-8 bg-black/30 blur-xl md:blur-2xl rounded-[100%] z-0"></div>
               </div>

               {/* CD Rack - 모바일에서 플레이어 옆에 배치 */}
               <div className="flex md:hidden items-center scale-[0.6]">
                  <CDRackButton onClick={() => setShowPlaylist(true)} />
               </div>
            </div>

            {/* --- C. MESSY CD STACK (Desktop Only - Right Bottom) --- */}
            <div className="hidden md:flex justify-center md:absolute md:bottom-12 md:right-12 z-30 transition-transform hover:-translate-y-2 active:scale-95">
               <CDRackButton onClick={() => setShowPlaylist(true)} />
            </div>

            {/* --- D. EJECT / LOGIN BUTTON (모바일: CD 플레이어 다음, 데스크탑: Left Bottom) --- */}
            <div className="flex justify-center md:absolute md:bottom-16 md:left-16 z-40 mt-0 md:mt-0">
               <div className="flex items-center gap-4">
                  <ReceiptButton onClick={() => setShowLogin(true)} className="md:scale-150" />
                  
                
                  
               </div>
            </div>

            {/* --- E. HANDWRITTEN MEMO (모바일: EJECT 다음, 데스크탑: Right Top) --- */}
            <div 
              onClick={() => setShowPublicLetter(true)}
              className="flex justify-center md:block md:absolute md:top-12 md:right-12 z-10 cursor-pointer hover:rotate-1 transition-transform duration-300 origin-top-right mt-0 md:mt-0"
            >
               <HandwrittenMemo />
            </div>
          {/* ==============================================
                F. COLLAGE STICKER PACK (Collage Book Style)
                스티커를 '안전 구역(Safe Zone)'에 배치하여 
                텍스트 가림을 방지하고 여백을 채웁니다.
            =============================================== */}

            {/* --- ZONE 1: 좌측 상단 (타이틀 주변) --- 
                제목을 피해 빈 공간에 배치합니다.
            */}
            {/* 1. Sticker 1 (별): 제목 'BEGINNINGS' 오른쪽 끝 빈 공간 */}
            <div className="hidden md:block md:absolute md:top-8 md:right-[22rem] z-0 rotate-0 opacity-100">
                 <img src="/cdplayer2025/stickers/sticker7.svg" alt="star" className="w-24 drop-shadow-md hover:spin-slow transition-all cursor-pointer" />
            </div>

            {/* 4. Sticker 4 (낙서): 제목 'NEW' 위쪽 여백 */}
            <div className="hidden md:block md:absolute md:top-8 md:left-[17%] z-0 rotate-[-12deg] opacity-100">
                 <img src="/cdplayer2025/stickers/sticker5.svg" alt="scribble" className="w-48 drop-shadow-md" />
            </div>

            {/* 노란색 스마일 테이프: 제목과 겹치지 않게 'RESILIENCE' 라벨 오른쪽 아래로 이동 */}
            <div className="hidden md:block md:absolute md:top-[20rem] md:left-[18rem] z-20 rotate-[-2deg] scale-90 opacity-90 hover:scale-110 transition-transform shadow-sm">
                 <TapeSticker label="KEEP SMILING :)" color="#ffec40" onClick={() => {}} />
            </div>


            {/* --- ZONE 2: 좌측 하단 (영수증 & 중간 여백) --- 
                영수증 주변을 꾸며서 심심하지 않게 만듭니다.
            */}
            {/* 2. Sticker 2 (바코드): 영수증 뒤에 큼지막하게 깔아주기 */}
            <div className="hidden md:block md:absolute md:top-[55%] md:left-[10%] rotate-[-2deg] z-0 opacity-100">
                 <img src="/cdplayer2025/stickers/sticker2.svg" alt="barcode" className="w-48 drop-shadow-md" />
            </div>

            {/* 3. Sticker 3 (오브제): 타이틀과 영수증 사이의 텅 빈 공간 채우기 */}
            <div className="hidden md:block md:absolute md:top-[70%] md:left-[20%] z-0 rotate-[15deg] scale-300 opacity-100">
                 <img src="/cdplayer2025/stickers/sticker3.svg" alt="deco" className="w-60 drop-shadow-sm hover:rotate-0 transition-transform duration-300" />
            </div>

            {/* 7. Sticker 7 (테이프/오브제): 영수증 바로 위를 장식 */}
            <div className="hidden md:block md:absolute md:bottom-48 md:left-[25%] z-10 rotate-[-5deg] opacity-100 mix-blend-multiply">
                 <img src="/cdplayer2025/stickers/sticker1.svg" alt="tape" className="w-20 drop-shadow-md" />
            </div>


            {/* --- ZONE 3: 우측 & 중앙 (메모 & 플레이어 꾸미기) --- 
                메모와 플레이어 사이의 흐름을 연결합니다.
            */}
            
            {/* 5. Sticker 5 (데코): 메모지 왼쪽 상단에 '핀'처럼 배치 */}
            <div className="hidden md:block md:absolute md:top-6 md:right-[22rem] z-20 rotate-[10deg]">
                 <img src="/cdplayer2025/stickers/sticker4.svg" alt="deco" className="w-20 drop-shadow-md hover:-translate-y-2 transition-transform" />
            </div>

            {/* 6. Sticker 6 (큰 배경): 플레이어 오른쪽 뒤편에 은은하게 깔기 */}
            <div className="hidden md:block md:absolute md:top-[55%] md:right-[28%] z-0 rotate-[10deg] opacity-60">
                 <img src="/cdplayer2025/stickers/sticker8.svg" alt="deco" className="w-32 drop-shadow-md hover:grayscale-0 transition-all" />
            </div>

            {/* 8. Sticker 8 (도형): 화면 오른쪽 끝 중앙 여백 채우기 */}
            <div className="hidden md:block md:absolute md:top-[40%] md:right-8 z-10 rotate-[5deg] opacity-100">
                 <img src="/cdplayer2025/stickers/sticker6.svg" alt="deco" className="w-32 drop-shadow-md" />
            </div> 

            {/* 2026 하트 테이프: 메모지 아래 공간 */}
            <div className="hidden md:block md:absolute md:top-[28rem] md:right-16 z-20 rotate-[4deg] hover:scale-105 transition-transform shadow-md">
                 <TapeSticker label="2026 ♡" color="#FFB7B2" onClick={() => {}} />
            </div>

            {/* 중앙 하단 라벨 */}
            <div className="hidden md:block md:absolute md:bottom-20 md:left-[42%] z-0 rotate-[-1deg] opacity-70">
                 <div className="bg-white/80 border-2 border-[#1a1a1a] px-3 py-1 font-barcode text-xl tracking-widest hover:bg-black hover:text-white transition-colors cursor-default">
                    * ORIGINAL_SOUND *
                 </div>
            </div>

        </div>
      </main>

      {/* ==============================================
          4. MODALS (Overlays)
      =============================================== */}
      
      {/* Login / Barcode Scanner */}
      {showLogin && (
        <BarcodeScanner 
          onClose={() => { setShowLogin(false); setLoginError(false); }} 
          onSubmit={handleLogin} 
          error={loginError} 
          isLoading={isLoadingMessage} 
        />
      )}
      
      {/* Private Letter (Found Message) */}
      {showLetter && foundMessage && (
        <HiddenTrack 
          messageData={foundMessage} 
          onClose={() => { setShowLetter(false); setFoundMessage(null); }} 
          onReply={async (txt) => { 
            try {
              const res = await fetch('/api/reply', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ password: 'stored-pw', reply: txt }),
              });
              
              const data = await res.json();
              
              if (data.ok) {
                playSound('success');
                setShowLetter(false);
              } else {
                playSound('error');
              }
            } catch (err) {
              console.error('Reply error:', err);
              playSound('error');
            }
          }}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        />
      )}
      
      {/* Music Playlist */}
      {showPlaylist && (
        <PlaylistModal 
          onClose={() => setShowPlaylist(false)}
          currentTrackIndex={currentTrackIndex}
          isPlaying={isPlaying}
          onTrackSelect={(index: number) => {
            setCurrentTrackIndex(index);
            if (!isPlaying) setIsPlaying(true);
            playSound('click');
          }}
          onTogglePlay={togglePlayPause}
          onPrevTrack={prevTrack}
          onNextTrack={nextTrack}
        />
      )}
      
      {/* Public Letter (General Message) */}
      {showPublicLetter && (
        <LinerNote 
          onClose={() => { 
            setShowPublicLetter(false); 
            setStarted(true); 
            setIsPlaying(true); 
          }} 
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        />
      )}
    </div>
  );
}

// === Sub-components (Icons) ===

const Screw = ({ className }: { className?: string }) => (
  <div className={`w-3 h-3 rounded-full bg-zinc-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)] flex items-center justify-center ${className}`}>
    <div className="w-[1px] h-full bg-zinc-600 rotate-45"></div>
    <div className="absolute w-[1px] h-full bg-zinc-600 -rotate-45"></div>
  </div>
);

const PlayIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const PrevIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
  </svg>
);

const NextIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
  </svg>
);
