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
  createdAt?: string; // 편지 작성 날짜
  updatedAt?: string; // 답장 날짜
}

const HandwrittenMemo: React.FC<HandwrittenMemoProps> = ({ 
  isOpen, 
  onClose, 
  message, 
  onReply,
  hasReplied = false,
  reply = '',
  fromName = '',
  toName = '',
  createdAt = '',
  updatedAt = ''
}) => {
  const [replyText, setReplyText] = useState(reply);
  const [showReplyPage, setShowReplyPage] = useState(false);
  const [isEditingReply, setIsEditingReply] = useState(false);
  const letterContainerRef = useRef<HTMLDivElement>(null);
  const replyContainerRef = useRef<HTMLDivElement>(null);
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

  // 원래 편지 페이지
  if (!showReplyPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
        <div className="relative w-full max-w-md bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* 상단 헤더 */}
          <div className="flex justify-end items-center p-3 border-b border-dashed border-gray-300 bg-white">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              aria-label="닫기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 편지 내용 영역 (스크롤) */}
          <div 
            ref={letterContainerRef}
            className="flex-1 overflow-y-auto p-6"
          >
            <div className="space-y-4">
              <div className="pb-3 border-b border-gray-200">
                <p className="text-sm text-gray-600 font-serif">To. {toName}</p>
              </div>
              
              <p className="whitespace-pre-wrap font-serif text-gray-800 leading-loose text-base text-justify break-keep">
                {message}
              </p>
              
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-400 font-serif text-right mb-1">
                  {createdAt ? new Date(createdAt).toLocaleDateString('ko-KR') : new Date().toLocaleDateString('ko-KR')}
                </p>
                <p className="text-sm text-gray-600 font-serif text-right">From. {fromName}</p>
              </div>
            </div>
          </div>

          {/* 하단 버튼 영역 */}
          <div className="p-4 border-t border-dashed border-gray-300 bg-white space-y-2">
            <button
              onClick={() => handleDownload(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-serif"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              편지 저장하기
            </button>

            {onReply && (
              <button
                onClick={() => setShowReplyPage(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors font-serif"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                {hasReplied ? '답장 보기' : '답장하기'}
              </button>
            )}
          </div>
        </div>

        {/* 캡처용 원본 편지 템플릿 */}
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
      </div>
    );
  }

  // 답장 페이지
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* 상단 헤더 */}
        <div className="flex justify-between items-center p-3 border-b border-dashed border-gray-300 bg-white">
          <button 
            onClick={() => setShowReplyPage(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            aria-label="뒤로"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            aria-label="닫기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 답장 내용 영역 (스크롤) */}
        <div 
          ref={replyContainerRef}
          className="flex-1 overflow-y-auto p-6"
        >
          <div className="space-y-4">
            <div className="pb-3 border-b border-gray-200">
              <p className="text-sm text-gray-600 font-serif">To. {fromName}</p>
            </div>
            
            {hasReplied && !isEditingReply ? (
              <p className="whitespace-pre-wrap font-serif text-gray-800 leading-loose text-base text-justify break-keep">
                {reply}
              </p>
            ) : (
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="답장을 작성해주세요..."
                className="w-full min-h-[300px] p-4 border border-gray-300 rounded-lg resize-none font-serif text-gray-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            )}
            
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-400 font-serif text-right mb-1">
                {updatedAt ? new Date(updatedAt).toLocaleDateString('ko-KR') : new Date().toLocaleDateString('ko-KR')}
              </p>
              <p className="text-sm text-gray-600 font-serif text-right">From. {toName}</p>
            </div>
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="p-4 border-t border-dashed border-gray-300 bg-white space-y-2">
          {hasReplied && !isEditingReply ? (
            <>
              <button
                onClick={() => handleDownload(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-serif"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                답장 저장하기
              </button>
              <button
                onClick={() => {
                  setReplyText(reply);
                  setIsEditingReply(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors font-serif"
              >
                답장 수정하기
              </button>
            </>
          ) : (
            <>
              {isEditingReply && (
                <button
                  onClick={() => {
                    setReplyText(reply);
                    setIsEditingReply(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-serif text-sm"
                >
                  취소
                </button>
              )}
              <button
                onClick={() => {
                  if (replyText.trim() && onReply) {
                    onReply(replyText);
                    setIsEditingReply(false);
                    setShowReplyPage(false);
                  }
                }}
                disabled={!replyText.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors font-serif disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                {isEditingReply ? '답장 수정 완료' : '답장 보내기'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* 캡처용 답장 템플릿 */}
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
