import { NextResponse } from "next/server";

const API_URL =
  process.env.LEADERBOARD_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8003";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: Request, context: RouteContext) {
  const { id } = await context.params;
  const { searchParams } = new URL(req.url);
  const upstreamUrl = `${API_URL}/events/${encodeURIComponent(
    id
  )}/leaderboard?${searchParams.toString()}`;

  try {
    const res = await fetch(upstreamUrl, { cache: "no-store" });
    const data = await res.json();

    return NextResponse.json(data, {
      status: res.status,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch {
    return NextResponse.json(
      { general: "Could not load mapathon leaderboard data" },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}
