// src/components/MessageVault/HiddenTrack.tsx
import React, { useState, useEffect } from 'react';
import { X, PenTool, Check, Send } from 'lucide-react';
import { MessageData } from '../../types';

interface HiddenTrackProps {
  messageData: MessageData;
  onClose: () => void;
  onReply: (content: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const HiddenTrack: React.FC<HiddenTrackProps> = ({
  messageData,
  onClose,
  onReply
}) => {
  const [replyContent, setReplyContent] = useState(messageData.reply || '');
  const [isSending, setIsSending] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasExistingReply] = useState(!!messageData.reply);

  const handleSend = () => {
    if (!replyContent.trim()) return;
    
    setIsSending(true);
    // 전송 시뮬레이션 (종이 접어서 넣는 느낌)
    setTimeout(() => {
      setIsSending(false);
      setIsCompleted(true);
      setTimeout(() => {
        onReply(replyContent);
      }, 1000);
    }, 1500);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      
      {/* 닫기 (우측 상단) */}
      <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50">
        <X size={32} />
      </button>

      {/* 📋 클립보드 / 엽서 컨테이너 */}
      <div className={`
        relative w-full max-w-2xl bg-[#fdfbf7] shadow-[0_20px_50px_rgba(0,0,0,0.5)] 
        transform transition-all duration-700 ease-out
        ${isCompleted ? 'translate-y-[100vh] rotate-12 opacity-0' : 'translate-y-0 rotate-1 opacity-100'}
        flex flex-col md:flex-row overflow-hidden rounded-sm
      `}>
        {/* 종이 질감 오버레이 */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] mix-blend-multiply"></div>
        
        {/* 상단 집게 장식 (가상) */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#333] rounded-md shadow-lg z-20 flex items-center justify-center">
            <div className="w-20 h-1 bg-[#555] rounded-full"></div>
        </div>


        {/* [LEFT] 친구의 편지 (보낸 사람) */}
        <div className="w-full md:w-1/2 p-8 pt-12 border-b md:border-b-0 md:border-r border-[#dcdcdc] bg-[#f4f1ea] relative">
            <div className="absolute top-4 left-4 opacity-30 font-barcode text-4xl">FROM</div>
            
            <div className="h-full flex flex-col">
                <div className="border-b-2 border-[#1a1a1a] pb-2 mb-4 flex justify-between items-end">
                    <span className="font-bebas text-2xl text-[#1a1a1a]">MESSAGE</span>
                    <span className="font-hand text-lg text-red-600">To. You</span>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    <p className="font-hand text-xl text-[#333] leading-loose whitespace-pre-line">
                        "{messageData.content}"
                    </p>
                </div>

                <div className="mt-6 text-right">
                    <p className="font-mono text-xs text-gray-500 mb-1">SENDER</p>
                    <p className="font-bebas text-xl text-[#1a1a1a] tracking-wide">{messageData.from}</p>
                </div>
            </div>
        </div>


        {/* [RIGHT] 답장 쓰기 (받는 사람) */}
        <div className="w-full md:w-1/2 p-8 pt-12 bg-[#fff] relative">
             <div className="absolute top-4 right-4 opacity-30 font-barcode text-4xl">REPLY</div>

             <div className="h-full flex flex-col">
                <div className="border-b-2 border-[#1a1a1a] pb-2 mb-4 flex justify-between items-end">
                    <span className="font-bebas text-2xl text-[#1a1a1a]">FEEDBACK CARD</span>
                    <PenTool size={16} className="text-gray-400" />
                </div>

                {/* 답장 입력 영역 (줄공책 스타일) */}
                <div className="flex-1 relative">
                    {/* 줄 배경 */}
                    <div className="absolute inset-0 flex flex-col pt-[6px]">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="w-full h-8 border-b border-blue-200"></div>
                        ))}
                    </div>

                    {/* 텍스트 입력 */}
                    <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder={hasExistingReply ? "수정할 내용을 적어주세요..." : "답장을 적어주세요..."}
                        className="relative w-full h-full bg-transparent font-hand text-xl text-[#333] leading-[2rem] resize-none outline-none placeholder:text-gray-300 z-10"
                        spellCheck={false}
                    />
                </div>

                {/* 하단 버튼 (스탬프/전송) */}
                <div className="mt-6 flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-gray-400">
                             <Check size={12} className="text-red-500" /> 
                             <span>SATISFACTION</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSend}
                        disabled={isSending || isCompleted || !replyContent.trim()}
                        className={`
                            group flex items-center gap-2 px-4 py-2 rounded-sm border-2 border-[#1a1a1a]
                            transition-all duration-200
                            ${isSending ? 'bg-gray-100 cursor-wait' : 'bg-white hover:bg-[#1a1a1a] hover:text-white'}
                        `}
                    >
                        {isSending ? (
                            <span className="font-mono text-sm animate-pulse">SENDING...</span>
                        ) : (
                            <>
                                <span className="font-bebas text-lg tracking-wider">SEND REPLY</span>
                                <Send size={16} className="group-hover:translate-x-1 transition-transform"/>
                            </>
                        )}
                    </button>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};