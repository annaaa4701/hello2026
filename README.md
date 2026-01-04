# 🎵 THE RESILIENCE MIX 2026

> Y2K 스타일의 인터랙티브 CD 플레이어 경험 - 2026 New Year's Greeting

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.3-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare)

## 📀 프로젝트 소개

**THE RESILIENCE MIX**는 2026년 새해 인사를 위한 인터랙티브 CD 플레이어 컨셉의 웹 애플리케이션입니다.  
Y2K 미학과 레트로 CD 플레이어의 향수를 현대적인 웹 기술로 재해석하여, 음악과 스티커로 꾸며진 스크랩북 같은 경험을 제공합니다.

### ✨ 주요 특징

- 🎨 **Y2K 스크랩북 디자인**: 스티커, 테이프, 손글씨 메모가 어우러진 데스크 레이아웃
- 💿 **리얼한 CD 플레이어**: 유리 케이스에 담긴 회전하는 CD, 7트랙 플레이리스트
- 📀 **CD 렉 시스템**: 흩어진 CD들을 클릭하여 플레이리스트 확인
- 📝 **손글씨 메모**: 직접 쓴 듯한 필기체 메시지
- 🧾 **영수증 스타일 버튼**: 레트로 감성의 지그재그 영수증 디자인
- 🎵 **7개의 큐레이션 트랙**: Young K, Anne-Marie, Post Malone, Ariana Grande, Valley, Baby Queen, Woodz
- 📱 **완벽한 모바일 대응**: 라디오 바, 수직 스크롤 레이아웃
- 🖱️ **커스텀 커서**: 상황에 따라 변하는 특별한 커서 디자인
- 🔐 **비밀번호 보호 메시지**: Cloudflare D1 + Pages Functions로 구현된 보안 시스템
- ⚡ **Rate Limiting**: IP당 10회/분 제한으로 보안 강화

## 🎮 사용 방법

### 1️⃣ 인트로 시청
- "PRESS PLAY" 버튼을 클릭하여 시작합니다
- 자동으로 라이너 노트(앨범 소개 메시지)가 표시됩니다

### 2️⃣ 라이너 노트 읽기
- 전체 공개 메시지를 스크롤하며 읽을 수 있습니다
- X 버튼을 클릭하면 메인 화면으로 이동하며 음악이 시작됩니다

### 3️⃣ CD 플레이어 조작
- 중앙의 CD 플레이어에서 재생/일시정지 버튼 사용
- 이전/다음 트랙 버튼으로 곡 변경
- 모바일 상단의 라디오 바에서도 조작 가능

### 4️⃣ 플레이리스트 보기
- CD 렉(쌓인 CD들)을 클릭하여 전체 플레이리스트 확인
- 각 트랙의 앨범 아트, 제목, 아티스트, 설명 확인
- 원하는 트랙을 클릭하여 바로 재생

### 5️⃣ 숨겨진 메시지 찾기
- 영수증 스타일 버튼("SCAN TO UNLOCK")을 클릭
- 받은 비밀번호를 입력하여 특별한 메시지 확인
- DAW 스타일 UI에서 답장 작성 가능
- ⚠️ IP당 10회/분 시도 제한 (보안)

### 2️⃣ 라이너 노트 읽기
- 전체 공개 메시지를 스크롤하며 읽을 수 있습니다
- X 버튼을 클릭하면 메인 화면으로 이동하며 음악이 시작됩니다

### 3️⃣ CD 플레이어 조작
- 중앙의 CD 플레이어에서 재생/일시정지 버튼 사용
- 이전/다음 트랙 버튼으로 곡 변경
- 모바일 상단의 라디오 바에서도 조작 가능

### 4️⃣ 플레이리스트 보기
- CD 렉(쌓인 CD들)을 클릭하여 전체 플레이리스트 확인
- 각 트랙의 앨범 아트, 제목, 아티스트, 설명 확인
- 원하는 트랙을 클릭하여 바로 재생

### 5️⃣ 숨겨진 메시지 찾기
- 영수증 스타일 버튼("SCAN TO UNLOCK")을 클릭
- 레시피 스타일의 바코드 스캐너에서 **4자리 비밀번호**만 입력
- 바코드 폰트로 표시되는 입력창에 비밀번호 입력
- Cloudflare D1 데이터베이스에서 암호화된 메시지 조회
- 입력 오류 시 "INVALID" 스탬프 효과로 표시

### 6️⃣ 메시지 확인 및 답장하기
- **왼쪽 패널**: 받은 메시지를 A4 용지 스타일로 표시
  - 상단에 우표/도장 아이콘 (Stamp)
  - 손글씨 폰트로 메시지 내용 표시
  - 하단에 보낸 사람 이름
- **오른쪽 패널**: 답장 작성 인터페이스
  - 줄노트 스타일 입력창
  - 답장 작성 후 "SEND REPLY" 버튼 클릭
  - 전송 완료 시 빨간색 **"SENT" 도장**이 쾅! 찍히는 애니메이션
  - 전송 후 "REVISE / RESEND" 버튼으로 수정 가능
  - 수정 버튼 클릭 시 도장 제거 & 입력창 다시 활성화
  - 답장 내용은 Cloudflare D1에 자동 저장

## 🏗️ 프로젝트 구조

```
hello2026/
├── src/
│   ├── components/
│   │   ├── MessageVault/
│   │   │   ├── BarcodeScanner.tsx      # 비밀번호 입력 모달 (레시피 스타일, password-only)
│   │   │   ├── HiddenTrack.tsx         # 숨겨진 메시지 뷰어 + 답장 UI (SENT 도장 애니메이션)
│   │   │   └── LinerNote.tsx           # 공개 메시지 (라이너 노트)
│   │   ├── CustomCursor.tsx            # 커스텀 커서
│   │   ├── HandwrittenMemo.tsx         # 손글씨 메모 컴포넌트
│   │   ├── LoadingIntro.tsx            # 인트로 화면
│   │   ├── MobileRadiobar.tsx          # 모바일 상단 재생바
│   │   ├── PlaylistModal.tsx           # 플레이리스트 모달
│   │   ├── StickerButton.tsx           # 스티커/버튼 컴포넌트 모음
│   │   └── TrackItem.tsx               # 트랙 아이템
│   ├── config/
│   │   └── firebase.ts                 # (미사용) Firebase 설정
│   ├── constants/
│   │   └── messages.ts                 # 공개 메시지 텍스트
│   ├── styles/
│   │   └── global.css                  # 전역 스타일 (Tailwind)
│   ├── types/
│   │   └── index.ts                    # TypeScript 타입 정의
│   ├── utils/
│   │   ├── audio.ts                    # 사운드 효과 유틸리티
│   │   └── firebaseService.ts          # (미사용) Firebase 함수들
│   ├── App.tsx                         # 메인 애플리케이션
│   └── main.tsx                        # 진입점
├── functions/
│   └── api/
│       ├── open.ts                     # 메시지 조회 API (Cloudflare Functions)
│       └── reply.ts                    # 답장 저장 API (Cloudflare Functions)
├── public/
│   ├── assets/
│   │   ├── music/                      # 7개 트랙 MP3 파일
│   │   └── 1.jpg ~ 7.jpg              # 앨범 아트
│   └── stickers/                       # SVG 스티커 에셋
├── schema.sql                          # D1 데이터베이스 스키마
├── wrangler.toml                       # Cloudflare 배포 설정
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🛠️ 기술 스택

### Frontend
- **React 19.2.3** - UI 라이브러리
- **TypeScript 5.9.3** - 타입 안전성
- **Vite 7.2.7** - 빌드 도구 및 개발 서버
- **Tailwind CSS 3.4.17** - 유틸리티 기반 스타일링

### Backend & Deployment
- **Cloudflare Pages** - 정적 사이트 호스팅 및 자동 배포
- **Cloudflare Functions** - 서버리스 API 엔드포인트
- **Cloudflare D1** - SQLite 기반 엣지 데이터베이스
- **Cloudflare R2** - 음악 파일 스토리지
- **Wrangler 3.x** - Cloudflare 배포 CLI

### Audio
- **HTML5 Audio API** - 음악 재생 및 제어

### Icons & UI
- **Lucide React 0.560.0** - 아이콘 라이브러리 (Stamp, RotateCcw, Send, PenTool 등)

### 주요 기능 및 애니메이션
- **비밀번호 입력**: 바코드 폰트 스타일의 레시피 UI, 4자리 password-only
- **도장 애니메이션**: 0.4초 탄성 애니메이션으로 "SENT" 도장 표시
- **답장 수정 기능**: REVISE 버튼으로 전송된 답장 재편집 가능
- **Rate Limiting**: IP 기반 10회/분 제한

## 🚀 설치 및 실행

### 1. 저장소 클론 및 의존성 설치

```bash
git clone <repository-url>
cd hello2026
npm install
```

### 2. 환경 변수 설정 (선택사항)

프론트엔드에서 환경 변수가 필요한 경우 `.env` 파일 생성:

```env
# 현재는 사용하지 않음 (Cloudflare Functions가 /api/* 경로로 자동 라우팅)
# VITE_API_ENDPOINT=your-cloudflare-workers-url
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 4. Cloudflare 배포

#### D1 데이터베이스 설정

```bash
# D1 데이터베이스 생성
wrangler d1 create letters-db

# 스키마 적용
wrangler d1 execute letters-db --file=./schema.sql
```

#### Pages 배포

```bash
# 빌드
npm run build

# GitHub 연동 시 자동 배포 (권장)
# 또는 수동 배포:
wrangler pages deploy dist
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

### 5. Cloudflare Pages 배포

#### 방법 1: Wrangler CLI 사용

```bash
# Wrangler 설치 (이미 devDependencies에 포함)
npm install

# Cloudflare 로그인
npx wrangler login

# 빌드 및 배포
npm run deploy
```

#### 방법 2: Cloudflare Dashboard 사용

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 접속
2. Pages 메뉴로 이동
3. "Create a project" 클릭
4. GitHub 저장소 연결 또는 직접 업로드
5. 빌드 설정:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Framework preset**: `Vite`
6. 배포 완료 후 `*.pages.dev` 도메인 확인

## 📝 데이터 구조 (향후 백엔드 연동 시)

### Messages (Cloudflare D1 또는 KV)
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

## 🎨 디자인 컨셉

### 스크랩북 미학
- **콜라주 레이아웃**: 스티커, 테이프, 손글씨 메모가 자유롭게 배치
- **레트로 질감**: 모눈종이 배경, 노이즈 텍스처, 미색(#f4f4f0) 톤
- **CD 플레이어**: 투명 유리 케이스, 회전하는 CD, 금속 나사
- **영수증 디자인**: 지그재그 테두리, 바코드, 종이 질감

### 인터랙션 디자인
- **커서 변화**: 상황에 따라 커스텀 커서로 변경
- **사운드 피드백**: 클릭, 호버 시 각각 다른 소리
- **스티커 애니메이션**: hover 시 회전, 확대, 색상 변화
- **CD 회전**: 재생 중 애니메이션 (animate-spin-slow)

## 🎵 음악 트랙

### 큐레이션된 7개 트랙
1. **Natural** - Young K
2. **To Be Young** - Anne-Marie
3. **Myself** - Post Malone
4. **Twilight Zone** - Ariana Grande
5. **Can We Make It** - Valley
6. **Dover beach** - Baby Queen
7. **Journey** - Woodz

### 오디오 시스템
- HTML5 Audio API 사용
- 무한 반복 재생 (loop)
- 이전/다음 트랙 순환
- 트랙별 앨범 아트 표시

## 📱 반응형 디자인

### 모바일 (< 768px)
- 라디오 바 스타일 상단 플레이어
- 수직 스크롤 레이아웃 (CD 플레이어 → EJECT → 메모)
- CD 플레이어 180px × 180px
- CD 렉 60% 스케일
- 영수증 버튼 기본 크기

### 데스크탑 (≥ 768px)
- 스크랩북 데스크 레이아웃
- CD 플레이어 중앙 배치 (360px × 360px)
- 스티커들이 여백에 자유롭게 배치
- 영수증 버튼 150% 확대
- 모든 요소 절대 위치 지정

## 🔧 주요 기능

### 1. 인트로 → 라이너 노트 → 메인 플로우
모바일에서 자연스러운 스토리텔링 경험을 위한 단계적 전환

### 2. CD 렉 시스템
7개의 CD가 흩어진 형태로 쌓여있으며 클릭하면 플레이리스트 모달 표시

### 3. 플레이리스트 모달
- 앨범 아트와 트랙 정보 표시
- 모바일: 수직 레이아웃 (앨범 아트 위, 트랙 리스트 아래)
- 데스크탑: 좌우 레이아웃 (앨범 아트 좌, 트랙 리스트 우)
- 각 트랙 클릭으로 즉시 재생

### 4. 숨겨진 메시지 시스템
- **바코드 스캐너**: 레시피 스타일 UI, 4자리 비밀번호 입력
- **메시지 뷰어**: 양면 엽서 형태 (왼쪽: 받은 메시지, 오른쪽: 답장)
- **Cloudflare D1**: SQLite 기반 메시지 저장소
- **답장 기능**:
  - 줄노트 스타일 입력창
  - "SEND REPLY" 버튼으로 답장 전송
  - 전송 시 빨간색 "SENT" 도장 애니메이션 (0.4초 탄성 효과)
  - "REVISE / RESEND" 버튼으로 답장 수정 가능
  - 수정 모드 시 도장 제거 및 입력창 재활성화
- **Rate Limiting**: IP당 10회/분 제한으로 보안 강화
- **API 엔드포인트**: `/api/open` (조회), `/api/reply` (답장 저장)

## 🎯 사용 사례

- 🎄 **새해 인사**: 음악과 함께하는 특별한 연하장
- 🎁 **선물 카드**: QR 코드와 함께 CD 플레이어 링크 공유
- 📀 **플레이리스트 공유**: 큐레이션된 음악을 스토리텔링과 함께
- 💌 **감사 인사**: 스크랩북 느낌의 따뜻한 메시지 전달

## 🚀 향후 개발 계획

- [x] ~~Cloudflare Workers API 연동 (메시지 CRUD)~~ ✅ 완료
- [x] ~~Cloudflare D1로 메시지 저장소 구현~~ ✅ 완료
- [x] ~~비밀번호 기반 메시지 조회 시스템~~ ✅ 완료
- [x] ~~답장 작성 및 수정 기능~~ ✅ 완료
- [x] ~~SENT 도장 애니메이션~~ ✅ 완료
- [ ] 관리자 대시보드 (메시지 관리)
- [ ] 비밀번호 해싱 강화 (현재 plaintext)
- [ ] 프로덕션 로깅 최적화 (디버그 로그 제거)
- [ ] 관리자 대시보드 (메시지 생성/관리)
- [ ] 공유 기능 (링크 복사, QR 코드 생성)
- [ ] 다국어 지원 (EN/KO)
- [ ] PWA 지원 (오프라인 재생)

## 📄 라이선스

ISC License

## 👤 제작자

Created with ❤️ by Nayeon

---

**Trust the uncertainty. Thanks to all the dips and cracks.**

© 2026 Resilience Records. All Rights Reserved.
