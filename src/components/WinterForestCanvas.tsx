import React, { useRef, useEffect } from 'react';
import { Snowflake } from '../types';

// 나무 타입 정의
interface Tree {
  x: number;
  y: number;
  height: number;
  color: string;
  layer: 'back' | 'front';
  // 눈 입자 위치를 고정하기 위한 시드값
  seed: number; 
}

// 별 타입 정의
interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

// 🏠 연기 입자 타입
interface SmokeParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export const WinterForestCanvas: React.FC = () => {
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

    let frame = 0;

    // 산장 크기
    const cabinWidth = 140;
    // 산장 위치 (초기값 - 오른쪽 75% 지점)
    let cabinX = width * 0.75 - cabinWidth / 2; 
    let cabinY = height - 130;

    // --- 1. 에셋 생성 ---

    // 🌲 나무 심기
    const trees: Tree[] = [];
    
    // 뒷배경 나무
    for (let i = -50; i < width + 50; i += 20 + Math.random() * 40) {
      trees.push({
        x: i,
        y: height - 100 - Math.random() * 30,
        height: 60 + Math.random() * 40,
        color: '#152238',
        layer: 'back',
        seed: Math.random() * 100
      });
    }

    // 앞배경 나무 (산장 위치 고려)
    for (let i = -50; i < width + 50; i += 60 + Math.random() * 80) {
      trees.push({
        x: i + Math.random() * 20,
        y: height - 80, 
        height: 120 + Math.random() * 60,
        color: '#1a2e35',
        layer: 'front',
        seed: Math.random() * 100
      });
    }

    // ✨ 별 생성
    const stars: Star[] = [];
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.6),
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005
      });
    }

    // ❄️ 눈송이 생성
    const snowflakes: Snowflake[] = [];
    for (let i = 0; i < 150; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        drift: Math.random() * 0.5 - 0.25
      });
    }

    // ☁️ 굴뚝 연기 생성
    const smokes: SmokeParticle[] = [];
    for (let i = 0; i < 5; i++) {
        smokes.push({
            x: cabinX + cabinWidth - 30,
            y: cabinY - 50 + i * 10,
            size: 4 + Math.random() * 4,
            speed: 0.3 + Math.random() * 0.2,
            opacity: 0.6
        });
    }

    // --- 2. 그리기 함수들 ---

    // 의사 난수 생성기 (좌표 기반 고정된 랜덤값)
    const pseudoRandom = (input: number) => {
        return Math.abs(Math.sin(input * 12.9898) * 43758.5453) % 1;
    };

    const drawPixelTree = (t: Tree) => {
      // 1. 나무 몸통
      ctx.fillStyle = t.color;
      const trunkW = t.height * 0.15;
      const trunkH = t.height * 0.2;
      ctx.fillRect(t.x - trunkW/2, t.y, trunkW, trunkH);

      // 2. 나뭇잎 (3단)
      const layers = 3;
      const layerH = (t.height - trunkH) / layers;
      
      for(let i=0; i<layers; i++) {
        const baseW = t.height * 0.7 * (1 - i*0.25);
        const yPos = t.y - (i * layerH * 0.8);
        
        // 잎 그리기
        ctx.fillStyle = t.color;
        ctx.beginPath();
        ctx.moveTo(t.x - baseW/2, yPos);
        ctx.lineTo(t.x, yPos - layerH * 1.5);
        ctx.lineTo(t.x + baseW/2, yPos);
        ctx.fill();

        // ❄️ [NEW] 나무 위 눈 입자 (Snow Particles)
        // 각 레이어마다 고정된 위치에 흰색 점을 찍음
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        const numSnow = 4 + i * 2; // 위쪽일수록 적게
        
        for(let k=0; k<numSnow; k++) {
            // 시드값을 이용해 매 프레임 같은 위치에 눈을 그림 (반짝임 방지)
            const r1 = pseudoRandom(t.seed + i * 10 + k);
            const r2 = pseudoRandom(t.seed + i * 20 + k + 5);
            
            // 삼각형 내부/경계 부근에 위치하도록
            const snX = t.x + (r1 - 0.5) * baseW * 0.8;
            const snY = yPos - r2 * layerH * 0.8;
            
            // 너무 튀지 않게 작은 입자로
            ctx.fillRect(snX, snY, 2, 2);
        }
      }
    };

    const drawCabin = () => {
        const h = 70; 
        const roofH = 50; 

        // 통나무 벽
        ctx.fillStyle = '#4A3728';
        ctx.fillRect(cabinX, cabinY - h, cabinWidth, h);
        
        ctx.fillStyle = '#3E2B1F';
        for(let i=1; i<5; i++) {
            ctx.fillRect(cabinX, cabinY - h + (i * 14), cabinWidth, 2);
        }

        // 지붕 (눈)
        ctx.beginPath();
        ctx.moveTo(cabinX - 10, cabinY - h);
        ctx.lineTo(cabinX + cabinWidth / 2, cabinY - h - roofH);
        ctx.lineTo(cabinX + cabinWidth + 10, cabinY - h);
        ctx.closePath();
        ctx.fillStyle = '#F0F8FF'; 
        ctx.fill();
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#D4E2E8';
        ctx.stroke();

        // 굴뚝
        const chimneyW = 20;
        const chimneyH = 30;
        const chimneyX = cabinX + cabinWidth - 40;
        const chimneyY = cabinY - h - roofH + 20;
        
        ctx.fillStyle = '#5D4037';
        ctx.fillRect(chimneyX, chimneyY, chimneyW, chimneyH);
        ctx.fillStyle = '#FFF';
        ctx.fillRect(chimneyX - 2, chimneyY, chimneyW + 4, 6);

        // 문
        const doorW = 30;
        const doorH = 45;
        const doorX = cabinX + cabinWidth / 2 - doorW / 2;
        const doorY = cabinY - doorH;
        
        ctx.fillStyle = '#2E1E15'; 
        ctx.fillRect(doorX, doorY, doorW, doorH);
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(doorX + doorW - 8, doorY + doorH / 2, 4, 4);

        // 창문 (불빛)
        const winSize = 24;
        const winY = cabinY - h + 20;
        const flicker = 0.8 + Math.sin(frame * 0.1) * 0.1;
        ctx.fillStyle = `rgba(255, 215, 0, ${flicker})`; 

        ctx.fillRect(cabinX + 20, winY, winSize, winSize);
        ctx.fillRect(cabinX + cabinWidth - 20 - winSize, winY, winSize, winSize);

        ctx.strokeStyle = '#2E1E15';
        ctx.lineWidth = 2;
        ctx.strokeRect(cabinX + 20, winY, winSize, winSize);
        ctx.strokeRect(cabinX + cabinWidth - 20 - winSize, winY, winSize, winSize);
        
        ctx.beginPath();
        ctx.moveTo(cabinX + 20 + winSize/2, winY);
        ctx.lineTo(cabinX + 20 + winSize/2, winY + winSize);
        ctx.moveTo(cabinX + 20, winY + winSize/2);
        ctx.lineTo(cabinX + 20 + winSize, winY + winSize/2);
        ctx.moveTo(cabinX + cabinWidth - 20 - winSize/2, winY);
        ctx.lineTo(cabinX + cabinWidth - 20 - winSize/2, winY + winSize);
        ctx.moveTo(cabinX + cabinWidth - 20 - winSize, winY + winSize/2);
        ctx.lineTo(cabinX + cabinWidth - 20, winY + winSize/2);
        ctx.stroke();
    };

    const drawMoon = () => {
       const moonX = width * 0.15; // 달은 왼쪽으로 이동 (산장과 균형 맞춤)
       const moonY = height * 0.15;
       const size = 50;

       const gradient = ctx.createRadialGradient(moonX, moonY, size * 0.8, moonX, moonY, size * 3);
       gradient.addColorStop(0, 'rgba(255, 255, 220, 0.3)');
       gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
       ctx.fillStyle = gradient;
       ctx.beginPath();
       ctx.arc(moonX, moonY, size * 3, 0, Math.PI * 2);
       ctx.fill();

       ctx.fillStyle = '#FEFCD7';
       ctx.beginPath();
       ctx.arc(moonX, moonY, size, 0, Math.PI * 2);
       ctx.fill();
    };

    // --- 3. 애니메이션 루프 ---

    const animate = () => {
      frame++;
      
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#050510'); 
      gradient.addColorStop(0.5, '#0e1525');
      gradient.addColorStop(1, '#1c2331');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 별
      stars.forEach(star => {
        star.opacity += star.twinkleSpeed;
        if(star.opacity > 1 || star.opacity < 0.2) star.twinkleSpeed = -star.twinkleSpeed;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.opacity)})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      drawMoon();

      // 지평선
      ctx.fillStyle = '#101a26';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for(let x=0; x<=width; x+=50) {
         ctx.lineTo(x, height - 120 - Math.sin(x * 0.01) * 20);
      }
      ctx.lineTo(width, height);
      ctx.fill();

      // 뒷배경 나무
      trees.filter(t => t.layer === 'back').forEach(drawPixelTree);

      // 앞배경 언덕 (눈)
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for(let x=0; x<=width; x+=50) {
         ctx.lineTo(x, height - 80 - Math.sin(x * 0.01 + 2) * 15);
      }
      ctx.lineTo(width, height);
      ctx.fill();

      // 🏠 산장 그리기 (산장은 고정된 위치에 그림)
      // 산장 주변에 앞 나무가 겹치지 않도록 처리
      drawCabin();

      // ☁️ 굴뚝 연기
      const chimneyX = cabinX + cabinWidth - 30;
      const chimneyY = cabinY - 50 - 20; 
      
      smokes.forEach((s, i) => {
          s.y -= s.speed;
          s.x += Math.sin(frame * 0.05 + i) * 0.5;
          s.size += 0.05;
          s.opacity -= 0.005;

          if (s.opacity <= 0) {
              s.y = chimneyY;
              s.x = chimneyX + 5;
              s.opacity = 0.6;
              s.size = 4 + Math.random() * 4;
          }

          ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
          ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
      });

      // 앞배경 나무 (산장과 겹치지 않는 것만 그리기)
      trees.filter(t => t.layer === 'front').forEach(t => {
          // 산장 영역과 겹치는지 확인
          if (!(t.x > cabinX - 50 && t.x < cabinX + cabinWidth + 50)) {
              drawPixelTree(t);
          }
      });

      // 눈 내림
      ctx.fillStyle = '#FFFFFF';
      snowflakes.forEach(flake => {
        flake.y += flake.speed;
        flake.x += flake.drift + Math.sin(frame * 0.01 + flake.y * 0.01) * 0.5;

        if (flake.y > height) {
          flake.y = -10;
          flake.x = Math.random() * width;
        }
        if (flake.x < -10) flake.x = width + 10;
        if (flake.x > width + 10) flake.x = -10;

        ctx.globalAlpha = 0.7;
        ctx.fillRect(Math.floor(flake.x), Math.floor(flake.y), flake.size, flake.size);
      });
      ctx.globalAlpha = 1;

      // 비네팅
      const vignette = ctx.createRadialGradient(width/2, height/2, width/3, width/2, height/2, width);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0,0,width,height);

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // 화면 크기 변경 시 산장 위치 재조정 (오른쪽 75% 지점 유지)
      cabinX = width * 0.75 - cabinWidth / 2;
      cabinY = height - 130;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />;
};