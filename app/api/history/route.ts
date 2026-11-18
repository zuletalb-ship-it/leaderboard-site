
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { CURRENT_COMPETITION } from "../../competition";

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
    const { start, end } = CURRENT_COMPETITION;

    const history = await sql`
  SELECT
    competition_start,
    competition_end,
    players,
    prize_pool,
    finalized_at
  FROM leaderboard_history
  WHERE NOT (
    competition_start = ${start}
    AND competition_end <> ${end}
  )
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
