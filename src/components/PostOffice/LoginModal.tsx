import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onSubmit: (name: string, pw: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  error: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({ 
  onClose, 
  onSubmit, 
  onMouseEnter,
  onMouseLeave,
  error 
}) => {
  const [name, setName] = useState('');
  const [pw, setPw] = useState('');

  // 배경 스크롤 방지
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, pw);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md bg-[#2C3E50] border-4 border-[#E8E6D1] p-1 relative shadow-[10px_10px_0px_rgba(0,0,0,0.5)] transition-transform duration-150 ${
        error ? 'animate-shake-horizontal' : ''
      }`}>
        {/* 내부 프레임 */}
        <div className="border-2 border-dashed border-[#E8E6D1]/30 p-6 flex flex-col items-center">
          
          <button 
            onClick={onClose}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="absolute top-4 right-4 text-[#E8E6D1] hover:text-red-400 cursor-none p-2 hover:bg-white/10 rounded transition-colors z-10"
          >
            <X size={24} />
          </button>

          <h2 className="text-xl md:text-2xl text-[#E8E6D1] mb-8 font-['Press_Start_2P'] text-center leading-relaxed">
            TO FIND YOUR LETTER<br/>
            <span className="text-xs text-[#95a5a6] mt-2 block">ID/PW IN YOUR CARD</span>
          </h2>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#E8E6D1]">NAME (RECEIVER)</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="bg-black/50 border-b-2 border-[#E8E6D1] p-2 text-[#E8E6D1] outline-none focus:bg-black/80 korean-text"
                placeholder="이름을 입력하세요"
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#E8E6D1]">PASSWORD</label>
              <input 
                type="password" 
                value={pw}
                onChange={e => setPw(e.target.value)}
                className="bg-black/50 border-b-2 border-[#E8E6D1] p-2 text-[#E8E6D1] outline-none focus:bg-black/80 font-mono tracking-widest"
                placeholder="****"
              />
            </div>

            {error && (
              <div className="text-center bg-red-900/30 border border-red-400/50 p-3 rounded animate-fade-in">
                <p className="text-red-400 text-xs animate-pulse">
                  ⚠️ 정보를 찾을 수 없습니다.<br/>
                  <span className="text-[10px] text-red-300 opacity-70">이름과 암호를 다시 확인해주세요.</span>
                </p>
              </div>
            )}

            <button 
              type="submit"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className="mt-4 py-3 bg-[#E8E6D1] text-[#2C3E50] font-bold hover:bg-white transition-colors box-shadow-retro active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              FIND MY LETTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};