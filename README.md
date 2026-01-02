# 🎵 THE RESILIENCE MIX 2026

> Y2K 스타일의 인터랙티브 CD 플레이어 경험 - 2026 New Year's Greeting

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.3-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-12.7.0-ffca28?logo=firebase)

## 📀 프로젝트 소개

**THE RESILIENCE MIX**는 2026년 새해 인사를 위한 인터랙티브 CD 플레이어 컨셉의 웹 애플리케이션입니다.  
Y2K 미학과 레트로 CD 플레이어의 향수를 현대적인 웹 기술로 재해석하여, 특별한 메시지를 숨겨진 트랙으로 전달하는 새로운 경험을 제공합니다.

### ✨ 주요 특징

- 🎨 **Y2K 레트로 디자인**: 홀로그램 CD, 노이즈 효과, 글리치 타이포그래피
- 💿 **CD 플레이어 경험**: 회전하는 CD 애니메이션, 트랙리스트 인터페이스
- 🎹 **DAW 스타일 답장 시스템**: 실제 음악 작업 소프트웨어 느낌의 메시지 작성 UI
- 🔐 **개인화된 메시지**: 이름과 비밀번호로 숨겨진 트랙(메시지)을 찾는 시스템
- 🔥 **Firebase 실시간 동기화**: 메시지 저장 및 답장 기능
- 🎵 **Web Audio API**: 인터랙티브한 사운드 효과와 BGM
- 🖱️ **커스텀 커서**: 상황에 따라 변하는 특별한 커서 디자인

## 🎮 사용 방법

### 1️⃣ 앨범 재생 시작
- "Play Disc" 버튼을 클릭하여 CD를 재생합니다
- 회전하는 CD와 함께 BGM이 시작됩니다

### 2️⃣ 라이너 노트 읽기
- 앨범 제목을 클릭하여 라이너 노트(앨범 소개 메시지)를 확인합니다
- 모바일에서는 스크롤하여 전체 내용을 읽을 수 있습니다

### 3️⃣ 숨겨진 트랙 찾기
- "UNLOCK HIDDEN TRACK" 버튼을 클릭합니다
- 받은 이름과 비밀번호를 입력하여 자신을 위한 특별한 트랙을 찾습니다
- 트랙이 열리면 발신자의 메시지를 확인할 수 있습니다

### 4️⃣ 답장 보내기
- DAW 스타일의 인터페이스에서 답장을 작성합니다
- 빨간 REC 버튼을 눌러 답장을 녹음(전송)합니다
- 답장은 Firebase에 실시간으로 저장됩니다

## 🏗️ 프로젝트 구조

```
cdplayer2025/
├── src/
│   ├── components/
│   │   ├── PostOffice/
│   │   │   ├── LoginModal.tsx          # 로그인(트랙 찾기) 모달
│   │   │   ├── PostOfficeModal.tsx     # DAW 스타일 메시지 뷰어
│   │   │   └── PublicLetterModal.tsx   # 라이너 노트 모달
│   │   ├── CustomCursor.tsx            # 커스텀 커서 컴포넌트
│   │   ├── GlitchText.tsx              # 글리치 효과 텍스트
│   │   ├── NoiseCanvas.tsx             # 노이즈 배경 캔버스
│   │   ├── PixelDoor.tsx               # 트랙 아이템 컴포넌트
│   │   └── StartScreen.tsx             # 시작 화면 (CD 플레이어)
│   ├── config/
│   │   └── firebase.ts                 # Firebase 설정
│   ├── constants/
│   │   └── messages.ts                 # 공개 메시지 상수
│   ├── styles/
│   │   └── global.css                  # 전역 스타일 (Tailwind + Custom)
│   ├── types/
│   │   └── index.ts                    # TypeScript 타입 정의
│   ├── utils/
│   │   ├── audio.ts                    # Web Audio API 유틸리티
│   │   └── firebaseService.ts          # Firebase 데이터베이스 함수
│   ├── App.tsx                         # 메인 애플리케이션
│   └── main.tsx                        # 진입점
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🛠️ 기술 스택

### Frontend
- **React 19.2.3** - UI 라이브러리
- **TypeScript 5.9.3** - 타입 안전성
- **Vite 7.2.7** - 빌드 도구 및 개발 서버
- **Tailwind CSS 3.4.17** - 유틸리티 스타일링

### Backend & Database
- **Firebase Realtime Database 12.7.0** - 메시지 저장 및 실시간 동기화

### Audio
- **Web Audio API** - 사운드 효과 및 BGM 생성

### Icons & UI
- **Lucide React 0.560.0** - 아이콘 라이브러리

## 🚀 설치 및 실행

### 1. 저장소 클론 및 의존성 설치

```bash
git clone <repository-url>
cd cdplayer2025
npm install
```

### 2. Firebase 설정

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Realtime Database 활성화
3. 웹 앱 추가 후 구성 정보 복사
4. `src/config/firebase.ts` 파일에 본인의 Firebase 설정 정보 입력:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 4. 프로덕션 빌드

```bash
npm run build
npm run preview  # 빌드 결과 미리보기
```

## 📝 Firebase 데이터 구조

### Messages
```json
{
  "messages": {
    "message-id-1": {
      "id": "message-id-1",
      "receiver": "홍길동",
      "password": "1234",
      "from": "김철수",
      "content": "새해 복 많이 받으세요!",
      "doorId": 5,
      "createdAt": 1735689600000,
      "isRead": true,
      "readAt": 1735690000000,
      "hasReply": true,
      "reply": "감사합니다!",
      "repliedAt": 1735691000000
    }
  }
}
```

### Public Message (라이너 노트)
```json
{
  "publicMessage": {
    "from": "Nayeon",
    "title": "To. My Dear Visitor",
    "content": "앨범 소개 메시지..."
  }
}
```

## 🎨 디자인 컨셉

### Y2K 미학 요소
- **홀로그램 효과**: CD 표면의 무지개빛 반사
- **노이즈/그레인**: CRT 모니터 느낌의 배경 질감
- **스캔라인**: 옛날 TV 화면 효과
- **글리치 타이포그래피**: 디지털 에러 느낌의 텍스트 효과
- **네온 컬러**: 청록색(#A5F2F3)과 마젠타(#FF00FF) 그라데이션

### 인터랙션 디자인
- **커서 변화**: 상황에 따라 기본/포인터/열쇠 모양으로 변경
- **사운드 피드백**: 마우스 호버, 클릭, 성공, 오류 시 각각 다른 소리
- **애니메이션**: CD 회전, 페이드 인/아웃, 글리치 효과 등

## 🎵 오디오 시스템

### BGM (자동 재생)
- Carol of the Bells 멜로디 기반
- Web Audio API로 실시간 생성
- 템포: 180 BPM
- 음색: Square 파형

### 효과음
- **hover**: 트랙 위에 마우스 올릴 때
- **click**: 버튼 클릭 시
- **success**: 로그인 성공, 답장 전송 성공
- **error**: 로그인 실패
- **open**: 트랙 열릴 때

## 📱 반응형 디자인

- **모바일**: 전체 화면 몰입형 경험, 스크롤 스냅
- **태블릿/데스크탑**: CD 플레이어 중심 레이아웃, 모달 오버레이

## 🔧 주요 기능 구현

### 1. 랜덤 트랙 표시
로그인 전에는 24개 트랙 중 랜덤한 12개만 표시하여 미스터리한 느낌을 줍니다.

### 2. 로그인 시스템
이름과 비밀번호로 Firebase에서 메시지를 찾아 해당하는 트랙만 표시합니다.

### 3. DAW 스타일 UI
실제 음악 작업 소프트웨어(Logic, Ableton 등)의 UI를 모방하여 답장을 작성합니다.

### 4. 실시간 읽음 상태
메시지를 열면 자동으로 읽음 상태가 Firebase에 업데이트됩니다.

## 🎯 사용 사례

- 🎄 **새해 인사**: 특별한 방식으로 새해 메시지 전달
- 🎁 **생일 축하**: 비밀번호로 보호된 개인화된 생일 메시지
- 💌 **감사 인사**: 고객, 팀원, 친구에게 특별한 감사 편지
- 🎓 **졸업 메시지**: 졸업생들에게 각각의 트랙 배정

## 📄 라이선스

ISC License

## 👤 제작자

Created with ❤️ by Nayeon

---

**Trust the uncertainty. Thanks to all the dips and cracks.**

© 2026 Resilience Records. All Rights Reserved.
