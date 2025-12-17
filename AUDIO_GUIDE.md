# 🎵 음악 추가 가이드

## 현재 음악 시스템

프로젝트는 Web Audio API를 사용하여 음악을 생성합니다. 현재 구현된 음악:
- **BGM**: `audio.ts`의 `bgmPlayer` 객체로 루프 재생
- **효과음**: `playSound()` 함수로 다양한 상황별 사운드 생성

---

## 방법 1: 실제 음악 파일 추가 (권장)

### 1-1. 음악 파일 준비

프로젝트에 `public/audio/` 폴더를 만들고 음악 파일을 넣으세요:

\`\`\`
public/
└── audio/
    ├── bgm.mp3           # 배경 음악
    ├── click.mp3         # 클릭 효과음
    ├── success.mp3       # 성공 효과음
    └── door-open.mp3     # 문 열림 효과음
\`\`\`

**지원 형식**: MP3, OGG, WAV (브라우저 호환성 고려 시 MP3 권장)

---

### 1-2. audio.ts 수정

[src/utils/audio.ts](src/utils/audio.ts) 파일을 다음과 같이 수정:

\`\`\`typescript
import { SoundType } from '../types';

// Web Audio API 컨텍스트
export const audioCtx = typeof window !== 'undefined' 
  ? new (window.AudioContext || (window as any).webkitAudioContext)() 
  : null;

// 🎵 오디오 파일 로더
const audioCache: { [key: string]: AudioBuffer } = {};

const loadAudio = async (url: string): Promise<AudioBuffer> => {
  if (audioCache[url]) return audioCache[url];
  
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx!.decodeAudioData(arrayBuffer);
  audioCache[url] = audioBuffer;
  return audioBuffer;
};

// 🔊 오디오 재생 함수
const playAudioFile = async (url: string, loop: boolean = false, volume: number = 1.0) => {
  if (!audioCtx) return null;
  
  const audioBuffer = await loadAudio(url);
  const source = audioCtx.createBufferSource();
  const gainNode = audioCtx.createGain();
  
  source.buffer = audioBuffer;
  source.loop = loop;
  gainNode.gain.value = volume;
  
  source.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  source.start(0);
  
  return { source, gainNode };
};

// 🎵 BGM 플레이어 (MP3 파일 사용)
class BGMPlayer {
  private audioNodes: { source: AudioBufferSourceNode; gainNode: GainNode } | null = null;
  private isPlaying = false;

  async start() {
    if (this.isPlaying || !audioCtx) return;
    
    this.audioNodes = await playAudioFile('/audio/bgm.mp3', true, 0.3);
    this.isPlaying = true;
  }

  stop() {
    if (this.audioNodes) {
      this.audioNodes.source.stop();
      this.audioNodes = null;
    }
    this.isPlaying = false;
  }
}

export const bgmPlayer = new BGMPlayer();

// 🔊 효과음 재생 (MP3 파일 사용)
export const playSound = async (type: SoundType) => {
  const soundFiles: { [key in SoundType]: string } = {
    hover: '/audio/hover.mp3',
    click: '/audio/click.mp3',
    success: '/audio/success.mp3',
    error: '/audio/error.mp3',
    door: '/audio/door.mp3',
    snow: '/audio/snow.mp3',
    bell: '/audio/bell.mp3',
    open: '/audio/open.mp3',
  };

  await playAudioFile(soundFiles[type], false, 0.5);
};
\`\`\`

---

### 1-3. 폴백: 효과음이 없을 경우

일부 효과음이 없어도 앱이 작동하도록 에러 처리 추가:

\`\`\`typescript
export const playSound = async (type: SoundType) => {
  const soundFiles: { [key in SoundType]: string } = {
    hover: '/audio/hover.mp3',
    click: '/audio/click.mp3',
    success: '/audio/success.mp3',
    error: '/audio/error.mp3',
    door: '/audio/door.mp3',
    snow: '/audio/snow.mp3',
    bell: '/audio/bell.mp3',
    open: '/audio/open.mp3',
  };

  try {
    await playAudioFile(soundFiles[type], false, 0.5);
  } catch (error) {
    console.warn(\`Sound file not found: \${soundFiles[type]}\`);
  }
};
\`\`\`

---

## 방법 2: Web Audio API로 음악 생성 (현재 방식)

현재 [src/utils/audio.ts](src/utils/audio.ts)는 오실레이터로 간단한 비프음을 생성합니다.

### 2-1. 더 복잡한 멜로디 추가

\`\`\`typescript
// 간단한 멜로디 시퀀서
const playMelody = (notes: number[], duration: number = 0.2) => {
  if (!audioCtx) return;
  
  notes.forEach((freq, index) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.frequency.value = freq;
    osc.type = 'sine';
    
    const startTime = audioCtx.currentTime + (index * duration);
    gain.gain.setValueAtTime(0.1, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  });
};

// 예제: 크리스마스 멜로디
export const playChristmasMelody = () => {
  const melody = [523, 523, 523, 523, 523, 523, 523, 659, 440, 494, 523]; // C C C C C C C E A B C
  playMelody(melody, 0.3);
};
\`\`\`

---

## 방법 3: 외부 라이브러리 사용

### 3-1. Howler.js 설치 (음악 라이브러리)

\`\`\`bash
npm install howler
npm install --save-dev @types/howler
\`\`\`

### 3-2. audio.ts를 Howler로 변경

\`\`\`typescript
import { Howl } from 'howler';
import { SoundType } from '../types';

// BGM
const bgmSound = new Howl({
  src: ['/audio/bgm.mp3'],
  loop: true,
  volume: 0.3,
  html5: true, // 스트리밍 최적화
});

// 효과음
const sounds: { [key in SoundType]: Howl } = {
  hover: new Howl({ src: ['/audio/hover.mp3'], volume: 0.5 }),
  click: new Howl({ src: ['/audio/click.mp3'], volume: 0.5 }),
  success: new Howl({ src: ['/audio/success.mp3'], volume: 0.5 }),
  error: new Howl({ src: ['/audio/error.mp3'], volume: 0.5 }),
  door: new Howl({ src: ['/audio/door.mp3'], volume: 0.5 }),
  snow: new Howl({ src: ['/audio/snow.mp3'], volume: 0.5 }),
  bell: new Howl({ src: ['/audio/bell.mp3'], volume: 0.5 }),
  open: new Howl({ src: ['/audio/open.mp3'], volume: 0.5 }),
};

export const bgmPlayer = {
  start: () => bgmSound.play(),
  stop: () => bgmSound.stop(),
};

export const playSound = (type: SoundType) => {
  sounds[type].play();
};

export const audioCtx = null; // Howler가 자체적으로 관리
\`\`\`

---

## 무료 음악 리소스

### BGM 다운로드 사이트 (상업적 이용 가능)
- [Pixabay Music](https://pixabay.com/music/) - 무료, 저작권 걱정 없음
- [FreeSound](https://freesound.org/) - 효과음 전문
- [YouTube Audio Library](https://www.youtube.com/audiolibrary) - YouTube 제공 무료 음악
- [Incompetech](https://incompetech.com/) - Kevin MacLeod의 무료 음악

### 효과음 사이트
- [Zapsplat](https://www.zapsplat.com/) - 무료 효과음
- [SoundBible](https://soundbible.com/) - 공개 도메인 사운드

---

## 권장 사항

✅ **방법 1 (MP3 파일)**을 권장합니다:
- 브라우저 호환성 최고
- 음질 우수
- 쉬운 관리

📝 **주의사항**:
- 음악 파일은 용량이 크므로 `public/audio/`에 넣으세요 (번들에 포함되지 않음)
- MP3 파일 크기는 1MB 이하로 유지 (로딩 속도)
- 브라우저 자동 재생 정책으로 인해 사용자 상호작용 후에만 음악 재생 가능

---

## 테스트

음악 추가 후 테스트:

\`\`\`bash
npm run dev
\`\`\`

브라우저 콘솔에서:
\`\`\`javascript
// BGM 테스트
bgmPlayer.start();

// 효과음 테스트
playSound('click');
playSound('success');
\`\`\`

---

## 문제 해결

### 음악이 재생되지 않음
- 브라우저 콘솔에서 에러 확인
- 파일 경로가 올바른지 확인 (`/audio/` 폴더)
- 브라우저 자동 재생 정책 - 사용자가 버튼을 클릭한 후에만 재생됨

### 음악이 끊김
- 파일 형식을 MP3로 변환
- 파일 크기 줄이기 (비트레이트 128kbps 이하)
- Howler.js에서 `html5: true` 옵션 사용

---

**완료! 🎵** 음악을 추가했다면 커밋하고 푸시하세요:

\`\`\`bash
git add .
git commit -m "feat: Add custom music files"
git push
\`\`\`
