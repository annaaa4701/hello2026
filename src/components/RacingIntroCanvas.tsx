import React, { useRef, useEffect } from 'react';
import { House, Snowflake } from '../types';

export const RacingIntroCanvas: React.FC = () => {
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
    const groundHeight = 150;
    const groundY = height - groundHeight;
    
    let houses: House[] = [];
    for (let i = 0; i < 8; i++) {
      houses.push({
        x: i * 250,
        y: groundY - 120,
        type: Math.floor(Math.random() * 6),
        color: ['#C8E6F5', '#F5E6D3', '#D4E8D4', '#E8D4D4', '#F5D9C8', '#E6E6FA'][Math.floor(Math.random() * 6)]
      });
    }

    let snowflakes: Snowflake[] = [];
    for (let i = 0; i < 100; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.3,
        drift: Math.random() * 0.5 - 0.25
      });
    }

    const drawHouse = (x: number, y: number, type: number, color: string) => {
      const houseWidth = 80;
      const houseHeight = 100;
      
      ctx.fillStyle = color;
      ctx.fillRect(x, y, houseWidth, houseHeight);
      
      ctx.fillStyle = '#FFFFFF';
      if (type === 0 || type === 2) {
        ctx.beginPath();
        ctx.moveTo(x - 10, y);
        ctx.lineTo(x + houseWidth / 2, y - 40);
        ctx.lineTo(x + houseWidth + 10, y);
        ctx.closePath();
        ctx.fill();
      } else if (type === 1 || type === 4) {
        ctx.fillRect(x - 5, y - 15, houseWidth + 10, 15);
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(x + 15 + i * 25, y - 15, 8, 20);
        }
      } else {
        ctx.beginPath();
        ctx.ellipse(x + houseWidth / 2, y - 10, houseWidth / 2 + 10, 30, 0, 0, Math.PI, true);
        ctx.fill();
      }
      
      ctx.fillStyle = '#FFB84D';
      const windowSize = 12;
      
      if (type % 2 === 0) {
        ctx.fillRect(x + 15, y + 30, windowSize, windowSize);
        ctx.fillRect(x + 15, y + 55, windowSize, windowSize);
        ctx.fillRect(x + houseWidth - 27, y + 30, windowSize, windowSize);
        ctx.fillRect(x + houseWidth - 27, y + 55, windowSize, windowSize);
      } else {
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(x + 15 + i * 22, y + 25, 10, 10);
          ctx.fillRect(x + 15 + i * 22, y + 50, 10, 10);
        }
      }
      
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x + houseWidth / 2 - 10, y + 70, 20, 30);
      
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(x + houseWidth / 2 + 5, y + 85, 3, 3);
      
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x + houseWidth - 20, y - 30, 12, 30);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x + houseWidth - 20, y - 35, 12, 5);
      
      ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(x + houseWidth - 14 + i * 3, y - 40 - i * 10, 4 + i * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      frame++;
      
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0a1628');
      gradient.addColorStop(0.7, '#1a2a4a');
      gradient.addColorStop(1, '#2d3e5e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 50; i++) {
        const x = (i * 37) % width;
        const y = (i * 19) % (height - 200);
        const twinkle = Math.sin(frame * 0.05 + i) > 0.5 ? 1 : 0.3;
        ctx.globalAlpha = twinkle;
        ctx.fillRect(x, y, 2, 2);
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#FEFCD7';
      ctx.beginPath();
      ctx.arc(width - 100, 100, 40, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(254, 252, 215, 0.2)';
      ctx.beginPath();
      ctx.arc(width - 100, 100, 55, 0, Math.PI * 2);
      ctx.fill();

      const speed = 0.8;

      for (let i = houses.length - 1; i >= 0; i--) {
        const house = houses[i];
        house.x -= speed;
        
        drawHouse(house.x, house.y, house.type, house.color);
        
        if (house.x < -100) {
          house.x = width + 100;
          house.type = Math.floor(Math.random() * 6);
          house.color = ['#C8E6F5', '#F5E6D3', '#D4E8D4', '#E8D4D4', '#F5D9C8', '#E6E6FA'][Math.floor(Math.random() * 6)];
        }
      }

      ctx.fillStyle = '#F0F8FF';
      ctx.fillRect(0, groundY, width, groundHeight);
      
      ctx.fillStyle = '#E6F2FF';
      for (let i = 0; i < width; i += 30) {
        ctx.beginPath();
        ctx.arc(i, groundY + 10, 15, 0, Math.PI);
        ctx.fill();
      }
      
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < width; i += 50) {
        ctx.beginPath();
        ctx.ellipse(i, groundY + 5, 25, 8, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i];
        flake.y += flake.speed;
        flake.x += flake.drift;
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(Math.floor(flake.x), Math.floor(flake.y), flake.size, flake.size);
        
        if (flake.y > height) {
          flake.y = -10;
          flake.x = Math.random() * width;
        }
        if (flake.x < 0) flake.x = width;
        if (flake.x > width) flake.x = 0;
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />;
};
