import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

interface HandwrittenMemoProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const HandwrittenMemo: React.FC<HandwrittenMemoProps> = ({ isOpen, onClose, message }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null); // 캡처할 엽서 영역
  
  // 메시지를 문단 단위로 나누기 (빈 줄 2개 기준)
  // 내용이 짧으면 그냥 전체를 하나로 씀
  const pages = message.split('\n\n').filter((p) => p.trim() !== '');

  // 스크롤 위치에 따라 현재 페이지 번호 업데이트
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.clientWidth;
      const newPage = Math.round(scrollLeft / width);
      setCurrentPage(newPage);
    }
  };

  // 엽서 이미지로 저장하는 함수
  const handleDownload = async () => {
    if (!printRef.current) return;

    try {
      // 캡처 시작 전 잠시 보이게 하거나, 보이지 않는 상태에서도 캡처 가능
      const canvas = await html2canvas(printRef.current, {
        backgroundColor: '#FDFBF7', // 따뜻한 종이 색감
        scale: 2, // 고해상도 (레티나 디스플레이 대응)
        logging: false,
        useCORS: true, // 이미지 등 외부 리소스 허용
      });

      // 다운로드 링크 생성
      const link = document.createElement('a');
      link.download = `hello2026-letter-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('엽서 저장 실패:', error);
      alert('엽서 저장에 실패했어요 😢');
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      {/* 메인 컨테이너 (CD 가사집 느낌) */}
      <div className="relative w-full max-w-md bg-[#FDFBF7] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* 상단 헤더: 닫기 버튼 & 저장 버튼 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white/50">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            aria-label="닫기"
          >
            {/* Close Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-sm font-bold text-gray-400 tracking-widest uppercase">
            Booklet
          </div>

          <button 
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-full hover:bg-black transition-colors shadow-sm"
          >
            {/* Download Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Save
          </button>
        </div>

        {/* --- 가로 슬라이더 영역 --- */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 w-full overflow-x-auto overflow-y-auto snap-x snap-mandatory scrollbar-hide flex"
          style={{ scrollBehavior: 'smooth' }}
        >
          {pages.length > 0 ? (
            pages.map((page, index) => (
              <div 
                key={index} 
                className="w-full flex-shrink-0 snap-center flex flex-col p-8"
              >
                <div className="flex-1 flex flex-col justify-center">
                  {/* 페이지 번호 장식 */}
                  <div className="text-xs text-gray-300 font-serif mb-4 text-center">
                    — Page {index + 1} —
                  </div>
                  
                  {/* 본문 텍스트 */}
                  <p className="whitespace-pre-wrap font-serif text-gray-800 leading-loose text-lg text-justify break-keep">
                    {page}
                  </p>
                </div>
              </div>
            ))
          ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400">
               내용이 없습니다.
             </div>
          )}
        </div>

        {/* 하단 페이지네이션 인디케이터 */}
        <div className="p-4 flex justify-center gap-2 bg-white/50">
          {pages.map((_, i) => (
            <div 
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentPage ? 'bg-gray-800 scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* --- [숨겨진 요소] 캡처용 엽서 템플릿 --- */}
      {/* 화면에는 안 보이지만(absolute -z-50) html2canvas가 이걸 찍습니다 */}
      <div className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none">
        <div 
          ref={printRef}
          className="w-[800px] min-h-[600px] bg-[#FDFBF7] p-16 flex flex-col relative"
          style={{ fontFamily: 'serif' }} // 폰트는 원하는대로 변경 가능
        >
          {/* 장식용 테두리 */}
          <div className="absolute inset-4 border-2 border-gray-800 opacity-10 pointer-events-none" />
          
          {/* 엽서 헤더 */}
          <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-6">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tighter">
              HELLO 2026
            </h1>
            <div className="text-right">
              <p className="text-sm text-gray-500 uppercase tracking-widest">Time Capsule Message</p>
              <p className="text-xs text-gray-400 mt-1">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* 엽서 내용 (전체 내용 한 번에 표시) */}
          <div className="flex-1">
            <p className="whitespace-pre-wrap text-xl leading-relaxed text-gray-800">
              {message}
            </p>
          </div>

          {/* 엽서 푸터 */}
          <div className="mt-16 flex justify-end items-center gap-3 opacity-60">
            <div className="w-12 h-12 border border-gray-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold transform -rotate-12 block">STAMP</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">From. Past Me</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HandwrittenMemo;