/**
 * POST /api/auth/login
 *
 * Proxies login to the Express backend.
 * Sets the auth token in an HttpOnly, Secure, SameSite=Strict cookie.
 * The raw token is NEVER returned to the client in the response body.
 *
 * Security:
 *  - CYBERSHIELD_SERVICE_KEY is only read server-side (no NEXT_PUBLIC_ prefix).
 *  - Cookie is HttpOnly → inaccessible to JS → XSS-safe.
 *  - SameSite=Strict → CSRF-safe.
 *  - Secure flag set in production automatically.
 */
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";
const IS_PROD = process.env.NODE_ENV === "production";

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.email || !body.password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  // Forward to Express backend (service key injected server-side only)
  let backendRes: Response;
  try {
    backendRes = await fetch(`${API_BASE}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CYBERSHIELD_SERVICE_KEY
          ? { "X-Service-Key": process.env.CYBERSHIELD_SERVICE_KEY }
          : {}),
      },
      body: JSON.stringify({ email: body.email, password: body.password }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { error: "Backend unreachable" },
      { status: 502 }
    );
  }

  if (!backendRes.ok) {
    const { error } = await backendRes.json().catch(() => ({
      error: "Authentication failed",
    }));
    return NextResponse.json({ error }, { status: backendRes.status });
  }

  const { token, expiresIn } = await backendRes.json();

  // Build response — never expose token in body
  const response = NextResponse.json({ ok: true }, { status: 200 });

  response.cookies.set({
    name: "cs_auth",
    value: token,
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "strict",
    path: "/",
    maxAge: expiresIn ?? 60 * 60 * 8, // 8 hours default
  });

  return response;
}
