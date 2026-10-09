
import { NextResponse } from "next/server";
import { getCompetitionStart } from "../../competition";

export const runtime = "nodejs";

export async function GET() {
  const apiKey = process.env.PACKDRAW_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing PACKDRAW_API_KEY" },
      { status: 500 }
    );
  }

  try {
    const startDate = getCompetitionStart();

    const url = new URL(
      "https://packdraw.com/api/v1/affiliates/leaderboard"
    );

    url.searchParams.set("after", startDate);
    url.searchParams.set("apiKey", apiKey);

    const response = await fetch(url, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "PackDraw API error" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Leaderboard fetch failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch PackDraw leaderboard" },
      { status: 500 }
    );
  }
}
