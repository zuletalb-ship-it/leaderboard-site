
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return NextResponse.json(
      { error: "Database is not configured" },
      { status: 500 }
    );
  }

  try {
    const sql = neon(databaseUrl);

    const history = await sql`
      SELECT
        competition_start,
        competition_end,
        players,
        prize_pool,
        finalized_at
      FROM leaderboard_history
      ORDER BY competition_end DESC
      LIMIT 12
    `;

    return NextResponse.json({ history });
  } catch (error) {
    console.error("Failed to load leaderboard history:", error);

    return NextResponse.json(
      { error: "Failed to load leaderboard history" },
      { status: 500 }
    );
  }
}
