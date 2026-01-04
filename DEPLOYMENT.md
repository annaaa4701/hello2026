# Cloudflare Pages + D1 배포 가이드

## 1. D1 데이터베이스 생성

```bash
# Wrangler CLI로 D1 데이터베이스 생성
npx wrangler d1 create letters-db
```

생성 후 출력되는 `database_id`를 복사하여 `wrangler.toml`의 `database_id` 필드에 입력하세요.

## 2. 스키마 적용

```bash
# schema.sql 파일로 테이블 생성
npx wrangler d1 execute letters-db --file=./schema.sql
```

## 3. 테스트 데이터 삽입

### 방법 1: Cloudflare Dashboard 사용
1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 접속
2. **Workers & Pages** → **D1** → `letters-db` 선택
3. **Console** 탭에서 SQL 직접 실행:

```sql
-- 테스트용 편지 추가 (비밀번호: test123)
INSERT INTO letters (pw_hash, receiver_name, from_name, content, created_at)
VALUES ('test123', '홍길동', '나연', '안녕하세요! 테스트 편지입니다. 새해 복 많이 받으세요!', strftime('%s', 'now') * 1000);
```

### 방법 2: Wrangler CLI 사용 (PowerShell)

```powershell
# Windows PowerShell에서 실행
npx wrangler d1 execute letters-db --command="INSERT INTO letters (pw_hash, receiver_name, from_name, content, created_at) VALUES ('test123', '테스트', '나연', '테스트 메시지입니다!', (Get-Date -UFormat %s) * 1000)"
```

## 4. GitHub에 푸시

```bash
git status
git add .
git commit -m "feat: migrate to Cloudflare Pages + D1"
git push origin main
```

## 5. Cloudflare Pages 설정

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 접속
2. **Workers & Pages** → **Pages** → **Create project**
3. **Connect to Git** 선택 후 GitHub 저장소 연결
4. 빌드 설정:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
5. **Environment variables** (필요 시):
   - 추가 환경 변수 없음 (D1 바인딩만 사용)

## 6. D1 바인딩 설정

1. 배포된 Pages 프로젝트 → **Settings** → **Functions**
2. **D1 database bindings** → **Add binding**
   - Variable name: `DB`
   - D1 database: `letters-db` 선택
3. 저장 후 재배포 (자동으로 진행됨)

## 7. API 테스트

### 편지 열람 테스트
```bash
# cURL로 테스트 (Git Bash 또는 WSL에서)
curl -X POST https://your-project.pages.dev/api/open \
  -H "Content-Type: application/json" \
  -d '{"password": "test123"}'

# PowerShell에서
Invoke-RestMethod -Uri "https://your-project.pages.dev/api/open" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"password": "test123"}'

# 예상 응답:
# {"ok": true, "content": "테스트 메시지입니다!", "reply": null, "from": "나연"}
```

### 답장 저장 테스트
```bash
# cURL로 테스트
curl -X POST https://your-project.pages.dev/api/reply \
  -H "Content-Type: application/json" \
  -d '{"password": "test123", "reply": "답장 감사합니다!"}'

# PowerShell에서
Invoke-RestMethod -Uri "https://your-project.pages.dev/api/reply" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"password": "test123", "reply": "답장 감사합니다!"}'

# 예상 응답:
# {"ok": true}
```

### 브라우저에서 테스트
1. 프론트엔드 UI에서 비밀번호 입력란에 `test123` 입력
2. "편지 열람" 버튼 클릭
3. 테스트 편지 내용이 표시되는지 확인
4. 답장 작성 후 저장
5. 다시 열람하여 답장이 저장되었는지 확인

## 8. 로컬 개발 (선택사항)

```bash
# Wrangler로 로컬 D1과 Pages 함께 실행
npx wrangler pages dev dist --binding DB=letters-db --d1=letters-db

# 또는 Vite 개발 서버 사용 (API는 프록시 필요)
npm run dev
```

## 문제 해결

### 429 Too Many Requests
- IP당 10회/분 제한이 적용됨
- Response header `retry-after`에 표시된 시간(초) 후 재시도

### 404 Not found
- 비밀번호가 일치하는 편지가 없음
- D1 데이터베이스에 데이터가 있는지 확인:
  ```bash
  npx wrangler d1 execute letters-db --command="SELECT * FROM letters"
  ```

### 400 Invalid JSON body
- 요청 body가 올바른 JSON 형식인지 확인
- Content-Type 헤더가 `application/json`인지 확인

### D1 바인딩 오류
- `wrangler.toml`의 `database_id`가 정확한지 확인
- Cloudflare Dashboard에서 D1 바인딩이 `DB`로 설정되었는지 확인
- Functions 재배포 필요 (Dashboard에서 "Retry deployment")

## 다음 단계

현재는 비밀번호를 평문으로 저장하고 있습니다. 보안 강화를 위해:

1. **비밀번호 해싱** - Web Crypto API (PBKDF2) 사용
2. **R2 연동** - 음악/이미지 파일을 R2에 저장
3. **관리자 대시보드** - 편지 생성/관리 UI 추가
