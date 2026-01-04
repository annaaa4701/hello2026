-- D1 Database Schema for Letters
-- Run this in Cloudflare Dashboard or via wrangler d1 execute

CREATE TABLE IF NOT EXISTS letters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pw_hash TEXT NOT NULL UNIQUE,
  receiver_name TEXT NOT NULL,
  from_name TEXT NOT NULL,
  content TEXT NOT NULL,
  reply TEXT,
  created_at TEXT NOT NULL, -- ISO 8601 format: 2026-01-04T12:30:45Z
  updated_at TEXT,
  first_opened_at TEXT
);


-- Example data (for testing)
-- INSERT INTO letters (pw_hash, receiver_name, from_name, content, created_at)
-- VALUES ('1234', '홍길동', '김철수', '새해 복 많이 받으세요!', '2026-01-01T00:00:00Z');
