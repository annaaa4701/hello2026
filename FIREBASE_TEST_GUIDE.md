# 🧪 Firebase 연동 테스트 가이드

## 빠른 테스트 체크리스트

### ✅ 1단계: Firebase 설정 확인

**터미널에서:**
```bash
# .env 파일이 존재하는지 확인
ls .env
```

**브라우저 콘솔(F12)에서:**
```javascript
// Firebase 설정 확인 (window 객체에 자동으로 노출됨)
console.log(window.__firebaseConfig);
```

**예상 결과**: Firebase 설정 객체가 출력되어야 함 (projectId, apiKey 등)

---

### ✅ 2단계: 개발 서버 실행

```bash
npm run dev
```

**예상 결과**: 
- Vite 서버가 `http://localhost:5173`에서 실행
- 콘솔에 Firebase 관련 에러가 없어야 함

---

### ✅ 3단계: 초기 데이터 업로드

브라우저 개발자 도구(F12) > Console 탭에서:

```javascript
// 샘플 데이터 업로드 (window 객체에 자동으로 노출됨)
await window.uploadSampleData();
```

**예상 결과**: 
```
✅ Sample data uploaded successfully!
```

**Firebase Console 확인**:
1. Realtime Database > 데이터 탭
2. `messages` 노드가 생성되고 2개의 샘플 메시지가 있어야 함

---

### ✅ 4단계: 로그인 테스트

1. 앱에서 "UNLOCK HIDDEN TRACK" 클릭
2. 다음 정보 입력:
   - **수신자**: `게스트`
   - **비밀번호**: `1234`
3. "UNLOCK" 클릭

**예상 결과**:
- ✅ 로그인 성공 사운드
- ✅ 트랙이 깜빡이며 선택됨
- ✅ DAW 인터페이스가 열림
- ✅ TRACK 01에 메시지 표시

---

### ✅ 5단계: 읽음 상태 확인

**Firebase Console에서 확인**:
1. Realtime Database > 데이터
2. 해당 메시지의 `isRead` 필드가 `true`로 변경됨
3. `readAt` 필드에 타임스탬프 기록됨

---

### ✅ 6단계: 답장 테스트

1. DAW에서 TRACK 02에 답장 입력
2. 🔴 **REC** 버튼 클릭
3. 파형 애니메이션 확인 (2.5초)
4. "TRACK SAVED SUCCESSFULLY" 메시지 확인

**Firebase Console에서 확인**:
1. 해당 메시지에 `reply` 필드 추가됨
2. `repliedAt` 필드에 타임스탬프 기록됨
3. `hasReply` 필드가 `true`로 변경됨

---

## 🐛 문제 해결

### 문제 1: "Permission denied" 에러

**원인**: Firebase 보안 규칙이 너무 엄격함

**해결**:
1. Firebase Console > Realtime Database > 규칙
2. 다음 규칙 적용:

```json
{
  "rules": {
    "messages": {
      ".read": true,
      ".write": true
    },
    "publicMessage": {
      ".read": true,
      ".write": true
    }
  }
}
```

---

### 문제 2: "Firebase App not initialized" 에러

**원인**: 환경 변수가 제대로 로드되지 않음

**해결**:
1. `.env` 파일이 프로젝트 루트에 있는지 확인
2. 모든 `VITE_FIREBASE_*` 변수가 설정되었는지 확인
3. 개발 서버 재시작

```bash
# 서버 중지 (Ctrl+C)
# 서버 재시작
npm run dev
```

---

### 문제 3: 메시지를 찾을 수 없음

**원인**: Firebase에 데이터가 없거나 잘못된 수신자/비밀번호

**해결**:
1. Firebase Console에서 데이터 확인
2. 3단계 초기 데이터 업로드 재실행
3. 정확한 수신자명과 비밀번호 입력 확인

---

### 문제 4: 답장이 저장되지 않음

**원인**: `firebaseId`가 없거나 쓰기 권한 없음

**해결**:
1. 브라우저 콘솔에서 에러 메시지 확인
2. Firebase 규칙에서 `.write: true` 확인
3. `foundMessage.firebaseId` 존재 여부 확인

**디버깅 코드** (브라우저 콘솔):
```javascript
console.log('Found Message:', foundMessage);
console.log('Firebase ID:', foundMessage?.firebaseId);
```

---

## 📊 Firebase Console 모니터링

### 실시간 데이터 확인

Firebase Console > Realtime Database > 데이터 탭에서:

- 새 메시지가 추가되면 실시간으로 표시됨
- 답장이 저장되면 즉시 업데이트됨
- 읽음 상태 변경도 실시간 반영

### 사용량 확인

Firebase Console > Realtime Database > 사용량 탭에서:

- 읽기/쓰기 횟수 확인
- 저장 용량 확인
- 무료 플랜 한도 모니터링

---

## ✅ 모든 테스트 통과!

다음 체크리스트를 모두 완료하면 Firebase 연동이 성공한 것입니다:

- [ ] Firebase 프로젝트 생성 완료
- [ ] Realtime Database 활성화
- [ ] 환경 변수 설정 완료
- [ ] 샘플 데이터 업로드 성공
- [ ] 로그인 테스트 성공
- [ ] 메시지 읽기 성공
- [ ] 읽음 상태 업데이트 확인
- [ ] 답장 저장 테스트 성공
- [ ] Firebase Console에서 데이터 확인

**축하합니다! 🎉** Firebase 연동이 완료되었습니다!

---

## 🚀 다음 단계

1. **실제 메시지 추가**:
   - Firebase Console에서 직접 추가
   - 또는 `addMessage()` 함수 사용

2. **보안 규칙 강화**:
   - Firebase Authentication 추가
   - 읽기/쓰기 권한 세분화

3. **배포**:
   - GitHub Pages로 배포
   - 환경 변수를 GitHub Secrets에 추가

4. **모니터링**:
   - Firebase Analytics 활성화
   - 사용자 행동 분석
