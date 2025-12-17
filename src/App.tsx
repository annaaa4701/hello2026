import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { CursorVariant, MessageData } from './types';
import { MESSAGES, PO_BOXES } from './constants/messages';
import { audioCtx, bgmPlayer, playSound } from './utils/audio';

import { CustomCursor } from './components/CustomCursor';
import { WinterForestCanvas } from './components/WinterForestCanvas'; 
import { SnowCanvas } from './components/SnowCanvas';
import { GlitchText } from './components/GlitchText';
import { PixelDoor } from './components/PixelDoor';
import { StartScreen } from './components/StartScreen';
import { LoginModal } from './components/PostOffice/LoginModal';
import { PostOfficeModal } from './components/PostOffice/PostOfficeModal';
import { PublicLetterModal } from './components/PostOffice/PublicLetterModal';

import './styles/global.css';

export default function App() {
  // ======================
  // 🎵 Audio & UI State
  // ======================
  const [isMuted, setIsMuted] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('snowflake');

  // ======================
  // 🌟 UX Flow State
  // ======================
  const [started, setStarted] = useState(false);                      // Phase 1: StartScreen
  const [showPublicLetter, setShowPublicLetter] = useState(false);   // Phase 2: PublicLetterModal (초대장)
  const [showLogin, setShowLogin] = useState(false);                  // Phase 4: LoginModal (본인 확인)
  const [loginError, setLoginError] = useState(false);
  const [targetDoorId, setTargetDoorId] = useState<number | null>(null);   // Phase 5: 흔들릴 문 ID
  const [openedDoorId, setOpenedDoorId] = useState<number | null>(null);   // Phase 5: 열린 문 ID
  const [foundMessage, setFoundMessage] = useState<MessageData | null>(null); // Phase 6: 읽을 메시지
  const [showLetter, setShowLetter] = useState(false);                // Phase 6: PostOfficeModal

  // ======================
  // 📬 Phase 1: 진입 (StartScreen → PublicLetterModal)
  // ======================
  const handleStart = () => {
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    bgmPlayer.start();
    playSound('click');
    setStarted(true);
    
    // 부드러운 전환 후 초대장 표시
    setTimeout(() => {
      setShowPublicLetter(true);
      setCursorVariant('pointer'); // 편지 위에서는 pointer가 더 인터랙티브함
    }, 1000);
  };

  // ======================
  // 📬 Phase 2 → Phase 3: 초대장 읽기 완료 → 우체국 로비 입장
  // ======================
  const handleEnterPostOffice = () => {
    playSound('click');
    setShowPublicLetter(false);
    setCursorVariant('snowflake'); // 로비로 돌아오면 다시 눈꽃 커서
  };

  // ======================
  // 📬 Phase 4 → Phase 5: 로그인 성공 → 문 흔들림 → 열림
  // ======================
  const handleLogin = (name: string, pw: string) => {
    const msg = MESSAGES.find(m => m.receiver === name && m.password === pw);
    
    if (msg) {
      setLoginError(false);
      setShowLogin(false);
      setFoundMessage(msg);
      setTargetDoorId(msg.doorId); // 문 흔들림 시작!
      playSound('success');

      // [연출] 1초 후 문이 "끼이익-" 소리와 함께 열립니다
      setTimeout(() => {
        playSound('open');
        setOpenedDoorId(msg.doorId);
        
        // [연출] 0.8초 후 편지가 줌인되며 화면을 채웁니다
        setTimeout(() => {
          setShowLetter(true);
          setCursorVariant('default');
        }, 800);
      }, 1000);

    } else {
      // 실패 시 모달 흔들림
      playSound('error');
      setLoginError(true);
    }
  };

  // ======================
  // 📬 Phase 6: 답장 전송 → Phase 7: 퇴장 (로비 복귀)
  // ======================
  const handleReply = (content: string) => {
    console.log("📮 답장 전송:", content);
    playSound('success');
    // 편지가 날아가는 애니메이션 후 모든 상태 초기화
    setTimeout(() => {
      handleCloseAll();
    }, 2000);
  };

  const handleCloseAll = () => {
    setShowLetter(false);
    setOpenedDoorId(null);
    setTargetDoorId(null);
    setFoundMessage(null);
    setShowLogin(false);
    setCursorVariant('snowflake'); // 다시 로비 - 눈꽃 커서
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) bgmPlayer.stop(); else bgmPlayer.start();
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white font-mono overflow-hidden select-none cursor-none">
      
      {/* ❄️ 눈꽃 커서 적용 */}
      <CustomCursor variant={cursorVariant} />

      {/* 배경 */}
      <div className="fixed inset-0 z-0">
         {started ? <SnowCanvas /> : <WinterForestCanvas />}
         <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
      </div>

      {!started && (
        <StartScreen 
          onStart={handleStart} 
          onMouseEnter={() => setCursorVariant('pointer')}
          onMouseLeave={() => setCursorVariant('snowflake')}
        />
      )}

      {/* 메인 우체국 화면 */}
      <div className={`relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col transition-all duration-1000 ${started ? 'opacity-100' : 'opacity-0'} ${showPublicLetter ? 'blur-sm scale-95' : ''}`}>
        
        {/* 헤더 */}
        <header className="flex justify-between items-center mb-4 border-b-4 border-[#8B4513] pb-4 bg-black/40 backdrop-blur-sm p-4 rounded-lg">
          <div 
            onClick={() => setShowPublicLetter(true)}
            className="cursor-none group"
          >
            <p className="text-[#FFD700] text-xs mb-1 animate-pulse">Goodbye 2025</p>
            <GlitchText text="You have a letter!" className="text-xl md:text-3xl text-[#E8E6D1]" />
            <span className="text-[10px] text-gray-400 group-hover:text-white transition-colors block mt-1 opacity-0 group-hover:opacity-100">
              ( Click to read letter for all again )
            </span>
          </div>
          <button 
            onClick={toggleMute} 
            className="p-2 hover:bg-white/10 rounded-full border border-white/20"
            onMouseEnter={() => setCursorVariant('pointer')}
            onMouseLeave={() => setCursorVariant('snowflake')}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </header>

        {/* FIND MY LETTER 버튼 */}
        <div className="mb-4 text-center">
          <button 
            onClick={() => setShowLogin(true)}
            onMouseEnter={() => setCursorVariant('pointer')}
            onMouseLeave={() => setCursorVariant('snowflake')}
            disabled={showPublicLetter}
            className="px-8 py-3 bg-[#8B4513] border-4 border-[#E8E6D1] text-[#E8E6D1] font-bold text-base hover:bg-[#a0522d] transition-transform hover:scale-105 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            FIND MY LETTER
          </button>
        </div>

        {/* 사서함 그리드 */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 p-4 bg-[#1a0f0a] border-8 border-[#3e2723] rounded-lg shadow-2xl relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#3e2723] rounded-t-lg flex justify-center items-center border-t border-l border-r border-[#5d4037]">
            <div className="w-2 h-2 rounded-full bg-[#FFD700] mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-[#FFD700] mx-1"></div>
          </div>

          {PO_BOXES.map((box) => (
            <PixelDoor 
              key={box.id} 
              id={box.id} 
              isTarget={targetDoorId === box.id}
              isOpen={openedDoorId === box.id}
              onClick={() => {
                if(!openedDoorId && !showPublicLetter) {
                    setShowLogin(true);
                    setCursorVariant('default');
                }
              }}
              onMouseEnter={() => {
                 if(!openedDoorId && !showPublicLetter) {
                     playSound('hover');
                     setCursorVariant('key');
                 }
              }}
              onMouseLeave={() => setCursorVariant('snowflake')}
            />
          ))}
        </div>

        <footer className="mt-4 text-center py-4 text-gray-500 text-xs">
          <p>© 2025 ANNAAA4701. ALL MEMORIES RESERVED.</p>
        </footer>
      </div>

      {showPublicLetter && (
        <PublicLetterModal
          onClose={handleEnterPostOffice}
          onMouseEnter={() => setCursorVariant('pointer')}
          onMouseLeave={() => setCursorVariant('default')}
        />
      )}

      {showLogin && (
        <LoginModal 
          onClose={() => { setShowLogin(false); setLoginError(false); }}
          onSubmit={handleLogin}
          error={loginError}
          onMouseEnter={() => setCursorVariant('pointer')}
          onMouseLeave={() => setCursorVariant('default')}
        />
      )}

      {showLetter && foundMessage && (
        <PostOfficeModal 
          messageData={foundMessage}
          onClose={handleCloseAll}
          onReply={handleReply}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          setCursor={setCursorVariant}
        />
      )}
    </div>
  );
}