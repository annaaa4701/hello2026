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
  const [isPrinting, setIsPrinting] = useState(true); // 등장 애니메이션용

  useEffect(() => {
    // 영수증 출력되는 시간 (0.5초)
    const timer = setTimeout(() => setIsPrinting(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pw);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      
      {/* 🧾 영수증 컨테이너 */}
      <div className={`
        relative bg-[#eee] w-full max-w-sm shadow-2xl overflow-hidden
        transition-all duration-700 ease-out origin-top
        ${isPrinting ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'}
      `}>
        
        {/* 톱니 모양 상단 (CSS 마스크 활용 가능하나 간단히 가상요소로) */}
        <div className="absolute top-0 w-full h-4 bg-[radial-gradient(circle,transparent_50%,#eee_50%)] bg-[length:16px_16px] -mt-2 rotate-180"></div>

        <div className="p-6 pt-8 flex flex-col items-center text-black font-mono">
          
          {/* 헤더 */}
          <div className="w-full text-center border-b-2 border-dashed border-black/20 pb-4 mb-6">
            <h2 className="text-2xl font-black tracking-tighter uppercase flex items-center justify-center gap-2">
              <Printer size={20} /> Resilience
            </h2>
            <p className="text-[10px] text-gray-500 mt-1">
              {new Date().toLocaleDateString()} • TRUST THE UNCERTAINTY
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* 비밀번호(코드) 입력 */}
            <div className="relative group">
              <label className="text-[10px] font-bold block mb-1">ACCESS CODE</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-white border border-black p-2 font-barcode text-4xl h-14 outline-none focus:bg-yellow-100 transition-colors tracking-widest"
                  autoFocus
                />
                <ScanLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-pulse" size={20}/>
              </div>
            </div>

            {/* 에러 메시지 (도장 찍히듯) */}
            {error && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center animate-stamp rotate-[-15deg] z-50 pointer-events-none">
                <div className="inline-block border-4 border-red-600 text-red-600 px-4 py-1 font-black text-3xl opacity-80 mix-blend-multiply">
                  DECLINED
                </div>
              </div>
            )}

            {/* 버튼 */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-4 mt-6 font-bold text-lg hover:bg-[#333] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? 'SCANNING...' : 'CONFIRM PURCHASE'}
            </button>
          </form>

          {/* 바코드 푸터 */}
          <div className="mt-8 pt-4 border-t-2 border-dashed border-black/20 w-full text-center opacity-70">
            <p className="font-barcode text-6xl">2026 01 01</p>
            <p className="text-[10px] mt-1">THANKS FOR VISITING</p>
          </div>

          {/* 닫기 버튼 */}
          <button onClick={onClose} className="absolute top-2 right-2 p-2 hover:bg-black/10 rounded-full transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* 톱니 모양 하단 */}
        <div className="absolute bottom-0 w-full h-4 bg-[radial-gradient(circle,transparent_50%,#eee_50%)] bg-[length:16px_16px] -mb-2"></div>
      </div>
    </div>
  );
};