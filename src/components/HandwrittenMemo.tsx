import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

interface HandwrittenMemoProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onReply?: (replyText: string) => void;
  hasReplied?: boolean;
  reply?: string;
}

const HandwrittenMemo: React.FC<HandwrittenMemoProps> = ({ 
  isOpen, 
  onClose, 
  message, 
  onReply,
  hasReplied = false,
  reply = ''
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [replyText, setReplyText] = useState(reply);
  const [showReplyInput, setShowReplyInput] = useState(false);
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
          className="flex-1 w-full overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scrollbar-hide flex"
          style={{ scrollBehavior: 'smooth' }}
        >
          {pages.length > 0 ? (
            pages.map((page, index) => (
              <div 
                key={index} 
                className="w-full flex-shrink-0 snap-center flex flex-col p-8 overflow-y-auto"
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
                  
                  {/* 마지막 페이지에만 버튼 표시 */}
                  {index === pages.length - 1 && onReply && (
                    <div className="mt-8 space-y-3 border-t border-gray-200 pt-6">
                      {/* 편지 저장 버튼 */}
                      <button
                        onClick={handleDownload}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-serif"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        편지 저장하기
                      </button>
                      
                      {/* 답장하기 버튼 */}
                      {!hasReplied && !showReplyInput && (
                        <button
                          onClick={() => setShowReplyInput(true)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors font-serif"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                          답장하기
                        </button>
                      )}
                      
                      {/* 이미 답장한 경우 */}
                      {hasReplied && (
                        <div className="text-center py-2 text-gray-500 text-sm">
                          ✓ 답장을 보냈습니다
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400">
               내용이 없습니다.
             </div>
          )}
          
          {/* 답장 입력 페이지 (showReplyInput이 true일 때만) */}
          {onReply && showReplyInput && !hasReplied && (
            <div className="w-full flex-shrink-0 snap-center flex flex-col p-8 overflow-y-auto">
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-xs text-gray-300 font-serif mb-4 text-center">
                  — Reply —
                </div>
                
                <div className="space-y-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="답장을 작성해주세요..."
                    className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none font-serif text-gray-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowReplyInput(false)}
                      className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-serif hover:bg-gray-300 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => {
                        if (replyText.trim()) {
                          onReply(replyText);
                          setShowReplyInput(false);
                        }
                      }}
                      disabled={!replyText.trim()}
                      className="flex-1 py-3 bg-gray-800 text-white rounded-lg font-serif hover:bg-black transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      전송
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 이미 답장한 경우 보기 페이지 */}
          {onReply && hasReplied && (
            <div className="w-full flex-shrink-0 snap-center flex flex-col p-8 overflow-y-auto">
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-xs text-gray-300 font-serif mb-4 text-center">
                  — Your Reply —
                </div>
                
                <div className="space-y-4">
                  <p className="text-center text-gray-500 text-sm mb-4">보낸 답장</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="whitespace-pre-wrap font-serif text-gray-700 leading-relaxed">
                      {reply}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 하단 페이지네이션 인디케이터 */}
        <div className="p-4 flex justify-center items-center gap-4 bg-white/50">
          {/* 이전 버튼 */}
          {currentPage > 0 && (
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  const width = scrollContainerRef.current.clientWidth;
                  scrollContainerRef.current.scrollLeft = (currentPage - 1) * width;
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
              aria-label="이전 페이지"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {/* 페이지 dots */}
          <div className="flex gap-2">
            {pages.map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentPage ? 'bg-gray-800 scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
            {/* Reply 페이지 dot (답장 입력중이거나 이미 답장한 경우) */}
            {onReply && (showReplyInput || hasReplied) && (
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentPage === pages.length ? 'bg-gray-800 scale-125' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
          
          {/* 다음 버튼 */}
          {currentPage < (onReply && (showReplyInput || hasReplied) ? pages.length : pages.length - 1) && (
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  const width = scrollContainerRef.current.clientWidth;
                  scrollContainerRef.current.scrollLeft = (currentPage + 1) * width;
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
              aria-label="다음 페이지"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
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