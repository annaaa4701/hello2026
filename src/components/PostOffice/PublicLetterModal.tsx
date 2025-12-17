import React from 'react';
import { MailOpen } from 'lucide-react';
import { PUBLIC_MESSAGE } from '../../constants/messages';
import { PostcardContainer, PostcardSide } from '../assets/PostcardBase';

interface PublicLetterModalProps {
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const PublicLetterModal: React.FC<PublicLetterModalProps> = ({
  onClose,
  onMouseEnter,
  onMouseLeave
}) => {
  // 배경 스크롤 방지
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto animate-fade-in">
        
        <PostcardContainer className="!aspect-[4/5] min-h-[600px] max-h-[90vh]">
          <PostcardSide side="front" className="flex flex-col items-center justify-center p-8 md:p-12 text-center bg-[#FFFDF0]">
            
            {/* 장식용 아이콘 */}
            <div className="mb-6 text-[#2C3E50]/80">
              <MailOpen size={48} strokeWidth={1} />
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-[#2C3E50] mb-6 font-['Gowun_Batang'] border-b-2 border-[#2C3E50]/10 pb-4 w-full">
              {PUBLIC_MESSAGE.title}
            </h2>

            <div className="flex-1 w-full mb-6">
              <p className="text-base md:text-lg leading-relaxed text-[#2C3E50] font-['Gowun_Batang'] whitespace-pre-line">
                {PUBLIC_MESSAGE.content}
              </p>
            </div>

            <div className="w-full flex flex-col items-center gap-4">
              <p className="text-sm font-bold text-[#2C3E50]/60 tracking-widest font-mono">
                FROM. {PUBLIC_MESSAGE.from}
              </p>
              
              <button
                onClick={onClose}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="mt-4 px-8 py-3 bg-[#2C3E50] text-[#FFFDF0] font-['Press_Start_2P'] text-xs hover:bg-[#34495e] transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-3 border-2 border-[#34495e]"
              >
                <span>Only for you</span>
                <span className="text-lg animate-pulse">➔</span>
              </button>
            </div>

          </PostcardSide>
          
          {/* 뒷면은 사용하지 않으므로 비워둠 */}
          <PostcardSide side="back" className="bg-[#FFFDF0]">
            <div></div>
          </PostcardSide>
        </PostcardContainer>
      </div>
    </div>
  );
};