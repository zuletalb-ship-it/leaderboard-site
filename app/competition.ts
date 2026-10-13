

export const CURRENT_COMPETITION = {
  start: "2026-10-11T00:00:00-07:00",
  end: "2026-11-11T00:00:00-08:00",
  prizePool: 10000,
  prizes: [4000, 2500, 1200, 800, 500, 300, 250, 200, 150, 100],
};


export function getCompetitionStart(now = new Date()) {
  const currentEnd = new Date(CURRENT_COMPETITION.end);

  // Keep the correct PackDraw API date format.
  if (now < currentEnd) {
    return "9-5-2026";
  }

  const pacificDate = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);

  const parts = Object.fromEntries(
    pacificDate.map((part) => [part.type, part.value])
  );

  let year = Number(parts.year);
  let month = Number(parts.month);
  const day = Number(parts.day);

  if (day < 11) {
    month -= 1;

    if (month === 0) {
      month = 12;
      year -= 1;
    }
  }

  return `${month}-11-${year}`;
}
