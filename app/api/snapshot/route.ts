
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const databaseUrl = process.env.DATABASE_URL;
  const apiKey = process.env.PACKDRAW_API_KEY;
  const snapshotSecret = process.env.SNAPSHOT_SECRET;

  if (!databaseUrl || !apiKey || !snapshotSecret) {
    return NextResponse.json(
      { error: "Missing server configuration" },
      { status: 500 }
    );
  }

  if (
    request.headers.get("authorization") !==
    `Bearer ${snapshotSecret}`
  ) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const sql = neon(databaseUrl);

    const start = "2026-10-11T00:00:00-07:00";
const end = "2026-11-11T00:00:00-08:00";

if (Date.now() >= new Date(end).getTime()) {
  return NextResponse.json(
    {
      error: "Competition has ended. Snapshot not saved.",
    },
    { status: 409 }
  );
}

    const url = new URL(
      "https://packdraw.com/api/v1/affiliates/leaderboard"
    );
    url.searchParams.set("after", "10-11-2026");
    url.searchParams.set("apiKey", apiKey);

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`PackDraw API returned ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.leaderboard)) {
      throw new Error("Invalid leaderboard response");
    }

    const players = [...data.leaderboard].sort(
      (a, b) => Number(b.wagerAmount) - Number(a.wagerAmount)
    );

    await sql`
      INSERT INTO leaderboard_snapshots
        (competition_start, competition_end, players)
      VALUES
        (${start}, ${end}, ${JSON.stringify(players)}::jsonb)
    `;

    return NextResponse.json({
      success: true,
      playersSaved: players.length,
      message: "Snapshot saved successfully",
    });
  } catch (error) {
    console.error("Snapshot failed:", error);

    return NextResponse.json(
      { error: "Failed to save snapshot" },
      { status: 500 }
    );
  }
}
