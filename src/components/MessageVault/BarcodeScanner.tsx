import React, { useState, useEffect } from 'react';
import { X, ScanLine, Printer } from 'lucide-react';

interface BarcodeScannerProps {
  onClose: () => void;
  onSubmit: (pw: string) => void;
  error: boolean;
  isLoading?: boolean;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ 
  onClose, 
  onSubmit, 
  error,
  isLoading = false
}) => {
  const [pw, setPw] = useState('');
  const [isPrinting, setIsPrinting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsPrinting(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pw);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      
      <div className={`
        relative bg-[#fffdf0] w-full max-w-[320px] shadow-[0_10px_40px_rgba(0,0,0,0.3)] 
        transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top
        ${isPrinting ? 'scale-y-0 opacity-0 translate-y-[-100px]' : 'scale-y-100 opacity-100 translate-y-0'}
      `}>
        
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] mix-blend-multiply"></div>

        <div className="absolute top-0 w-full h-3 bg-[#fffdf0]"
             style={{ background: 'radial-gradient(circle, transparent 50%, #fffdf0 50%) -5px -5px / 10px 10px repeat-x' }}>
        </div>
        <div className="absolute top-0 w-full h-3 bg-[#fffdf0] rotate-180 -mt-3" 
             style={{ background: 'radial-gradient(circle, transparent 50%, #fffdf0 50%) -5px -5px / 10px 10px repeat-x' }}>
        </div>

        <div className="relative p-6 pt-10 pb-8 flex flex-col items-center text-[#1a1a1a] font-mono">
          
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors z-20">
            <X size={18} />
          </button>

          <div className="w-full text-center border-b-2 border-dashed border-black/10 pb-4 mb-6">
            <h2 className="text-2xl font-black tracking-tight uppercase flex flex-col items-center gap-1">
              <Printer size={24} className="mb-2" />
              <span>RESILIENCE</span>
              <span className="text-sm font-normal tracking-widest">RECEIPT</span>
            </h2>
            <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wide">
              {new Date().toLocaleDateString()} • NO. 2026-01
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            
            <div className="relative group">
              <label className="text-[10px] font-bold text-gray-400 block mb-2 text-center tracking-widest">ENTER ACCESS CODE</label>
              <div className="relative flex justify-center">
                <input 
                  type="password" 
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  placeholder="••••"
                  maxLength={4}
                  className="w-32 bg-transparent text-center font-barcode text-5xl h-16 outline-none tracking-[0.2em] text-[#1a1a1a] placeholder:text-gray-200 focus:placeholder:text-transparent transition-all border-b-2 border-black/20 focus:border-red-500"
                  autoFocus
                />
              </div>
            </div>

            {/* 🔥 수정된 부분: 에러 메시지 (도장 효과) */}
            {error && (
              // 1. 바깥 div: 위치와 회전만 담당 (애니메이션 없음)
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center rotate-[-12deg] z-50 pointer-events-none">
                {/* 2. 안쪽 div: 쾅 찍히는 애니메이션만 담당 */}
                <div className="inline-block animate-stamp">
                  <div className="border-[3px] border-red-600 text-red-600 px-2 py-1 font-black text-2xl opacity-90 mix-blend-multiply tracking-widest bg-white/50 backdrop-blur-[1px]">
                    INVALID
                  </div>
                </div>
              </div>
            )}

            <div className="w-full text-xs space-y-1 opacity-60 mb-4 px-2">
                <div className="flex justify-between"><span>1 x NEW YEAR</span><span>$0.00</span></div>
                <div className="flex justify-between"><span>1 x MESSAGE</span><span>$0.00</span></div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1a1a1a] text-white py-3 font-bold text-sm tracking-widest hover:bg-red-600 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {isLoading ? (
                <span className="animate-pulse">SCANNING...</span>
              ) : (
                <>
                  <ScanLine size={16} /> CONFIRM
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t-2 border-dashed border-black/10 w-full text-center opacity-80">
            <p className="font-barcode text-5xl transform scale-y-125">20260101</p>
            <p className="text-[9px] mt-2 tracking-[0.3em]">THANK YOU</p>
          </div>

        </div>

        <div className="absolute bottom-0 w-full h-3 bg-[#fffdf0]"
             style={{ background: 'radial-gradient(circle, transparent 50%, #fffdf0 50%) -5px -5px / 10px 10px repeat-x' }}>
        </div>
      </div>
    </div>
  );
};