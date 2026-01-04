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

type ReplyRequest = { password: string; reply: string };
type ReplyResponse = { ok: true } | { ok: false; error: string };

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  try {
    // D1 바인딩 체크
    if (!env.DB) {
      console.error("[reply.ts] DB binding not found");
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

    let body: ReplyRequest;
    try {
      body = (await request.json()) as ReplyRequest;
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON body" } satisfies ReplyResponse), {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    const pwHash = (body.password ?? "").trim();
    const reply = body.reply ?? "";

    if (!pwHash) {
      return new Response(JSON.stringify({ ok: false, error: "Password is required" } satisfies ReplyResponse), {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    // 존재 확인
    let exists: { id: number } | null = null;
    try {
      exists = (await env.DB
        .prepare("SELECT id FROM letters WHERE pw_hash = ?")
        .bind(pwHash)
        .first()) as typeof exists;
    } catch (dbError) {
      console.error("[reply.ts] DB query error:", dbError);
      return new Response(
        JSON.stringify({ ok: false, error: "Database query failed" }),
        { 
          status: 500,
          headers: { "content-type": "application/json; charset=utf-8" }
        }
      );
    }

    if (!exists) {
      return new Response(JSON.stringify({ ok: false, error: "Letter not found" } satisfies ReplyResponse), {
        status: 404,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    const now = new Date().toISOString();

    const result = await env.DB
      .prepare("UPDATE letters SET reply = ?, updated_at = ? WHERE pw_hash = ?")
      .bind(reply, now, pwHash)
      .run();

    if (!result.success) {
      return new Response(JSON.stringify({ ok: false, error: "Failed to update reply" } satisfies ReplyResponse), {
        status: 500,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    return new Response(JSON.stringify({ ok: true } satisfies ReplyResponse), {
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  } catch (error) {
    console.error("[reply.ts] Runtime error:", error);
    return new Response(
      JSON.stringify({ ok: false, error: "Internal server error" }),
      { 
        status: 500,
        headers: { "content-type": "application/json; charset=utf-8" }
      }
    );
  }
};
