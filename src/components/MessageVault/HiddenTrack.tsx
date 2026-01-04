// src/components/MessageVault/HiddenTrack.tsx
import React, { useState, useEffect } from 'react';
import { X, PenTool, Check, Send, RotateCcw } from 'lucide-react';
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
  // 초기 상태: 이미 답장이 있으면 '전송 완료' 상태로 시작
  const [hasSentReply, setHasSentReply] = useState(!!messageData.reply);

  // messageData.reply가 변경되면 상태 업데이트
  useEffect(() => {
    setReplyContent(messageData.reply || '');
    setHasSentReply(!!messageData.reply);
  }, [messageData.reply]);

  const handleSend = () => {
    if (!replyContent.trim()) return;
    
    setIsSending(true);
    // 전송 시뮬레이션
    setTimeout(() => {
      setIsSending(false);
      setHasSentReply(true); // 도장 쾅! 입력창 잠금
      
      // 실제 데이터 저장
      onReply(replyContent); 
    }, 1500);
  };

  // ✏️ 수정 모드로 변경하는 함수
  const handleRevise = () => {
    setHasSentReply(false); // 도장 제거 & 입력창 잠금 해제
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
        translate-y-0 rotate-1 opacity-100
        flex flex-col md:flex-row overflow-visible rounded-sm mt-8
      `}>
        {/* 종이 질감 */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] mix-blend-multiply"></div>
        
        {/* 📎 리얼한 불독 클립 (Bulldog Clip) */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
            {/* 클립 몸통 (검은 금속) */}
            <div className="w-24 h-8 bg-[#1a1a1a] rounded-t-sm rounded-b-md shadow-lg flex items-center justify-center relative border-t border-gray-600">
                <div className="w-20 h-[2px] bg-gray-700 mt-[-10px]"></div>
                {/* 금속 광택 */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
            </div>
            {/* 클립 손잡이 (은색 와이어) */}
            <div className="w-20 h-8 border-x-4 border-t-4 border-[#888] rounded-t-lg -mt-6 -z-10 shadow-sm"></div>
        </div>


        {/* [LEFT] 친구의 편지 (보낸 사람) */}
        <div className="w-full md:w-1/2 p-8 pt-12 border-b md:border-b-0 md:border-r border-[#dcdcdc] bg-[#f4f1ea] relative">
            
            {/* 📮 우표 + 소인 애니메이션 영역 */}
            <div className="border-b-2 border-[#1a1a1a] pb-4 mb-4 flex justify-between items-end">
                <div className="relative pl-2">
                    {/* 1. 밑에 깔린 우표 (Postage Stamp) */}
                    <div className="w-16 h-20 bg-[#e0e0e0] border-4 border-white shadow-sm relative overflow-hidden flex items-center justify-center">
                        {/* 톱니 모양 테두리 (CSS) */}
                        <div className="absolute inset-0 border-[2px] border-dashed border-[#ccc] opacity-50 m-1"></div>
                        <span className="font-barcode text-4xl rotate-90 opacity-20">2026</span>
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 opacity-80"></div>
                        <span className="absolute bottom-1 text-[8px] font-mono tracking-widest">AIR MAIL</span>
                    </div>

                    {/* 2. 위에 찍히는 소인 (Postmark) - 애니메이션 */}
                    <div className="absolute -top-2 -right-12 z-10 animate-stamp">
                        <div className="w-24 h-24 rounded-full border-2 border-red-800 opacity-70 flex items-center justify-center rotate-[-15deg] mix-blend-multiply">
                            <div className="absolute inset-0 border border-red-800 rounded-full scale-90"></div>
                            <div className="text-center">
                                <span className="block text-[8px] font-mono text-red-900 tracking-widest">RESILIENCE</span>
                                <span className="block text-xl font-bebas text-red-800">2026.01.01</span>
                                <span className="block text-[8px] font-mono text-red-900">BUSAN</span>
                            </div>
                            {/* 물결 무늬 */}
                            <div className="absolute top-1/2 -right-8 w-12 h-4 border-y border-red-800 rotate-12 opacity-50"></div>
                            <div className="absolute top-1/2 -left-8 w-12 h-4 border-y border-red-800 -rotate-12 opacity-50"></div>
                        </div>
                    </div>
                </div>

                {/* 받는 사람 이름 (DB 연동) */}
                <div className="text-right">
                    <span className="font-mono text-xs text-gray-500 block mb-1">To.</span>
                    <span className="font-hand text-xl text-red-600 border-b border-red-200 pb-1">
                        {messageData.to || 'You'}
                    </span>
                </div>
            </div>

            <div className="h-[calc(100%-100px)] flex flex-col">
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 relative z-10">
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
             
             {/* ✅ SENT 도장 (전송 완료 시에만 표시) */}
             {hasSentReply && (
                <div className="absolute top-1/2 right-8 -translate-y-1/2 rotate-[-15deg] z-30 pointer-events-none">
                    <div className="animate-stamp inline-block border-[4px] border-red-700 text-red-700 px-6 py-2 font-black text-3xl opacity-80 mix-blend-multiply tracking-[0.2em] rounded-sm" style={{fontFamily: 'impact, sans-serif'}}>
                        SENT
                    </div>
                </div>
             )}

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
                        placeholder="답장을 적어주세요..."
                        disabled={hasSentReply || isSending} // 전송 완료시 비활성화 (수정하려면 버튼 눌러야 함)
                        className={`relative w-full h-full bg-transparent font-hand text-xl leading-[2rem] resize-none outline-none z-10 transition-colors
                            ${hasSentReply ? 'text-gray-400 cursor-default' : 'text-[#333] placeholder:text-gray-300'}
                        `}
                        spellCheck={false}
                    />
                </div>

                {/* 하단 버튼 영역 */}
                <div className="mt-6 flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-gray-400">
                             <Check size={12} className={hasSentReply ? "text-red-500" : "text-gray-300"} /> 
                             <span>SATISFACTION</span>
                        </div>
                    </div>

                    {/* ✅ 버튼 로직 변경: 전송 전(Send) vs 전송 후(Revise) */}
                    {!hasSentReply ? (
                        // [전송 버튼]
                        <button
                            onClick={handleSend}
                            disabled={isSending || !replyContent.trim()}
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
                    ) : (
                        // [수정 버튼] - 도장 찍힌 후 나타남
                        <button
                            onClick={handleRevise}
                            className="group flex items-center gap-2 px-4 py-2 rounded-sm border-2 border-gray-400 text-gray-500 hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-all bg-white/50"
                        >
                            <span className="font-bebas text-lg tracking-wider">REVISE / RESEND</span>
                            <RotateCcw size={16} className="group-hover:-rotate-180 transition-transform duration-500"/>
                        </button>
                    )}
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};