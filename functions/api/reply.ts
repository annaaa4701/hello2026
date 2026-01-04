// functions/api/reply.ts
type Hit = { count: number; windowStart: number };
const hits = new Map<string, Hit>();

const LIMIT = 10;
const WINDOW_MS = 60_000;

function getClientIp(request: Request) {
  return request.headers.get("CF-Connecting-IP") || "unknown";
}

function rateLimitOrThrow(ip: string) {
  const now = Date.now();
  const cur = hits.get(ip);

  if (!cur || now - cur.windowStart >= WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return;
  }

  cur.count += 1;
  if (cur.count > LIMIT) {
    const retryAfterSec = Math.ceil((WINDOW_MS - (now - cur.windowStart)) / 1000);
    throw new Response(
      JSON.stringify({ ok: false, error: "Too many requests", retryAfterSec }),
      {
        status: 429,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "retry-after": String(retryAfterSec),
        },
      }
    );
  }
  hits.set(ip, cur);
}

type Env = {
  DB: any; // Cloudflare D1 database binding
};

type ReplyRequest = {
  password: string;
  reply: string;
};

type ReplyResponse =
  | { ok: true }
  | { ok: false; error: string };

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;
  const ip = getClientIp(request);

  try {
    rateLimitOrThrow(ip);
  } catch (e) {
    if (e instanceof Response) return e;
    throw e;
  }

  let body: ReplyRequest;
  try {
    body = (await request.json()) as ReplyRequest;
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "Invalid JSON body" } satisfies ReplyResponse),
      {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      }
    );
  }

  const { password, reply } = body;
  if (!password || typeof password !== "string") {
    return new Response(
      JSON.stringify({ ok: false, error: "Password is required" } satisfies ReplyResponse),
      {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      }
    );
  }

  // TODO: password → 해시 계산 (Web Crypto API로 PBKDF2 등 사용)
  const pwHash = password; // 임시로 평문 사용

  // 먼저 이 비밀번호에 해당하는 편지가 있는지 확인
  const selectStmt = env.DB
    .prepare("SELECT id FROM letters WHERE pw_hash = ?")
    .bind(pwHash);

  const row = (await selectStmt.first()) as { id: number } | null;

  if (!row) {
    return new Response(
      JSON.stringify({ ok: false, error: "Letter not found" } satisfies ReplyResponse),
      {
        status: 404,
        headers: { "content-type": "application/json; charset=utf-8" },
      }
    );
  }

  const now = Date.now();

  // 답장 업데이트
  const updateStmt = env.DB
    .prepare("UPDATE letters SET reply = ?, updated_at = ? WHERE pw_hash = ?")
    .bind(reply, now, pwHash);

  const result = await updateStmt.run();

  if (!result.success) {
    return new Response(
      JSON.stringify({ ok: false, error: "Failed to update reply" } satisfies ReplyResponse),
      {
        status: 500,
        headers: { "content-type": "application/json; charset=utf-8" },
      }
    );
  }

  return new Response(JSON.stringify({ ok: true } satisfies ReplyResponse), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
};
