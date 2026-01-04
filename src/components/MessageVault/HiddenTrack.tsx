// src/components/MessageVault/HiddenTrack.tsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
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
  const [hasSentReply, setHasSentReply] = useState(!!messageData.reply);

  // 데이터 동기화
  useEffect(() => {
    setReplyContent(messageData.reply || '');
    setHasSentReply(!!messageData.reply);
  }, [messageData.reply]);

  const handleSend = () => {
    if (!replyContent.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setHasSentReply(true); 
      onReply(replyContent); 
    }, 1500);
  };

  const handleRevise = () => {
    setHasSentReply(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      
      {/* 닫기 버튼 */}
      <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50">
        <X size={32} />
      </button>

      {/* 📋 엽서 컨테이너 */}
      <div className={`
        relative 
        w-[85vw] md:w-full md:max-w-6xl md:aspect-[2.2/1] /* 데스크탑: 와이드 엽서 비율 */
        min-h-[600px] md:min-h-0 /* 모바일 최소 높이 확보 */
        bg-[#fdfbf7] shadow-[0_30px_60px_rgba(0,0,0,0.5)] 
        transform transition-all duration-700 ease-out
        translate-y-0 opacity-100
        flex flex-col md:flex-row 
        rounded-sm overflow-hidden
      `}>
        
        {/* 전체 종이 질감 오버레이 */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] mix-blend-multiply z-10"></div>
        
        {/* 📎 불독 클립 (중앙 상단 고정) */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center scale-75 md:scale-100">
            <div className="w-24 h-8 bg-[#222] rounded-t-sm rounded-b-md shadow-xl flex items-center justify-center relative border-t border-gray-600">
                <div className="w-20 h-[2px] bg-gray-600 mt-[-10px]"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
            </div>
            <div className="w-20 h-8 border-x-4 border-t-4 border-[#666] rounded-t-lg -mt-6 -z-10 shadow-sm"></div>
        </div>


        {/* =================================================
            [LEFT] 메시지 (친구의 편지) 
        ================================================== */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-[#f4f1ea] relative flex flex-col">
            
            {/* 📮 우표 및 수신자 정보 */}
            <div className="flex justify-between items-start mb-6 border-b-2 border-[#1a1a1a]/10 pb-4">
                {/* 우표 + 소인 */}
                <div className="relative pl-2 pt-2">
                    <div className="w-16 h-20 bg-[#e0e0e0] border-4 border-white shadow-sm relative overflow-hidden flex items-center justify-center group">
                        <div className="absolute inset-0 border-[2px] border-dashed border-[#ccc] opacity-50 m-1"></div>
                        <span className="font-barcode text-4xl rotate-90 opacity-20">2026</span>
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 opacity-80"></div>
                        <span className="absolute bottom-1 text-[8px] font-mono tracking-widest">AIR MAIL</span>
                    </div>
                    {/* 소인 애니메이션 */}
                    <div className="absolute -top-2 -right-8 z-10 animate-stamp">
                        <div className="w-24 h-24 rounded-full border-2 border-red-800 opacity-70 flex items-center justify-center rotate-[-15deg] mix-blend-multiply">
                            <div className="absolute inset-0 border border-red-800 rounded-full scale-90"></div>
                            <div className="text-center leading-none">
                                <span className="block text-[8px] font-mono text-red-900 tracking-widest mb-1">RESILIENCE</span>
                                <span className="block text-xl font-bebas text-red-800">2026.01.01</span>
                                <span className="block text-[8px] font-mono text-red-900 mt-1">BUSAN</span>
                            </div>
                            <div className="absolute top-1/2 -right-6 w-12 h-4 border-y border-red-800 rotate-12 opacity-50"></div>
                            <div className="absolute top-1/2 -left-6 w-12 h-4 border-y border-red-800 -rotate-12 opacity-50"></div>
                        </div>
                    </div>
                </div>

                {/* ✅ 수정됨: To. 이름 (검은색) */}
                <div className="text-right mt-2">
                    <span className="font-mono text-xs text-gray-400 block mb-1 tracking-widest">To.</span>
                    <span className="font-hand text-2xl text-[#1a1a1a] border-b border-gray-300 pb-1 pr-2 inline-block min-w-[100px]">
                        {messageData.to || 'You'}
                    </span>
                </div>
            </div>

            {/* 📜 편지 본문 (스크롤 영역) */}
            {/* flex-1과 overflow-y-auto를 사용하여 긴 편지도 스크롤로 처리 */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 relative z-10 mb-4 min-h-[200px]">
                <p className="font-hand text-xl md:text-2xl text-[#333] leading-loose whitespace-pre-line">
                    "{messageData.content}"
                </p>
            </div>

            {/* ✅ 수정됨: 보낸 사람 (글꼴 통일) */}
            <div className="mt-auto text-right border-t border-[#1a1a1a]/10 pt-4">
                <p className="font-mono text-[10px] text-gray-400 mb-1 tracking-widest">FROM</p>
                <p className="font-hand text-xl text-[#1a1a1a] tracking-wide">{messageData.from}</p>
            </div>
        </div>


        {/* ✂️ [MIDDLE] 절취선 (Perforation) */}
        <div className="relative flex-shrink-0 flex flex-col md:flex-row items-center justify-center bg-[#fdfbf7]">
             {/* 데스크탑: 세로 점선 */}
             <div className="hidden md:block h-[90%] w-[1px] border-l-2 border-dashed border-gray-300 relative"></div>
             {/* 모바일: 가로 점선 */}
             <div className="md:hidden w-[90%] h-[1px] border-t-2 border-dashed border-gray-300 relative my-4"></div>
        </div>

        {/* =================================================
            [RIGHT] 답장 카드 (FEEDBACK CARD) 
        ================================================== */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-[#fdfbf7] flex flex-col relative">
            
            {/* SENT 스탬프 (전송 후에만 표시) */}
            {hasSentReply && (
                <div className="absolute top-6 right-6 z-20">
                    <div className="text-5xl font-black text-red-600 border-[6px] border-red-600 px-6 py-3 rotate-[-12deg] tracking-[0.5em] opacity-80 mix-blend-multiply" style={{ fontFamily: 'Impact, sans-serif' }}>
                        SENT
                    </div>
                </div>
            )}

            <div className="h-full flex flex-col">
                <div className="mb-4 pb-3 border-b border-gray-200">
                    <h3 className="font-bebas text-2xl tracking-wider text-[#1a1a1a]">
                        FEEDBACK CARD
                    </h3>
                </div>

                {/* ✅ 수정됨: 줄 간격 넓힘 + leading-[3rem] */}
                <div className="flex-1 relative">
                    {/* 줄 무늬 배경 */}
                    <div className="absolute inset-0 flex flex-col space-y-2">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex-1 border-b border-gray-200"></div>
                        ))}
                    </div>

                    {/* textarea */}
                    <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="답장을 작성하세요..."
                        disabled={hasSentReply || isSending}
                        className={`w-full h-full resize-none bg-transparent font-hand text-lg leading-[3rem] relative z-10 focus:outline-none custom-scrollbar
                            ${hasSentReply ? 'text-gray-400 cursor-default' : 'text-[#1a1a1a] placeholder:text-gray-300'}
                        `}
                    />
                </div>

                {/* ✅ 버튼 영역: SEND / REVISE */}
                <div className="mt-8 flex gap-3">
                    {!hasSentReply ? (
                        <button
                            onClick={handleSend}
                            disabled={!replyContent.trim() || isSending}
                            className="flex-1 px-6 py-3 font-bebas text-lg tracking-wider bg-[#1a1a1a] hover:bg-[#333] text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            {isSending ? 'SENDING...' : 'SEND'}
                        </button>
                    ) : (
                        <button
                            onClick={handleRevise}
                            className="flex-1 px-6 py-3 font-bebas text-lg tracking-wider bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors border border-gray-300 shadow-sm"
                        >
                            REVISE
                        </button>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};