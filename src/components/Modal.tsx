import React from 'react';
import { X, Lock, Heart } from 'lucide-react';
import { Stage } from '../types';

interface ModalProps {
  stage: Stage;
  isUnlocked: boolean;
  passwordInput: string;
  glitchMode: boolean;
  shake: boolean;
  onClose: () => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  stage,
  isUnlocked,
  passwordInput,
  glitchMode,
  shake,
  onClose,
  onPasswordChange,
  onSubmit,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className={`w-full max-w-lg bg-black border-4 p-6 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] ${shake ? 'animate-shake' : ''}`}
        style={{ borderColor: stage.color, boxShadow: `0 0 30px ${stage.color}40` }}
      >
        <button 
          onClick={onClose}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
        >
          <X size={24} />
        </button>

        {!isUnlocked ? (
          <div className="text-center py-8">
            <Lock className="mx-auto mb-4 animate-bounce" size={48} color={stage.color} />
            <h3 className="text-xl mb-6 text-[#0ff]">SECURITY CHECK</h3>
            <p className="text-xs text-gray-400 mb-8">ENTER PASSWORD FOR "{stage.keyword}"</p>
            
            <form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  maxLength={4}
                  value={passwordInput}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  placeholder="XXXX"
                  className="bg-black border-b-4 text-center text-3xl tracking-[1em] py-2 outline-none uppercase w-64 focus:border-white transition-colors cursor-none"
                  style={{ borderColor: stage.color, color: stage.color }}
                  autoFocus
                />
              </div>
              <p className="text-[10px] text-gray-500 mt-2">* HINT: 1234 (Demo)</p>
              
              {glitchMode && (
                <div className="text-red-500 text-sm mt-4 animate-pulse">
                  ACCESS DENIED // SYSTEM ERROR
                </div>
              )}
              
              <button 
                type="submit"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="mt-6 px-6 py-2 bg-white text-black hover:bg-gray-200 text-sm font-bold"
              >
                UNLOCK
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 animate-fade-in">
            <div className="mb-6 flex justify-center">
              <Heart className="animate-pulse" size={48} color={stage.color} fill={stage.color} />
            </div>
            <h3 
              className="text-2xl mb-8 underline decoration-wavy underline-offset-8"
              style={{ textDecorationColor: stage.color }}
            >
              DEAR. {stage.keyword}
            </h3>
            
            <div className="bg-[#111] p-6 border border-white/20 mb-8 transform -rotate-1">
              <p className="text-base md:text-lg leading-relaxed whitespace-pre-line korean-text text-gray-100">
                {stage.message}
              </p>
            </div>

            <div className="flex justify-center gap-2 mb-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white animate-ping" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
            
            <p className="text-xs text-gray-500">MESSAGE DECODED SUCCESSFULLY</p>
          </div>
        )}
      </div>
    </div>
  );
};
