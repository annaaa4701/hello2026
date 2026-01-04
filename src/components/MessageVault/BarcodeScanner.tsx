import React, { useState, useEffect } from 'react';
import { X, ScanLine, Printer } from 'lucide-react';

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

  // 영수증이 출력되는 듯한 슬라이드 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => setIsPrinting(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.length === 4) onSubmit(pw);
  };

  // 종이 색상 (따뜻한 미색)
  const PAPER_COLOR = '#fdfbf7'; 

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      
      {/* 🧾 영수증 본체 */}
      <div className={`
        relative w-full max-w-[340px] shadow-[0_20px_60px_rgba(0,0,0,0.4)]
        transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top
        ${isPrinting ? 'scale-y-0 opacity-0 translate-y-[-100px]' : 'scale-y-100 opacity-100 translate-y-0'}
      `}>
        
        {/* === [상단] 찢어진 종이 효과 === */}
        <div className="w-full h-4 relative z-10"
             style={{ 
               backgroundColor: 'transparent',
               backgroundImage: `radial-gradient(circle, transparent 50%, ${PAPER_COLOR} 50%)`,
               backgroundSize: '12px 12px',
               backgroundPosition: '-6px -6px',
               backgroundRepeat: 'repeat-x'
             }}>
        </div>

        {/* === [중앙] 내용 영역 === */}
        <div className="relative bg-[#fdfbf7] px-8 pb-8 pt-4 flex flex-col items-center text-[#1a1a1a] font-mono min-h-[500px]">
          
          {/* 종이 질감 오버레이 */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] mix-blend-multiply"></div>

          {/* 닫기 버튼 */}
          <button onClick={onClose} className="absolute top-2 right-4 text-gray-400 hover:text-red-500 transition-colors z-20 p-2">
            <X size={20} />
          </button>

          {/* 1. 헤더: RESILIENCE 아이콘 */}
          <div className="flex flex-col items-center mt-4 mb-6">
             <Printer size={32} strokeWidth={1.5} className="mb-3 text-[#1a1a1a]" />
             <h2 className="text-3xl font-black tracking-widest uppercase">RESILIENCE</h2>
             <span className="text-sm tracking-[0.3em] font-bold mt-1 text-gray-600">RECEIPT</span>
             <p className="text-[10px] text-gray-400 mt-2 tracking-widest">
               {new Date().toLocaleDateString()} • NO. 2026-01
             </p>
          </div>

          {/* 구분선 (점선) */}
          <div className="w-full border-t-2 border-dashed border-gray-300 mb-8"></div>

          {/* 2. 코드 입력 폼 */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center z-10">
            <label className="text-sm font-bold tracking-[0.2em] mb-4 uppercase text-gray-800">
              Enter Access Code
            </label>
            
            <div className="relative w-full mb-8 group">
               {/* 입력창 */}
               <input 
                  type="text" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  placeholder="••••"
                  maxLength={4}
                  className="w-full bg-[#f4f1ea] border-2 border-gray-300 focus:border-black text-center font-barcode text-5xl h-16 outline-none tracking-[0.3em] text-[#1a1a1a] placeholder:text-gray-300 transition-all rounded-sm shadow-inner focus:shadow-md"
                  autoFocus
                />
               {/* 포커스 가이드 아이콘 */}
               <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 opacity-50 group-focus-within:opacity-100 transition-opacity">
                  <ScanLine size={20} />
               </div>
            </div>

            {/* 도장 애니메이션 영역 */}
            <div className="relative w-full h-12 flex items-center justify-center mb-6">
                {/* 에러 도장 */}
                {error && !isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center rotate-[-12deg] z-50 pointer-events-none">
                    <div className="animate-stamp border-[3px] border-red-600 text-red-600 px-4 py-1 font-black text-2xl opacity-90 mix-blend-multiply tracking-widest bg-[#fdfbf7]/80 backdrop-blur-[1px]">
                      INVALID
                    </div>
                  </div>
                )}
                {/* 성공 도장 */}
                {isSuccess && !isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center rotate-[8deg] z-50 pointer-events-none">
                    <div className="animate-stamp border-[3px] border-green-700 text-green-700 px-6 py-2 font-black text-2xl opacity-90 mix-blend-multiply tracking-widest bg-[#fdfbf7]/80 backdrop-blur-[1px]">
                      ACCEPTED
                    </div>
                  </div>
                )}
            </div>

            {/* 품목 리스트 */}
            <div className="w-full text-[11px] font-mono text-gray-600 space-y-2 mb-6 px-2">
                <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span>1 x HAPPY NEW YEAR</span>
                    <span>$20.25</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span>1 x MESSAGE FOR YOU</span>
                    <span>$20.26</span>
                </div>
                <div className="flex justify-between font-bold text-black pt-1 text-xs">
                    <span>TOTAL</span>
                    <span>$2026.00</span>
                </div>
            </div>

            {/* 확인 버튼 */}
            <button 
              type="submit"
              disabled={isLoading || isSuccess}
              className={`
                w-full py-4 font-bold text-sm tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 shadow-lg
                ${isSuccess 
                  ? 'bg-green-700 text-white cursor-default' 
                  : 'bg-[#1a1a1a] text-white hover:bg-red-600 hover:shadow-red-500/30 active:scale-95'
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

          {/* 구분선 (점선) */}
          <div className="w-full border-t-2 border-dashed border-gray-300 mt-8 mb-4"></div>

          {/* 바코드 푸터 */}
          <div className="w-full text-center opacity-80">
            <p className="font-barcode text-6xl transform scale-y-110 tracking-widest">20260101</p>
            <p className="text-[9px] mt-2 tracking-[0.4em] uppercase font-bold">Thanks for visiting</p>
          </div>

        </div>

        {/* === [하단] 찢어진 종이 효과 (뒤집힘) === */}
        <div className="w-full h-4 relative z-10 -mt-[1px]"
             style={{ 
               backgroundColor: 'transparent',
               backgroundImage: `radial-gradient(circle, transparent 50%, ${PAPER_COLOR} 50%)`,
               backgroundSize: '12px 12px',
               backgroundPosition: '-6px 6px', // 위치 조정하여 위쪽과 대칭되게
               backgroundRepeat: 'repeat-x',
               transform: 'rotate(180deg)'
             }}>
        </div>

      </div>
    </div>
  );
};