# HEART-BIT 💙❄️

**80년대 레트로 스타일의 인터랙티브 겨울 메시지 보드**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)

## ✨ 기능

- 🎮 **레트로 8비트 스타일** - 80년대 아케이드 게임 감성
- 🎵 **Web Audio API BGM** - 레트로 크리스마스 멜로디
- 🏠 **겨울 마을 배경** - 애니메이션 눈 내리는 마을
- 🚪 **12개의 인터랙티브 문** - 각각 고유한 디자인과 메시지
- 🔐 **비밀번호 잠금** - 각 메시지는 비밀번호로 보호
- 🎨 **커스텀 커서** - 눈송이 및 코인 픽셀 커서
- 🌟 **글리치 효과** - CRT 모니터 효과 및 스캔라인

## 🎯 개선사항

### 코드 구조
- ✅ **모듈화된 컴포넌트** - 962줄에서 ~200줄로 축소
- ✅ **타입 안정성** - TypeScript 타입 정의 분리
- ✅ **재사용 가능한 유틸리티** - 오디오, 상수 분리
- ✅ **CSS 분리** - 글로벌 스타일 외부화

### 디자인 개선
- ✨ **무지개 애니메이션** - 타이틀에 그라데이션 효과
- ✨ **반짝이는 별** - 여러 지연 시간의 장식 요소
- ✨ **빛나는 버튼** - 호버 시 빛나는 효과
- ✨ **픽셀 프레임** - 네 모서리 펄스 애니메이션
- ✨ **향상된 트랜지션** - 부드러운 페이드 효과

## 📂 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── CustomCursor.tsx
│   ├── GlitchText.tsx
│   ├── Modal.tsx
│   ├── PixelDoor.tsx
│   ├── RacingIntroCanvas.tsx
│   ├── SnowCanvas.tsx
│   └── StartScreen.tsx
├── constants/           # 상수 데이터
│   └── stages.ts
├── types/               # TypeScript 타입
│   └── index.ts
├── utils/               # 유틸리티 함수
│   └── audio.ts
├── styles/              # CSS 스타일
│   └── global.css
├── App.tsx             # 메인 앱 컴포넌트
└── main.tsx            # 엔트리 포인트
```

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 🎮 사용 방법

1. **시작 화면**: "INSERT COIN" 버튼을 클릭하여 시작
2. **BGM**: 자동으로 재생되며 음소거 버튼으로 제어 가능
3. **문 선택**: 12개의 문 중 하나를 클릭
4. **비밀번호 입력**: 데모 비밀번호는 `1234`
5. **메시지 확인**: 잠금 해제 후 특별한 메시지 감상

## 🛠️ 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **Lucide React** - 아이콘
- **Web Audio API** - 사운드 효과

## 🎨 디자인 특징

### 애니메이션
- `animate-rainbow` - 무지개 색상 로테이션
- `animate-sparkle` - 반짝이는 효과
- `animate-coin` - 코인 깜박임
- `animate-pulse` - 펄스 효과
- `animate-shake` - 흔들림 효과
- `crt-flicker` - CRT 모니터 깜박임

### 색상 팔레트
- **메인**: `#050510` (다크 배경)
- **액센트**: `#FF00FF` (마젠타), `#00FFFF` (시안)
- **하이라이트**: `#FFD700` (골드), `#FF0000` (레드)

## 📦 GitHub Pages 배포

1. 저장소 설정 > Pages > Source를 "GitHub Actions"로 설정
2. `.github/workflows/deploy.yml` 파일이 자동으로 배포를 처리합니다

## 📝 라이선스

MIT License - 자유롭게 사용하세요!

## 👏 기여

개선 사항이나 버그 리포트는 언제든지 환영합니다!

---

**Made with ❤️ and 8-bit nostalgia**

© 2024 HEART-BIT SYSTEM. ALL MEMORIES RESERVED.
