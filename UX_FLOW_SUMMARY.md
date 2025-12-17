# 🎄 Winter Post Office - UX Flow 구현 완료

## 📋 전체 흐름 (Phase 1-7)

### Phase 1: 진입 (StartScreen)
- **화면**: 고요한 겨울 밤하늘 배경에 "WINTER POST OFFICE" 타이포그래피
- **커서**: ❄️ 눈꽃 모양 (snowflake)
- **인터랙션**: 
  - ENTER 버튼에 hover 시 주변에 눈송이가 회전
  - 클릭 시 부드러운 화면 전환
  
### Phase 2: 초대장 (PublicLetterModal)
- **화면**: 크림색 편지지가 중앙에 떠오름 (Blur + Fade-in)
- **내용**: 우체국장의 환영 인사
- **커서**: 👆 pointer (가독성을 위해)
- **인터랙션**: 
  - "우체국 입장하기" 버튼 클릭
  - 편지가 접히며 사라짐

### Phase 3: 우체국 로비 (App - Main Grid)
- **화면**: 12개의 낡은 나무 사서함 (P.O. Box) 그리드
- **배경**: 창밖으로 눈 내리는 숲속 풍경
- **커서**: 
  - 기본: ❄️ 눈꽃
  - 사서함 hover: 🔑 황금 열쇠 (key)
- **인터랙션**: 
  - 문 클릭 또는 "FIND MY LETTER" 버튼
  - LoginModal 열림

### Phase 4: 본인 확인 (LoginModal)
- **화면**: 어두운 네이비 색상의 우체국 창구 모달
- **커서**: 👆 pointer (입력 필드/버튼)
- **인터랙션**: 
  - 성공: "띠링!" 소리와 함께 모달 닫힘
  - 실패: ⚠️ 에러 메시지 + 모달 좌우 흔들림 (shake-horizontal)

### Phase 5: 문 열림 (PixelDoor Animation)
- **연출**: 
  1. 특정 문 하나만 덜컹거리며 흔들림 (`animate-door-shake`)
  2. "끼이익-" 소리와 함께 문이 3D로 활짝 열림 (`-rotate-y-90`)
  3. 열린 문 안쪽의 편지가 빛나며 줌인 (`animate-letter-reveal`)

### Phase 6: 읽기 및 답장 (PostOfficeModal)

#### Step A: 읽기
- 종이 질감의 편지 내용 표시
- "REPLY (뒤집기)" 버튼 클릭

#### Step B: 쓰기
- 편지지가 3D로 뒤집힘 (Flip Animation)
- **커서**: ✒️ 깃펀 (quill) - 답장 작성 영역
- 줄노트에 답장 작성

#### Step C: 전송
- 우표 영역에 마우스 올리기
- **커서**: 📮 우표 (stamp)
- 클릭 시 "쾅!" 소리와 함께 우표 찍힘 (`animate-stamp-thud`)
- 편지가 날아가는 애니메이션

### Phase 7: 퇴장 (Lobby Return)
- 다시 사서함 그리드 화면으로 복귀
- 배경음악 계속, 눈 계속 내림
- 좌측 상단 로고 클릭 시 초대장(Phase 2) 재열람 가능

---

## 🎨 커서 시스템

| 커서 타입 | 사용 위치 | 비주얼 |
|---------|---------|--------|
| `snowflake` | StartScreen, 로비 | ❄️ 하얀 눈꽃 + 클릭 시 눈가루 효과 |
| `pointer` | 버튼, 링크, 모달 | 👆 화살표 (번개 모양) |
| `key` | 사서함 hover | 🔑 황금 열쇠 |
| `quill` | 답장 작성 영역 | ✒️ 깃펀 |
| `stamp` | 우표 영역 | 📮 우표 (점선 테두리) |
| `default` | 편지 읽기, 일반 | 🖱️ 작은 흰색 사각형 |

---

## ✨ 주요 애니메이션

### CSS Animations (global.css)
- `stamp-thud`: 우표 찍히는 "쾅!" 효과 (0.6s, bounce)
- `door-shake`: 문 덜컹거림 (0.6s, infinite)
- `letter-reveal`: 편지 줌인 등장 (0.8s, cubic-bezier)
- `spin-slow`: 눈송이 회전 (3s, infinite)
- `fade-in`: 부드러운 페이드인 (0.5s)
- `shake-horizontal`: 로그인 실패 시 좌우 흔들림 (0.5s)

### 3D 변환
- `perspective-1000`: 3D 공간 설정
- `transform-style-3d`: 3D 자식 요소 유지
- `backface-hidden`: 뒷면 숨김
- `rotate-y-180`: 180도 회전 (엽서 뒤집기)
- `-rotate-y-90`: -90도 회전 (문 열림)

---

## 🎯 비주얼 테마

### 색상 팔레트
- **Deep Navy**: `#2C3E50`, `#34495e` (밤하늘, 모달)
- **Warm Wood**: `#463325`, `#2a1b15`, `#5c4033` (사서함, 나무)
- **Cream**: `#FFFDF0`, `#E8E6D1` (편지, 버튼)
- **Accent**: `#FFD700` (금색 - 번호판, 강조)
- **Snow**: `#A5F2F3` (눈송이, 하이라이트)

### 폰트
- **픽셀**: `'Press Start 2P'` (타이틀, 버튼)
- **한글**: `'Gowun Batang'`, `'Noto Sans KR'` (편지 내용)

---

## 🔧 컴포넌트별 역할

| 컴포넌트 | 역할 | 주요 Props |
|---------|------|----------|
| `App.tsx` | 전체 흐름 관리, 상태 오케스트레이션 | - |
| `StartScreen` | Phase 1 진입 화면 | `onStart`, 커서 이벤트 |
| `PublicLetterModal` | Phase 2 초대장 | `onClose`, 커서 이벤트 |
| `PixelDoor` | Phase 5 사서함 문 | `isTarget`, `isOpen`, `doorId` |
| `LoginModal` | Phase 4 본인 확인 | `error`, `onSubmit` |
| `PostOfficeModal` | Phase 6 편지 읽기/쓰기 | `isFlipped`, `setCursor` |
| `CustomCursor` | 전역 커서 시스템 | `variant` |
| `SnowCanvas` | 배경 눈 내리는 효과 | - |

---

## 📝 상태 관리 (App.tsx)

```typescript
// Audio & UI
const [isMuted, setIsMuted] = useState(false);
const [cursorVariant, setCursorVariant] = useState<CursorVariant>('snowflake');

// UX Flow
const [started, setStarted] = useState(false);                    // Phase 1
const [showPublicLetter, setShowPublicLetter] = useState(false); // Phase 2
const [showLogin, setShowLogin] = useState(false);               // Phase 4
const [targetDoorId, setTargetDoorId] = useState<number | null>(null);  // Phase 5 (흔들림)
const [openedDoorId, setOpenedDoorId] = useState<number | null>(null);  // Phase 5 (열림)
const [showLetter, setShowLetter] = useState(false);             // Phase 6
const [foundMessage, setFoundMessage] = useState<MessageData | null>(null);
```

---

## 🎵 오디오 시스템
- `bgmPlayer.start()`: 배경음악 시작
- `playSound('click')`: 버튼 클릭음
- `playSound('hover')`: hover 효과음
- `playSound('success')`: 로그인 성공
- `playSound('error')`: 로그인 실패
- `playSound('open')`: 문 열리는 소리

---

## ✅ 구현 완료 사항
1. ✅ Phase 1-7 전체 흐름 구현
2. ✅ 6가지 커서 타입 및 자동 전환
3. ✅ 문 흔들림 → 3D 열림 → 편지 줌인 연출
4. ✅ 엽서 3D 뒤집기 애니메이션
5. ✅ 우표 "쾅!" 찍기 효과
6. ✅ 로그인 실패 시 좌우 흔들림
7. ✅ StartScreen ENTER 버튼 눈송이 회전

---

**🎄 핵심 경험**: "나를 위한 편지를 찾아 문을 열고, 답장을 적어 우표를 붙이는 아날로그 경험."
**🎨 스타일**: Hi-bit Pixel Art (고해상도 픽셀 아트)
**💡 Tone**: 따뜻하고 감성적인 겨울 분위기
