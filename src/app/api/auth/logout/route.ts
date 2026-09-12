/**
 * POST /api/auth/logout
 *
 * Clears the HttpOnly auth cookie.
 * Optionally notifies the Express backend to invalidate the session/token.
 */
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("cs_auth")?.value;

  // Best-effort: notify backend to invalidate token (e.g. token blacklist / refresh revocation)
  if (token) {
    try {
      await fetch(`${API_BASE}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          ...(process.env.CYBERSHIELD_SERVICE_KEY
            ? { "X-Service-Key": process.env.CYBERSHIELD_SERVICE_KEY }
            : {}),
        },
        cache: "no-store",
      });
    } catch {
      // Non-fatal — we still clear the cookie locally
    }
  }

  const response = NextResponse.json({ ok: true }, { status: 200 });

  // Clear the auth cookie
  response.cookies.set({
    name: "cs_auth",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}
