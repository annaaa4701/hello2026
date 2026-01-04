-- D1 Database Schema for Letters
-- Run this in Cloudflare Dashboard or via wrangler d1 execute

CREATE TABLE IF NOT EXISTS letters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pw_hash TEXT NOT NULL UNIQUE,
  receiver_name TEXT NOT NULL,
  from_name TEXT NOT NULL,
  content TEXT NOT NULL,
  reply TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER,
  first_opened_at INTEGER
);

-- Example data (for testing)
-- INSERT INTO letters (pw_hash, receiver_name, from_name, content, created_at)
-- VALUES ('1234', '홍길동', '김철수', '새해 복 많이 받으세요!', 1735689600000);
