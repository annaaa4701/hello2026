-- D1 Database Schema for Letters
-- Run this in Cloudflare Dashboard or via wrangler d1 execute

CREATE TABLE IF NOT EXISTS letters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pw_hash TEXT NOT NULL UNIQUE,
  receiver_name TEXT NOT NULL,
  from_name TEXT NOT NULL,
  content TEXT NOT NULL,
  reply TEXT,
  has_replied INTEGER DEFAULT 0, -- 0 = false, 1 = true (Boolean)
  created_at TEXT NOT NULL, -- ISO 8601 format: 2026-01-04T12:30:45Z
  updated_at TEXT,
  first_opened_at TEXT
);


-- Example data (for testing)
-- 1. 답장 안 한 편지
-- INSERT INTO letters (pw_hash, receiver_name, from_name, content, has_replied, created_at)
-- VALUES ('1234', '홍길동', '김철수', '새해 복 많이 받으세요!', 0, '2026-01-01T00:00:00Z');

-- 2. 답장 완료한 편지
-- INSERT INTO letters (pw_hash, receiver_name, from_name, content, reply, has_replied, created_at, updated_at)
-- VALUES ('5678', '이영희', '박민수', '올해도 건강하세요~', '고마워요! 너도~', 1, '2026-01-01T00:00:00Z', '2026-01-02T15:30:00Z');
