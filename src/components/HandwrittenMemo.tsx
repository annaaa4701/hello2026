import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface HandwrittenMemoProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onReply?: (replyText: string) => void;
  hasReplied?: boolean;
  reply?: string;
  fromName?: string;
  toName?: string;
}

const HandwrittenMemo: React.FC<HandwrittenMemoProps> = ({ 
  isOpen, 
  onClose, 
  message, 
  onReply,
  hasReplied = false,
  reply = '',
  fromName = '',
  toName = ''
}) => {
  const [replyText, setReplyText] = useState(reply);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const letterContainerRef = useRef<HTMLDivElement>(null);
  const printLetterRef = useRef<HTMLDivElement>(null); // 원본 편지 캡처용
  const printReplyRef = useRef<HTMLDivElement>(null); // 답장 캡처용

  // 엽서 이미지로 저장하는 함수
  const handleDownload = async (isReply: boolean = false) => {
    const targetRef = isReply ? printReplyRef : printLetterRef;
    if (!targetRef.current) return;

    try {
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: '#FDFBF7',
        scale: 2,
        logging: false,
        useCORS: true,
      });

      // 파일명 생성
      let filename = 'hello2026-letter';
      if (fromName && toName) {
        if (isReply) {
          // 답장: toName이 fromName에게
          filename = `${toName}가_${fromName}에게`;
        } else {
          // 원본: fromName이 toName에게
          filename = `${fromName}가_${toName}에게`;
        }
      }
      filename += `-${Date.now()}.png`;

      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('엽서 저장 실패:', error);
      alert('엽서 저장에 실패했어요 😢');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      {/* 메인 컨테이너 - 영수증 스타일 */}
      <div className="relative w-full max-w-md bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* 상단 헤더 - 영수증 스타일 */}
        <div className="flex justify-between items-center p-3 border-b border-dashed border-gray-300 bg-white">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            aria-label="닫기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-xs font-mono text-gray-600 tracking-wider uppercase">
            Message Receipt
          </div>

          <div className="w-8" />
        </div>

        {/* 영수증 정보 */}
        <div className="px-6 py-3 border-b border-dashed border-gray-300 bg-gray-50 font-mono text-xs">
          <div className="flex justify-between mb-1">
            <span className="text-gray-500">DATE:</span>
            <span className="text-gray-700">{new Date().toLocaleDateString('ko-KR')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">FROM:</span>
            <span className="text-gray-700">{fromName || 'Unknown'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">TO:</span>
            <span className="text-gray-700">{toName || 'Unknown'}</span>
          </div>
        </div>

        {/* --- 편지 내용 영역 (스크롤) --- */}
        <div 
          ref={letterContainerRef}
          className="flex-1 overflow-y-auto p-6"
        >
          <div className="space-y-4">
            {/* 받는 사람 정보 */}
            <div className="pb-3 border-b border-gray-200">
              <p className="text-sm text-gray-600 font-serif">To. {toName}</p>
            </div>
            
            {/* 본문 텍스트 - 스크롤로 전체 보기 */}
            <p className="whitespace-pre-wrap font-serif text-gray-800 leading-loose text-base text-justify break-keep">
              {message}
            </p>
            
            {/* 보낸 사람 정보 */}
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600 font-serif text-right">From. {fromName}</p>
            </div>
          </div>
        </div>

        {/* 답장 섹션 (있을 경우) */}
        {onReply && (
          <div className="border-t-2 border-dashed border-gray-300">
            {!showReplyInput && !hasReplied && (
              <div className="p-4">
                <button
                  onClick={() => setShowReplyInput(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors font-serif"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  답장하기
                </button>
              </div>
            )}

            {/* 답장 작성/수정 폼 */}
            {showReplyInput && (
              <div className="p-6 bg-gray-50">
                <div className="mb-4 pb-3 border-b border-gray-200">
                  <p className="text-xs text-gray-500 font-mono mb-1">REPLY TO: {fromName}</p>
                  <p className="text-xs text-gray-500 font-mono">FROM: {toName}</p>
                </div>
                
                <div className="space-y-3">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="답장을 작성해주세요..."
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none font-serif text-gray-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowReplyInput(false)}
                      className="flex-1 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-serif text-sm hover:bg-gray-300 transition-colors"
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
                      className="flex-1 py-2.5 bg-gray-800 text-white rounded-lg font-serif text-sm hover:bg-black transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      전송
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 이미 답장한 경우 */}
            {hasReplied && !showReplyInput && (
              <div className="p-6 bg-gray-50">
                <div className="mb-4 pb-3 border-b border-gray-200">
                  <p className="text-xs text-gray-500 font-mono mb-1">REPLY TO: {fromName}</p>
                  <p className="text-xs text-gray-500 font-mono">FROM: {toName}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="whitespace-pre-wrap font-serif text-gray-700 leading-relaxed text-sm">
                      {reply}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setReplyText(reply);
                        setShowReplyInput(true);
                      }}
                      className="flex-1 py-2.5 bg-gray-100 text-gray-800 rounded-lg font-serif text-sm hover:bg-gray-200 transition-colors"
                    >
                      답장 수정하기
                    </button>
                    <button
                      onClick={() => handleDownload(true)}
                      className="flex-1 py-2.5 bg-gray-800 text-white rounded-lg font-serif text-sm hover:bg-black transition-colors flex items-center justify-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      답장 저장
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 하단 저장 버튼 */}
        <div className="p-4 border-t border-dashed border-gray-300 bg-white">
          <button
            onClick={() => handleDownload(false)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-serif"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            편지 저장하기
          </button>
        </div>
      </div>

      {/* --- [숨겨진 요소] 캡처용 원본 편지 템플릿 --- */}
      <div className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none">
        <div 
          ref={printLetterRef}
          className="w-[800px] min-h-[600px] bg-[#FDFBF7] p-16 flex flex-col relative"
          style={{ fontFamily: 'serif' }}
        >
          <div className="absolute inset-4 border-2 border-gray-800 opacity-10 pointer-events-none" />
          
          <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-6">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tighter">HELLO 2026</h1>
            <div className="text-right">
              <p className="text-sm text-gray-500 uppercase tracking-widest">Time Capsule Message</p>
              <p className="text-xs text-gray-400 mt-1">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex-1">
            {toName && (
              <div className="mb-8 pb-4 border-b border-gray-300">
                <p className="text-base text-gray-600">To. {toName}</p>
              </div>
            )}
            
            <p className="whitespace-pre-wrap text-xl leading-relaxed text-gray-800">{message}</p>
          </div>

          <div className="mt-16 flex justify-end">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-600">From. {fromName || 'Past Me'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- [숨겨진 요소] 캡처용 답장 템플릿 --- */}
      <div className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none">
        <div 
          ref={printReplyRef}
          className="w-[800px] min-h-[600px] bg-[#FDFBF7] p-16 flex flex-col relative"
          style={{ fontFamily: 'serif' }}
        >
          <div className="absolute inset-4 border-2 border-gray-800 opacity-10 pointer-events-none" />
          
          <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-6">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tighter">HELLO 2026</h1>
            <div className="text-right">
              <p className="text-sm text-gray-500 uppercase tracking-widest">Reply Message</p>
              <p className="text-xs text-gray-400 mt-1">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex-1">
            {fromName && (
              <div className="mb-8 pb-4 border-b border-gray-300">
                <p className="text-base text-gray-600">To. {fromName}</p>
              </div>
            )}
            
            <p className="whitespace-pre-wrap text-xl leading-relaxed text-gray-800">{replyText || reply}</p>
          </div>

          <div className="mt-16 flex justify-end">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-600">From. {toName || 'You'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandwrittenMemo;
