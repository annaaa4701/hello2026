import React, { useState } from 'react';
import { X, Lock, Unlock, AlertTriangle } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onSubmit: (name: string, pw: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  error: boolean;
  isLoading?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({ 
  onClose, 
  onSubmit, 
  onMouseEnter,
  onMouseLeave,
  error,
  isLoading = false
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      {/* Container */}
      <div className={`w-full max-w-md bg-[#0a0a0a] border border-white/20 p-1 relative shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-transform duration-150 ${
        error ? 'animate-shake-horizontal border-red-500/50' : ''
      }`}>
        
        {/* Scanner Line Animation */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-[#A5F2F3] animate-[scan_2s_linear_infinite] opacity-50"></div>

        <div className="bg-[#111] p-8 flex flex-col items-center relative overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

          <button 
            onClick={onClose}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-20"
          >
            <X size={20} />
          </button>

          <div className="mb-8 flex flex-col items-center z-10">
            <div className={`p-4 rounded-full mb-4 ${error ? 'bg-red-500/10 text-red-500' : 'bg-white/5 text-[#A5F2F3]'}`}>
               {error ? <AlertTriangle size={32} /> : <Lock size={32} />}
            </div>
            <h2 className="text-xl text-white font-mono font-bold tracking-widest text-center">
              SECURITY CHECK
            </h2>
            <p className="text-[10px] text-gray-500 mt-2 font-mono uppercase">
              Enter credentials to unlock track
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 z-10">
            <div className="flex flex-col gap-2 group">
              <label className="text-[10px] text-gray-500 font-mono group-focus-within:text-[#A5F2F3] transition-colors">LISTENER NAME</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-[#A5F2F3] focus:shadow-[0_0_10px_rgba(165,242,243,0.2)] transition-all font-mono text-sm"
                placeholder="Ex) GUEST"
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="text-[10px] text-gray-500 font-mono group-focus-within:text-[#A5F2F3] transition-colors">ACCESS CODE</label>
              <input 
                type="password" 
                value={pw}
                onChange={e => setPw(e.target.value)}
                className="bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-[#A5F2F3] focus:shadow-[0_0_10px_rgba(165,242,243,0.2)] transition-all font-mono text-sm tracking-[0.5em]"
                placeholder="••••"
              />
            </div>

            {error && (
              <div className="text-center py-2 animate-fade-in">
                <p className="text-red-500 text-xs font-mono">
                  ERROR: INVALID CREDENTIALS
                </p>
              </div>
            )}

            <button 
              type="submit"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              disabled={isLoading}
              className="mt-4 py-4 bg-white text-black font-bold font-mono text-xs hover:bg-[#A5F2F3] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span>LOADING...</span>
                  <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                <>
                  <span>UNLOCK</span>
                  <Unlock size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};