# 🔥 Firebase 설정 가이드

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: `resilience-cd-player`)
4. Google Analytics는 선택사항 (추천: 사용 안 함)
5. "프로젝트 만들기" 클릭

---

## 2. Realtime Database 설정

1. 왼쪽 메뉴에서 **"빌드" > "Realtime Database"** 선택
2. "데이터베이스 만들기" 클릭
3. 위치 선택: **"asia-southeast1 (싱가포르)"** 추천
4. 보안 규칙 설정:
   - 개발 중: **"테스트 모드에서 시작"** 선택
   - 배포 시: 아래 보안 규칙 적용 (5단계 참고)

---

## 3. Firebase 웹 앱 등록

1. Firebase Console 메인 화면에서 **"웹 앱 추가"** 클릭 (</> 아이콘)
2. 앱 닉네임 입력 (예: `CD Player Web`)
3. "Firebase 호스팅 설정" 체크 해제
4. "앱 등록" 클릭

---

## 4. 환경 변수 설정

### 4-1. Firebase 설정값 복사

앱 등록 후 표시되는 `firebaseConfig` 객체를 확인하세요:

\`\`\`javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
\`\`\`

### 4-2. .env 파일 생성

프로젝트 루트에 `.env` 파일을 생성하고 값을 입력하세요:

\`\`\`bash
# .env 파일 생성
cp .env.example .env
\`\`\`

`.env` 파일 내용:

\`\`\`env
VITE_FIREBASE_API_KEY=AIza... (여기에 복사한 apiKey)
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
\`\`\`

⚠️ **중요**: `.env` 파일은 절대 Git에 커밋하지 마세요! (`.gitignore`에 이미 추가됨)

---

## 5. Realtime Database 보안 규칙 설정

Firebase Console > Realtime Database > **"규칙"** 탭에서 다음 규칙을 적용하세요:

\`\`\`json
{
  "rules": {
    "messages": {
      ".read": true,
      ".write": true,
      "$messageId": {
        ".validate": "newData.hasChildren(['receiver', 'password', 'from', 'content', 'doorId'])"
      }
    },
    "publicMessage": {
      ".read": true,
      ".write": true
    }
  }
}
\`\`\`

**규칙 설명:**
- 모든 사용자가 메시지를 읽고 쓸 수 있음 (간단한 프로젝트용)
- 메시지는 필수 필드(`receiver`, `password`, `from`, `content`, `doorId`)를 포함해야 함

**🔒 추후 개선 권장:**
- Firebase Authentication 추가
- 읽기/쓰기 권한을 인증된 사용자로 제한
- 비밀번호 필드를 암호화

---

## 6. 초기 데이터 업로드

### 6-1. 브라우저 콘솔에서 실행

1. 개발 서버 실행: `npm run dev`
2. 브라우저에서 앱 열기 (http://localhost:5173)
3. F12 (개발자 도구) 열기
4. Console 탭에서 다음 명령어 실행:

\`\`\`javascript
await window.uploadSampleData();
\`\`\`

✅ 성공하면 "✅ Sample data uploaded successfully!" 메시지가 표시됩니다.

### 6-2. Firebase Console에서 직접 추가

1. Firebase Console > Realtime Database > **"데이터"** 탭
2. 루트에 `messages` 노드 추가
3. 수동으로 메시지 데이터 입력:

\`\`\`json
{
  "messages": {
    "-NxExample1": {
      "id": "-NxExample1",
      "receiver": "게스트",
      "password": "1234",
      "doorId": 1,
      "from": "주인장",
      "content": "안녕하세요! 테스트 메시지입니다.",
      "createdAt": 1702800000000,
      "isRead": false,
      "hasReply": false
    }
  },
  "publicMessage": {
    "from": "Nayeon",
    "title": "To. My Dear Visitor",
    "content": "환영합니다..."
  }
}
\`\`\`

---

## 7. 테스트

1. 개발 서버 실행: `npm run dev`
2. 브라우저에서 `http://localhost:5173` 접속
3. "UNLOCK HIDDEN TRACK" 클릭
4. 수신자: `게스트`, 비밀번호: `1234` 입력
5. 메시지가 표시되면 성공! 🎉

---

## 8. 배포 (GitHub Pages)

### 8-1. 환경 변수 설정

**⚠️ 중요**: GitHub Pages는 빌드 시 환경 변수가 노출될 수 있습니다!

**해결 방법 1: GitHub Secrets 사용**

1. GitHub 저장소 > Settings > Secrets and variables > Actions
2. "New repository secret" 클릭
3. 각 환경 변수를 Secret으로 추가:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - 등등...

4. `.github/workflows/deploy.yml` 파일 수정:

\`\`\`yaml
env:
  VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
  VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
  # ... 나머지 환경 변수
\`\`\`

**해결 방법 2: Firebase App Check 사용 (권장)**

1. Firebase Console > App Check 활성화
2. reCAPTCHA 또는 App Attest 설정
3. 악의적인 접근 차단

### 8-2. 배포 실행

\`\`\`bash
npm run build
npm run deploy
\`\`\`

---

## 9. 문제 해결

### 에러: "Permission denied"
- Firebase Realtime Database 규칙 확인
- 읽기/쓰기 권한이 활성화되어 있는지 체크

### 에러: "Firebase: Firebase App named '[DEFAULT]' already exists"
- 브라우저 새로고침
- `firebase.ts` 파일이 중복 import되지 않았는지 확인

### 메시지가 표시되지 않음
- Firebase Console에서 데이터가 올바르게 저장되었는지 확인
- 브라우저 콘솔에서 에러 메시지 확인
- `.env` 파일의 환경 변수가 올바른지 확인

---

## 10. 추가 기능 (선택 사항)

### Firebase Authentication 추가
\`\`\`bash
npm install firebase
\`\`\`

### Firestore로 업그레이드
- Realtime Database보다 강력한 쿼리 지원
- 더 나은 확장성

### Cloud Functions로 서버 로직 추가
- 답장 알림 이메일 전송
- 비밀번호 해싱
- 관리자 대시보드

---

## 📚 참고 자료

- [Firebase 공식 문서](https://firebase.google.com/docs)
- [Realtime Database 가이드](https://firebase.google.com/docs/database)
- [Vite 환경 변수](https://vitejs.dev/guide/env-and-mode.html)

---

**완료! 🎉** Firebase 연동이 완료되었습니다!

문제가 있으면 언제든지 물어보세요! 😊
