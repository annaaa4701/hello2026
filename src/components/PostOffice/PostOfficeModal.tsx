import React, { useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { MessageData } from '../../types';
import { PostcardContainer, PostcardSide, LinedPaperArea } from '../assets/PostcardBase';
import { PixelStamp } from '../assets/PixelStamp';

interface PostOfficeModalProps {
  messageData: MessageData;
  onClose: () => void;
  onReply: (content: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  setCursor: (variant: 'default' | 'quill' | 'stamp' | 'pointer') => void;
}

export const PostOfficeModal: React.FC<PostOfficeModalProps> = ({
  messageData,
  onClose,
  onReply,
  setCursor
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isStamped, setIsStamped] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleStampClick = () => {
    if (!replyContent.trim()) {
      alert("답장 내용을 적어주세요!");
      return;
    }
    setIsStamped(true);
    // 우표 찍는 효과음 재생 (상위에서 처리하거나 여기서)
    setTimeout(() => {
      setIsSent(true);
      onReply(replyContent);
    }, 1500); // 1.5초 후 전송 완료 처리
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-hidden">
      
      {/* 닫기 버튼 */}
      <button 
        onClick={onClose}
        onMouseEnter={() => setCursor('pointer')}
        onMouseLeave={() => setCursor('default')}
        className="absolute top-6 right-6 text-white/50 hover:text-white z-50 transition-colors"
      >
        <X size={32} />
      </button>

      {/* 엽서 컨테이너 */}
      <div className={`relative w-full max-w-3xl transition-all duration-1000 ${isSent ? 'translate-y-[-150vh] rotate-12' : 'translate-y-0'}`}>
        <PostcardContainer isFlipped={isFlipped}>
          
          {/* [앞면] 받은 편지 */}
          <PostcardSide side="front" className="flex flex-col md:flex-row">
            
            {/* 좌측: 편지 내용 */}
            <div className="flex-1 p-8 md:p-12 flex flex-col bg-white/50 relative">
              <div className="mb-6 border-b-2 border-[#2C3E50]/10 pb-4">
                <span className="text-xs text-[#2C3E50]/60 font-bold tracking-widest">FROM. {messageData.from}</span>
                <h2 className="text-2xl md:text-3xl mt-2 font-bold text-[#2C3E50] korean-text">
                  To. {messageData.receiver}
                </h2>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <p className="text-base md:text-lg leading-loose text-[#2C3E50] korean-text whitespace-pre-line">
                  {messageData.content}
                </p>
              </div>

              {/* 하단 액션: 답장 쓰기 버튼 */}
              <div className="mt-8 pt-4 border-t-2 border-[#2C3E50]/10 flex justify-end">
                <button
                  onClick={() => {
                    setIsFlipped(true);
                    setTimeout(() => setCursor('quill'), 600); // 뒤집힌 후 깃펜 커서로
                  }}
                  onMouseEnter={() => setCursor('pointer')}
                  onMouseLeave={() => setCursor('default')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2C3E50] text-[#FFFDF0] font-bold text-xs hover:bg-[#34495e] transition-colors shadow-md hover:scale-105 transform"
                >
                  <RotateCcw size={14} className="animate-spin-slow" />
                  REPLY (뒤집기)
                </button>
              </div>
            </div>

            {/* 우측: 장식용 (우체국 소인 등) */}
            <div className="hidden md:flex w-24 bg-[#E8E6D1]/30 border-l border-dashed border-[#dcdcdc] flex-col items-center py-8">
              <div className="w-16 h-16 rounded-full border-4 border-[#2C3E50]/20 flex items-center justify-center rotate-12 mb-4">
                <span className="text-[10px] font-bold text-[#2C3E50]/40 text-center">DEC<br/>25</span>
              </div>
              <div className="flex-1 w-[1px] bg-[#2C3E50]/10 my-4"></div>
              <div className="w-4 h-4 bg-[#2C3E50]/20 rounded-full"></div>
            </div>
          </PostcardSide>

          {/* [뒷면] 답장 쓰기 */}
          <PostcardSide side="back" className="flex flex-col md:flex-row">
            
            {/* 좌측: 메시지 작성 영역 (깃펜 커서) */}
            <div 
              className="flex-1 border-r-2 border-dashed border-[#E0D4B4] relative bg-[#FFFDF0]/50"
              onMouseEnter={() => setCursor('quill')}
              onMouseLeave={() => setCursor('stamp')}
            >
              <LinedPaperArea 
                value={replyContent} 
                onChange={(e) => setReplyContent(e.target.value)}
              />
            </div>

            {/* 우측: 주소 및 우표 */}
            <div className="w-full md:w-1/3 flex flex-col items-center p-6 md:p-8 gap-8 bg-[#FFFDF0]">
              
              {/* 우표 영역 - "쾅!" 찍는 연출 */}
              <div 
                className="relative w-[70px] h-[80px] border-2 border-dashed border-[#E0D4B4] bg-black/5 flex items-center justify-center cursor-none group hover:bg-black/10 transition-colors"
                onClick={handleStampClick}
                onMouseEnter={() => !isStamped && setCursor('stamp')}
                onMouseLeave={() => setCursor('default')}
              >
                {isStamped ? (
                  <PixelStamp variant="heart" className="animate-stamp-thud shadow-xl" />
                ) : (
                  <div className="text-center opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
                    <span className="text-[10px] font-bold text-[#2C3E50]">STAMP<br/>HERE</span>
                    <div className="text-2xl mt-1">📮</div>
                  </div>
                )}
              </div>

              {/* 수신인 주소 (고정) */}
              <div className="mt-auto w-full text-left font-mono">
                <div className="border-b border-[#2C3E50] pb-1 mb-2">
                  <span className="text-[10px] text-[#888] block mb-1">TO.</span>
                  <span className="text-sm font-bold text-[#2C3E50]">{messageData.from} (DEV)</span>
                </div>
                <p className="text-[10px] text-[#888] leading-tight">
                  Github Page St.<br/>
                  Winter Forest, 1225
                </p>
              </div>

              {/* 다시 앞면으로 버튼 */}
              {!isStamped && (
                <button
                  onClick={() => setIsFlipped(false)}
                  onMouseEnter={() => setCursor('pointer')}
                  onMouseLeave={() => setCursor('default')}
                  className="text-[10px] text-gray-400 hover:text-gray-600 underline decoration-dashed"
                >
                  &lt; BACK TO READ
                </button>
              )}
            </div>
          </PostcardSide>

        </PostcardContainer>
      </div>

      {/* 전송 완료 메시지 */}
      {isSent && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="text-center animate-fade-in bg-black/80 p-8 border-2 border-[#E8E6D1]">
            <h3 className="text-[#FFD700] text-xl mb-4 font-['Press_Start_2P']">SENT!</h3>
            <p className="text-white text-sm">소중한 마음이 전송되었습니다.</p>
          </div>
        </div>
      )}
    </div>
  );
};