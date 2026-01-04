// functions/api/open.ts
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
    throw new Response(JSON.stringify({ ok: false, error: "Too many requests", retryAfterSec }), {
      status: 429,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "retry-after": String(retryAfterSec),
      },
    });
  }

  hits.set(ip, cur);
}

type Env = { DB: any };

type OpenRequest = { password: string };
type OpenResponse =
  | { ok: true; content: string; reply: string | null; from: string }
  | { ok: false; error: string };

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  try {
    // D1 바인딩 체크
    if (!env.DB) {
      console.error("[open.ts] DB binding not found");
      return new Response(
        JSON.stringify({ ok: false, error: "Database not configured" }),
        { 
          status: 500,
          headers: { "content-type": "application/json; charset=utf-8" }
        }
      );
    }

    const ip = getClientIp(request);

    try {
      rateLimitOrThrow(ip);
    } catch (e) {
      if (e instanceof Response) return e;
      throw e;
    }

    let body: OpenRequest;
    try {
      body = (await request.json()) as OpenRequest;
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON body" } satisfies OpenResponse), {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    const pwHash = (body.password ?? "").trim(); // 테스트 단계: 평문 비교
    if (!pwHash) {
      return new Response(JSON.stringify({ ok: false, error: "Password is required" } satisfies OpenResponse), {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    let row: {
      content: string;
      reply: string | null;
      from_name: string;
      first_opened_at: string | null;
    } | null = null;

    try {
      row = (await env.DB
        .prepare("SELECT content, reply, from_name, first_opened_at FROM letters WHERE pw_hash = ?")
        .bind(pwHash)
        .first()) as typeof row;
    } catch (dbError) {
      console.error("[open.ts] DB query error:", dbError);
      return new Response(
        JSON.stringify({ ok: false, error: "Database query failed" }),
        { 
          status: 500,
          headers: { "content-type": "application/json; charset=utf-8" }
        }
      );
    }

    if (!row) {
      return new Response(JSON.stringify({ ok: false, error: "Not found" } satisfies OpenResponse), {
        status: 404,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    if (row.first_opened_at === null) {
      const now = new Date().toISOString();
      await env.DB
        .prepare("UPDATE letters SET first_opened_at = ? WHERE pw_hash = ?")
        .bind(now, pwHash)
        .run();
    }

    return new Response(
      JSON.stringify({ ok: true, content: row.content, reply: row.reply, from: row.from_name } satisfies OpenResponse),
      { headers: { "content-type": "application/json; charset=utf-8" } }
    );
  } catch (error) {
    console.error("[open.ts] Runtime error:", error);
    return new Response(
      JSON.stringify({ ok: false, error: "Internal server error" }),
      { 
        status: 500,
        headers: { "content-type": "application/json; charset=utf-8" }
      }
    );
  }
};
