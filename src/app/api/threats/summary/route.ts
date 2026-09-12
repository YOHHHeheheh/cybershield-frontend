/**
 * GET /api/threats/summary
 *
 * Proxy: fetches live threat data from Express backend.
 * Injects secret service key server-side — never exposed to the browser.
 * Passes user's auth cookie as a Bearer token to the backend.
 */
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("cs_auth")?.value;

  try {
    const backendRes = await fetch(`${API_BASE}/api/v1/threats/summary`, {
      headers: {
        Accept: "application/json",
        ...(process.env.CYBERSHIELD_SERVICE_KEY
          ? { "X-Service-Key": process.env.CYBERSHIELD_SERVICE_KEY }
          : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch threat data" },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Backend unreachable" }, { status: 502 });
  }
}
