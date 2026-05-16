import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.LUXDROP_API_KEY;
  const affiliateCode = "Zuleta";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing LUXDROP_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  try {
    const url = `https://api.luxdrop.com/external/affiliates?codes=${affiliateCode}`;

    const response = await fetch(url, {
  headers: {
    "x-api-key": apiKey,
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json",
  },
      cache: "no-store",
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "LuxDrop API returned an error",
          status: response.status,
          details: text,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch LuxDrop API",
        details: String(error),
      },
      { status: 500 }
    );
  }
}