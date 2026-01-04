export const HandwrittenMemo = () => {
  return (
    <div className="relative w-72 h-auto bg-[#fcfbf9] p-6 shadow-[2px_2px_15px_rgba(0,0,0,0.15)] rotate-1 transform hover:rotate-0 transition-transform duration-500">
      
      {/* 📌 Tape at the top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#e0d8c3] opacity-80 rotate-[-2deg] shadow-sm"></div>

      {/* Title */}
      <div className="border-b-2 border-red-600 pb-2 mb-4 flex justify-between items-end">
        <h2 className="font-bebas text-3xl text-[#1a1a1a] leading-none">2026 PLAN</h2>
        <span className="font-barcode text-2xl opacity-50">0101</span>
      </div>

      {/* Handwritten Content */}
      <div className="font-hand text-[#333] space-y-4 text-lg leading-relaxed">
        <div className="flex items-center gap-2">
          <span className="text-red-600 font-bold">✔</span>
          <span className="line-through decoration-red-500/50">Start New Beginnings</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-400">□</span>
          <span>Trust the uncertainty.</span>
        </div>

        <p className="text-sm text-gray-600 mt-4 pt-4 border-t border-dashed border-gray-300">
          "The music will guide you.<br/>
          Thanks to all the dips and cracks."
        </p>
      </div>

      {/* Stamp */}
      <div className="absolute bottom-4 right-4 border-2 border-red-600 text-red-600 rounded-full w-16 h-16 flex items-center justify-center opacity-70 -rotate-12 mask-image-grunge">
        <span className="font-bebas text-sm text-center leading-none">CHECKED<br/>2026</span>
      </div>
    </div>
  );
};