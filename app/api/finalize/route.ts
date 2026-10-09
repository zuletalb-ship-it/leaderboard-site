
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { CURRENT_COMPETITION } from "../../competition";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const databaseUrl = process.env.DATABASE_URL;
  const secret = process.env.SNAPSHOT_SECRET;

  if (!databaseUrl || !secret) {
    return NextResponse.json(
      { error: "Missing server configuration" },
      { status: 500 }
    );
  }

  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { start, end, prizePool, prizes } = CURRENT_COMPETITION;

  if (Date.now() < new Date(end).getTime()) {
    return NextResponse.json(
      { error: "Competition has not ended yet" },
      { status: 409 }
    );
  }

  try {
    const sql = neon(databaseUrl);

    const snapshots = await sql`
      SELECT players, captured_at
      FROM leaderboard_snapshots
      WHERE competition_start = ${start}
        AND competition_end = ${end}
        AND captured_at <= ${end}
      ORDER BY captured_at DESC
      LIMIT 1
    `;

    if (snapshots.length === 0) {
      return NextResponse.json(
        { error: "No snapshot captured before the deadline" },
        { status: 404 }
      );
    }

    const players = snapshots[0].players as Array<{
      wagerAmount: number | string;
      [key: string]: unknown;
    }>;

    const winners = [...players]
      .sort(
        (a, b) =>
          Number(b.wagerAmount) - Number(a.wagerAmount)
      )
      .slice(0, 5)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
        prize: prizes[index],
      }));

    const result = await sql`
      INSERT INTO leaderboard_history
        (competition_start, competition_end, players, prize_pool)
      VALUES
        (${start}, ${end}, ${JSON.stringify(winners)}::jsonb, ${prizePool})
      ON CONFLICT (competition_start) DO NOTHING
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      finalized: result.length > 0,
      winnersSaved: result.length > 0 ? winners.length : 0,
      snapshotCapturedAt: snapshots[0].captured_at,
      message:
        result.length > 0
          ? "Competition finalized successfully"
          : "Competition was already finalized",
    });
  } catch (error) {
    console.error("Finalization failed:", error);

    return NextResponse.json(
      { error: "Failed to finalize competition" },
      { status: 500 }
    );
  }
}

