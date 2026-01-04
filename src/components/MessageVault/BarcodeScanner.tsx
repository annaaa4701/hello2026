import React, { useState, useEffect } from 'react';
import { X, Printer } from 'lucide-react';

interface BarcodeScannerProps {
  onClose: () => void;
  onSubmit: (pw: string) => void;
  error: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ 
  onClose, 
  onSubmit, 
  error,
  isLoading = false,
  isSuccess = false
}) => {
  const [pw, setPw] = useState('');
  const [isPrinting, setIsPrinting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsPrinting(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.length === 4) onSubmit(pw);
  };

  const PAPER_COLOR = '#fdfbf7'; 

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      
      <div className={`
        relative w-full max-w-[320px] shadow-[0_20px_60px_rgba(0,0,0,0.4)]
        transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top
        ${isPrinting ? 'scale-y-0 opacity-0 translate-y-[-100px]' : 'scale-y-100 opacity-100 translate-y-0'}
      `}>
        
        {/* 상단 찢어진 효과 */}
        <div className="w-full h-3 relative z-10"
             style={{ 
               backgroundColor: 'transparent',
               backgroundImage: `radial-gradient(circle, transparent 50%, ${PAPER_COLOR} 50%)`,
               backgroundSize: '10px 10px',
               backgroundPosition: '-5px -5px',
               backgroundRepeat: 'repeat-x'
             }}>
        </div>

        {/* === 영수증 본문 === */}
        <div className="relative bg-[#fdfbf7] px-6 pb-6 pt-8 flex flex-col items-center text-[#1a1a1a] font-mono min-h-[400px]">
          
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] mix-blend-multiply"></div>

          <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors z-20 p-2">
            <X size={18} />
          </button>

          {/* 1. 헤더 */}
          <div className="flex flex-col items-center mb-6">
             <Printer size={28} strokeWidth={1.5} className="mb-3 text-[#1a1a1a]" />
             <h2 className="text-2xl font-black tracking-widest uppercase">RESILIENCE</h2>
             <span className="text-xs tracking-[0.3em] font-bold mt-1 text-gray-500">RECEIPT</span>
             <p className="text-[9px] text-gray-400 mt-2 tracking-widest uppercase">
               {new Date().toLocaleDateString()} • NO. 2026-01
             </p>
          </div>

          <div className="w-full border-t border-dashed border-gray-300 mb-6"></div>

          {/* 2. 입력 폼 (심플한 라인 스타일) */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center z-10">
            <label className="text-xs font-bold tracking-[0.2em] mb-4 uppercase text-gray-800">
              Enter Access Code
            </label>
            
            {/* 입력창 + 밑줄 */}
            <div className="relative w-full mb-6 flex flex-col items-center">
               <input 
                  type="text" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  maxLength={4}
                  placeholder="" 
                  className="w-32 bg-transparent text-center font-mono text-3xl tracking-[0.5em] h-10 outline-none text-[#1a1a1a] placeholder:text-gray-300 z-10 focus:placeholder:text-transparent"
                  autoFocus
                />
                
                {/* 커서 (입력값이 없을 때 깜빡임) */}
                {!pw && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-6 bg-black animate-pulse pointer-events-none"></div>
                )}

                {/* 빨간 밑줄 (포인트) */}
                <div className="w-24 h-[2px] bg-red-500 mt-2"></div>
            </div>

            {/* 도장 애니메이션 (겹쳐서 뜨도록 absolute 처리) */}
            <div className="relative w-full h-0 flex items-center justify-center">
                {error && !isLoading && (
                  <div className="absolute top-[-40px] rotate-[-12deg] z-50 pointer-events-none">
                    <div className="animate-stamp border-[3px] border-red-600 text-red-600 px-3 py-1 font-black text-xl opacity-90 mix-blend-multiply tracking-widest bg-[#fdfbf7]/80 backdrop-blur-[1px]">
                      INVALID
                    </div>
                  </div>
                )}
                {isSuccess && !isLoading && (
                  <div className="absolute top-[-40px] rotate-[8deg] z-50 pointer-events-none">
                    <div className="animate-stamp border-[3px] border-green-700 text-green-700 px-4 py-1 font-black text-xl opacity-90 mix-blend-multiply tracking-widest bg-[#fdfbf7]/80 backdrop-blur-[1px]">
                      ACCEPTED
                    </div>
                  </div>
                )}
            </div>

            {/* 품목 리스트 (간격 줄임) */}
            <div className="w-full text-[10px] font-mono text-gray-500 space-y-1 mb-6 px-4">
                <div className="flex justify-between">
                    <span>1 x HAPPY NEW YEAR</span>
                    <span>$20.25</span>
                </div>
                <div className="flex justify-between">
                    <span>1 x MESSAGE FOR YOU</span>
                    <span>$20.26</span>
                </div>
            </div>

            {/* 확인 버튼 (검은색) */}
            <button 
              type="submit"
              disabled={isLoading || isSuccess}
              className={`
                w-full py-3 font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 shadow-md
                ${isSuccess 
                  ? 'bg-green-700 text-white cursor-default' 
                  : 'bg-[#1a1a1a] text-white hover:bg-red-600 active:scale-95'
                }
              `}
            >
              {isLoading ? (
                <span className="animate-pulse">Scanning...</span>
              ) : isSuccess ? (
                <>Confirmed</>
              ) : (
                <>Confirm Purchase</>
              )}
            </button>
          </form>

          <div className="w-full border-t border-dashed border-gray-300 mt-6 mb-4"></div>

          {/* 바코드 */}
          <div className="w-full text-center opacity-80">
            <p className="font-barcode text-5xl transform scale-y-125 tracking-wider">20260101</p>
            <p className="text-[8px] mt-2 tracking-[0.3em] uppercase">Thanks for visiting</p>
          </div>

        </div>

        {/* 하단 찢어진 효과 */}
        <div className="w-full h-3 relative z-10 -mt-[1px]"
             style={{ 
               backgroundColor: 'transparent',
               backgroundImage: `radial-gradient(circle, transparent 50%, ${PAPER_COLOR} 50%)`,
               backgroundSize: '10px 10px',
               backgroundPosition: '-5px 5px',
               backgroundRepeat: 'repeat-x',
               transform: 'rotate(180deg)'
             }}>
        </div>

      </div>
    </div>
  );
};