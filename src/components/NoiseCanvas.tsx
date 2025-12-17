import React, { useRef, useEffect } from 'react';

export const NoiseCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);

    // 노이즈 생성 루프
    const loop = () => {
      const w = canvas.width;
      const h = canvas.height;
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        // 무작위 흑백 노이즈
        if (Math.random() < 0.1) {
          // Alpha값을 조절하여 거친 질감 표현 (0xaa000000 ~ 0xffffffff)
          // Little Endian: AABBGGRR
          buffer32[i] = 0x1affffff; // 흰색 점 (투명도 매우 낮음)
        } else {
            buffer32[i] = 0x00000000; // 투명
        }
      }

      ctx.putImageData(idata, 0, 0);
      requestAnimationFrame(loop);
    };

    const animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 mix-blend-overlay opacity-50" 
    />
  );
};