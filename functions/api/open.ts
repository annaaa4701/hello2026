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
  console.log("[open.ts] ========== API REQUEST START ==========");
  console.log("[open.ts] Request URL:", request.url);
  console.log("[open.ts] Request method:", request.method);
  
  try {
    // D1 바인딩 체크
    console.log("[open.ts] Checking DB binding...");
    console.log("[open.ts] env.DB exists:", !!env.DB);
    console.log("[open.ts] env keys:", Object.keys(env));
    
    if (!env.DB) {
      console.error("[open.ts] ❌ DB binding not found!");
      return new Response(
        JSON.stringify({ ok: false, error: "Database not configured" }),
        { 
          status: 500,
          headers: { "content-type": "application/json; charset=utf-8" }
        }
      );
    }
    console.log("[open.ts] ✅ DB binding confirmed");

    const ip = getClientIp(request);
    console.log("[open.ts] Client IP:", ip);

    console.log("[open.ts] Checking rate limit...");
    try {
      rateLimitOrThrow(ip);
      console.log("[open.ts] ✅ Rate limit OK");
    } catch (e) {
      if (e instanceof Response) {
        console.log("[open.ts] ⚠️ Rate limit exceeded");
        return e;
      }
      throw e;
    }

    console.log("[open.ts] Parsing request body...");
    let body: OpenRequest;
    try {
      body = (await request.json()) as OpenRequest;
      console.log("[open.ts] ✅ JSON parsed successfully");
      console.log("[open.ts] Password length:", body.password?.length || 0);
    } catch (parseError) {
      console.error("[open.ts] ❌ JSON parse error:", parseError);
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON body" } satisfies OpenResponse), {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    const pwHash = (body.password ?? "").trim(); // 테스트 단계: 평문 비교
    console.log("[open.ts] Password hash:", pwHash ? "[REDACTED]" : "(empty)");
    
    if (!pwHash) {
      console.error("[open.ts] ❌ Password is empty");
      return new Response(JSON.stringify({ ok: false, error: "Password is required" } satisfies OpenResponse), {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    type RowType = {
      content: string;
      reply: string | null;
      from_name: string;
      first_opened_at: string | null;
    };

    let row: RowType | null = null;

    console.log("[open.ts] Executing DB query...");
    try {
      const stmt = env.DB.prepare("SELECT content, reply, from_name, first_opened_at FROM letters WHERE pw_hash = ?");
      console.log("[open.ts] Statement prepared");
      
      const boundStmt = stmt.bind(pwHash);
      console.log("[open.ts] Parameters bound");
      
      row = (await boundStmt.first()) as RowType | null;
      console.log("[open.ts] ✅ Query executed");
      console.log("[open.ts] Row found:", !!row);
      if (row) {
        console.log("[open.ts] Row data: content length=", row.content?.length, "from=", row.from_name, "has_reply=", !!row.reply);
      }
    } catch (dbError) {
      console.error("[open.ts] ❌ DB query error:", dbError);
      console.error("[open.ts] Error type:", typeof dbError);
      console.error("[open.ts] Error message:", (dbError as Error)?.message);
      console.error("[open.ts] Error stack:", (dbError as Error)?.stack);
      return new Response(
        JSON.stringify({ ok: false, error: "Database query failed" }),
        { 
          status: 500,
          headers: { "content-type": "application/json; charset=utf-8" }
        }
      );
    }

    if (!row) {
      console.log("[open.ts] ⚠️ No row found for password");
      return new Response(JSON.stringify({ ok: false, error: "Not found" } satisfies OpenResponse), {
        status: 404,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    console.log("[open.ts] Checking first_opened_at...");
    if (row.first_opened_at === null) {
      console.log("[open.ts] First time opening, updating timestamp...");
      const now = new Date().toISOString();
      try {
        await env.DB
          .prepare("UPDATE letters SET first_opened_at = ? WHERE pw_hash = ?")
          .bind(now, pwHash)
          .run();
        console.log("[open.ts] ✅ Timestamp updated");
      } catch (updateError) {
        console.error("[open.ts] ⚠️ Failed to update timestamp:", updateError);
      }
    } else {
      console.log("[open.ts] Already opened at:", row.first_opened_at);
    }

    console.log("[open.ts] ✅ Success! Returning letter data");
    console.log("[open.ts] ========== API REQUEST END ==========");
    return new Response(
      JSON.stringify({ ok: true, content: row.content, reply: row.reply, from: row.from_name } satisfies OpenResponse),
      { headers: { "content-type": "application/json; charset=utf-8" } }
    );
  } catch (error) {
    console.error("[open.ts] ❌ FATAL ERROR:", error);
    console.error("[open.ts] Error type:", typeof error);
    console.error("[open.ts] Error constructor:", (error as any)?.constructor?.name);
    console.error("[open.ts] Error message:", (error as Error)?.message);
    console.error("[open.ts] Error stack:", (error as Error)?.stack);
    console.log("[open.ts] ========== API REQUEST END (ERROR) ==========");
    return new Response(
      JSON.stringify({ ok: false, error: "Internal server error" }),
      { 
        status: 500,
        headers: { "content-type": "application/json; charset=utf-8" }
      }
    );
  }
};
