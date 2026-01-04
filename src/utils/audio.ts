import { SoundType } from '../types';

// Web Audio API 컨텍스트
export const audioCtx = typeof window !== 'undefined' 
  ? new (window.AudioContext || (window as any).webkitAudioContext)() 
  : null;

// 효과음 MP3 파일 재생 함수
export const playSoundFile = (filename: string, volume: number = 0.5) => {
  const audio = new Audio(`/assets/${filename}`);
  audio.volume = volume;
  audio.play().catch(err => console.log('Audio play failed:', err));
};

// 사운드 효과 재생
export const playSound = (type: SoundType) => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  if (type === 'hover') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.start(now);
    osc.stop(now + 0.05);
  } else if (type === 'click') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.linearRampToValueAtTime(1200, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === 'success') {
    osc.type = 'square';
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const t = now + i * 0.1;
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'square';
      o.frequency.value = freq;
      o.connect(g);
      g.connect(audioCtx.destination);
      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      o.start(t);
      o.stop(t + 0.1);
    });
  } else if (type === 'error') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(50, now + 0.3);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  }
};

// BGM 플레이어 클래스
export class BGMPlayer {
  isPlaying: boolean = false;
  tempo: number = 180;
  noteLength: number = 0.2;
  nextNoteTime: number = 0;
  timerID: number | null = null;
  sequenceIndex: number = 0;
  
  melody = [
    659, 659, 659, null, 659, 659, 659, null,
    659, 783, 523, 587, 659, null, null, null,
    698, 698, 698, 698, 698, 659, 659, 659,
    659, 587, 587, 659, 587, null, 783, null
  ];

  start() {
    if (this.isPlaying || !audioCtx) return;
    this.isPlaying = true;
    this.nextNoteTime = audioCtx.currentTime;
    this.scheduler();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerID) window.clearTimeout(this.timerID);
  }

  scheduler() {
    if (!audioCtx) return;
    while (this.nextNoteTime < audioCtx.currentTime + 0.1) {
      this.playNote(this.nextNoteTime);
      this.nextNoteTime += (60 / this.tempo);
      this.sequenceIndex++;
      if (this.sequenceIndex === this.melody.length) this.sequenceIndex = 0;
    }
    this.timerID = window.setTimeout(() => this.scheduler(), 25);
  }

  playNote(time: number) {
    if (!audioCtx) return;
    const freq = this.melody[this.sequenceIndex];
    if (freq) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.02, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + (60 / this.tempo) - 0.05);
      osc.start(time);
      osc.stop(time + (60 / this.tempo));
    }
  }
}

export const bgmPlayer = new BGMPlayer();
