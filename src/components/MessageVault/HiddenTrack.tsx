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
  const [hasSentReply, setHasSentReply] = useState(!!messageData.reply);

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

  // 모달 열릴 때 body 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-0 md:p-4 overflow-y-auto">
      
      {/* 닫기 버튼 */}
      <button onClick={onClose} className="fixed top-4 right-4 text-white/50 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full md:bg-transparent">
        <X size={24} />
      </button>

      {/* 📋 엽서 컨테이너 */}
      <div className={`
        relative 
        w-full md:w-full md:max-w-6xl md:aspect-[2.2/1]
        min-h-screen md:min-h-0 /* 모바일: 전체 화면 높이, 데스크탑: 내용물 높이 */
        bg-[#fdfbf7] shadow-[0_30px_60px_rgba(0,0,0,0.5)] 
        transform transition-all duration-700 ease-out
        translate-y-0 opacity-100
        flex flex-col md:flex-row 
        rounded-none md:rounded-sm overflow-hidden
        my-auto /* 세로 중앙 정렬 */
      `}>
        
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] mix-blend-multiply z-10"></div>
        
        {/* 📎 불독 클립 (모바일에서는 상단 여백 확보를 위해 relative로 변경) */}
        <div className="relative md:absolute md:-top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center scale-75 md:scale-100 mt-4 md:mt-0">
            <div className="w-24 h-8 bg-[#222] rounded-t-sm rounded-b-md shadow-xl flex items-center justify-center relative border-t border-gray-600">
                <div className="w-20 h-[2px] bg-gray-600 mt-[-10px]"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
            </div>
            <div className="w-20 h-8 border-x-4 border-t-4 border-[#666] rounded-t-lg -mt-6 -z-10 shadow-sm"></div>
        </div>


        {/* =================================================
            [LEFT] 메시지 (친구의 편지) 
        ================================================== */}
        {/* 모바일에서는 min-h-fit으로 내용만큼 높이 차지 */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-[#f4f1ea] relative flex flex-col min-h-fit">
            
            <div className="flex justify-between items-start mb-6 border-b-2 border-[#1a1a1a]/10 pb-4 mt-8 md:mt-0">
                <div className="relative pl-2 pt-2">
                    <div className="w-16 h-20 bg-[#e0e0e0] border-4 border-white shadow-sm relative overflow-hidden flex items-center justify-center group">
                        <div className="absolute inset-0 border-[2px] border-dashed border-[#ccc] opacity-50 m-1"></div>
                        <span className="font-barcode text-4xl rotate-90 opacity-20">2026</span>
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 opacity-80"></div>
                        <span className="absolute bottom-1 text-[8px] font-mono tracking-widest">AIR MAIL</span>
                    </div>
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

                <div className="text-right mt-2">
                    <span className="font-mono text-xs text-gray-400 block mb-1 tracking-widest">To.</span>
                    <span className="font-hand text-2xl text-[#1a1a1a] border-b border-gray-300 pb-1 pr-2 inline-block min-w-[100px]">
                        {messageData.to || 'You'}
                    </span>
                </div>
            </div>

            {/* 모바일에서도 스크롤 가능하도록 max-h 설정 */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 relative z-10 mb-4 min-h-[200px] max-h-[40vh] md:max-h-none">
                <p className="font-hand text-xl md:text-2xl text-[#333] leading-loose whitespace-pre-line">
                    "{messageData.content}"
                </p>
            </div>

            <div className="mt-auto text-right border-t border-[#1a1a1a]/10 pt-4 pb-4 md:pb-0">
                <p className="font-mono text-[10px] text-gray-400 mb-1 tracking-widest">FROM</p>
                <p className="font-hand text-xl text-[#1a1a1a] tracking-wide">{messageData.from}</p>
            </div>
        </div>


        {/* ✂️ 절취선 */}
        <div className="relative flex-shrink-0 flex flex-col md:flex-row items-center justify-center bg-[#fdfbf7]">
             <div className="hidden md:block h-[90%] w-[1px] border-l-2 border-dashed border-gray-300 relative"></div>
             <div className="md:hidden w-[90%] h-[1px] border-t-2 border-dashed border-gray-300 relative my-4"></div>
        </div>


        {/* =================================================
            [RIGHT] 답장 (Feedback Card) 
        ================================================== */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-[#fff] relative flex flex-col min-h-fit pb-20 md:pb-10">
             
             {/* 🔥 수정됨: 리얼한 빈티지 스탬프 디자인 */}
             {hasSentReply && (
                <div className="absolute top-1/2 right-8 md:right-12 -translate-y-1/2 rotate-[-15deg] z-30 pointer-events-none">
                    <div 
                        className="animate-stamp inline-flex items-center justify-center border-[4px] border-red-800 text-red-800 px-6 py-2 font-black text-4xl md:text-5xl opacity-80 mix-blend-multiply tracking-widest rounded-sm"
                        style={{
                            fontFamily: 'impact, sans-serif',
                            // 거친 잉크 질감을 위한 마스크 (브라우저 호환성 확인 필요)
                            maskImage: 'url("https://www.transparenttextures.com/patterns/grunge-wall.png")',
                            WebkitMaskImage: 'url("https://www.transparenttextures.com/patterns/grunge-wall.png")',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                        }}
                    >
                        SENT
                    </div>
                </div>
             )}

             <div className="border-b-2 border-[#1a1a1a] pb-2 mb-4 flex justify-between items-end">
                <span className="font-bebas text-3xl text-[#1a1a1a] tracking-tight">FEEDBACK CARD</span>
                <PenTool size={18} className="text-gray-400 mb-1" />
             </div>

             {/* 📝 답장 입력 영역 (줄 노트) */}
             <div className="flex-1 relative min-h-[300px]">
                {/* 🔥 수정됨: 줄 간격 및 높이 미세 조정 (h-10 = 2.5rem) */}
                <div className="absolute inset-0 flex flex-col pt-[0.5rem]">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="w-full h-10 border-b border-blue-100"></div>
                    ))}
                </div>

                <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="답장을 적어주세요..."
                    disabled={hasSentReply || isSending}
                    // 🔥 수정됨: 줄 높이(leading)와 padding-top을 맞춰서 글씨가 줄 위에 오도록 조정
                    className={`relative w-full h-full bg-transparent font-hand text-2xl leading-[2.5rem] resize-none outline-none z-10 transition-colors pt-[0.1rem] pl-1
                        ${hasSentReply ? 'text-gray-400 cursor-default' : 'text-[#1a1a1a] placeholder:text-gray-300'}
                    `}
                    spellCheck={false}
                />
             </div>

             <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs font-mono text-gray-400 tracking-wider">
                         <Check size={14} className={hasSentReply ? "text-red-500" : "text-gray-300"} /> 
                         <span>SATISFACTION CONFIRMED</span>
                    </div>
                </div>

                {!hasSentReply ? (
                    <button
                        onClick={handleSend}
                        disabled={isSending || !replyContent.trim()}
                        className={`
                            group flex items-center gap-3 px-6 py-3 rounded-sm border-2 border-[#1a1a1a]
                            transition-all duration-200 shadow-[4px_4px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                            ${isSending ? 'bg-gray-100 cursor-wait' : 'bg-white hover:bg-[#1a1a1a] hover:text-white'}
                        `}
                    >
                        {isSending ? (
                            <span className="font-mono text-sm animate-pulse">SENDING...</span>
                        ) : (
                            <>
                                <span className="font-bebas text-xl tracking-wider">SEND REPLY</span>
                                <Send size={18} className="group-hover:translate-x-1 transition-transform"/>
                            </>
                        )}
                    </button>
                ) : (
                    <button
                        onClick={handleRevise}
                        className="group flex items-center gap-2 px-4 py-2 rounded-sm text-gray-400 hover:text-[#1a1a1a] transition-all"
                    >
                        <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500"/>
                        <span className="font-mono text-xs tracking-wider border-b border-transparent group-hover:border-[#1a1a1a]">REVISE</span>
                    </button>
                )}
             </div>
        </div>

      </div>
    </div>
  );
};