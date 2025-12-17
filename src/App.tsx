import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { CursorVariant } from './types';
import { STAGES } from './constants/stages';
import { audioCtx, bgmPlayer, playSound } from './utils/audio';
import { CustomCursor } from './components/CustomCursor';
import { RacingIntroCanvas } from './components/RacingIntroCanvas';
import { SnowCanvas } from './components/SnowCanvas';
import { GlitchText } from './components/GlitchText';
import { PixelDoor } from './components/PixelDoor';
import { StartScreen } from './components/StartScreen';
import { Modal } from './components/Modal';
import './styles/global.css';

/**
 * HEART-BIT: 80s Retro Style Interactive Winter Message Board
 * 
 * 겨울 테마의 인터랙티브 메시지 보드입니다.
 * 레트로 8비트 스타일로 12개의 스테이지로 구성되어 있습니다.
 */

export default function App() {
  // 상태 관리
  const [started, setStarted] = useState(false);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [glitchMode, setGlitchMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [shake, setShake] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');

  // 시작 핸들러
  const handleStart = () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    bgmPlayer.start();
    playSound('click');
    setStarted(true);
  };

  // 음소거 토글
  const handleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) bgmPlayer.stop();
    else bgmPlayer.start();
  };

  // 스테이지 클릭
  const handleStageClick = (id: number) => {
    playSound('click');
    setSelectedStage(id);
    setPasswordInput('');
    setIsUnlocked(false);
    setIsPasswordOpen(true);
  };

  // 모달 닫기
  const handleClose = () => {
    playSound('click');
    setIsPasswordOpen(false);
    setSelectedStage(null);
  };

  // 비밀번호 확인
  const checkPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '1234') {
      playSound('success');
      setIsUnlocked(true);
    } else {
      playSound('error');
      triggerGlitch();
    }
  };

  // 글리치 효과 트리거
  const triggerGlitch = () => {
    setGlitchMode(true);
    setShake(true);
    setTimeout(() => {
      setGlitchMode(false);
      setShake(false);
    }, 500);
  };

  const currentStage = STAGES.find(s => s.id === selectedStage);

  return (
    <div className={`min-h-screen bg-[#050510] text-white font-mono overflow-hidden select-none cursor-none ${glitchMode ? 'animate-glitch-screen' : ''}`}>
      
      {/* 커스텀 커서 */}
      <CustomCursor variant={cursorVariant} />

      {/* 배경 레이어 */}
      {started ? <SnowCanvas /> : <RacingIntroCanvas />}
      
      <div className="fixed inset-0 scanlines pointer-events-none z-40 opacity-30"></div>
      <div className="fixed inset-0 pointer-events-none z-50 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]"></div>

      {/* 시작 화면 */}
      {!started && (
        <StartScreen 
          onStart={handleStart}
          onMouseEnter={() => setCursorVariant('coin')}
          onMouseLeave={() => setCursorVariant('default')}
        />
      )}

      {/* 메인 콘텐츠 */}
      <div className={`relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col ${started ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        
        {/* 헤더 */}
        <header className="flex justify-between items-center mb-12 border-b-4 border-white/20 pb-4">
          <div className="text-left">
            <h2 className="text-[#FF00FF] text-sm md:text-base mb-2 animate-pulse">1P START</h2>
            <GlitchText text="HEART-BIT" className="text-2xl md:text-4xl text-white drop-shadow-[2px_2px_0px_#FF00FF]" />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[#00FF00] text-xs">SCORE: <span className="text-white">999999</span></p>
              <p className="text-[#00FF00] text-xs">TIME: <span className="text-white">∞</span></p>
            </div>
            <button 
              onClick={handleMute}
              onMouseEnter={() => setCursorVariant('pointer')}
              onMouseLeave={() => setCursorVariant('default')}
              className="p-2 border-2 border-white hover:bg-white/20 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </header>

        {/* 스테이지 그리드 */}
        <div className="flex-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8 pb-12 px-4">
          {STAGES.map((stage) => (
            <PixelDoor 
              key={stage.id} 
              stage={stage} 
              onClick={() => handleStageClick(stage.id)}
              onMouseEnter={() => {
                playSound('hover');
                setCursorVariant('pointer');
              }}
              onMouseLeave={() => setCursorVariant('default')}
            />
          ))}
        </div>

        {/* 푸터 */}
        <footer className="text-center text-xs text-gray-500 mt-auto crt-flicker pt-12">
          <p>© 2024 HEART-BIT SYSTEM. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 text-[#FFFF00]">INSERT PASSWORD TO UNLOCK MEMORIES</p>
        </footer>
      </div>

      {/* 모달 */}
      {isPasswordOpen && currentStage && (
        <Modal 
          stage={currentStage}
          isUnlocked={isUnlocked}
          passwordInput={passwordInput}
          glitchMode={glitchMode}
          shake={shake}
          onClose={handleClose}
          onPasswordChange={setPasswordInput}
          onSubmit={checkPassword}
          onMouseEnter={() => setCursorVariant('pointer')}
          onMouseLeave={() => setCursorVariant('default')}
        />
      )}
    </div>
  );
}
