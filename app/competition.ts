export const CURRENT_COMPETITION = {
  start: "2026-10-11T00:00:00-07:00",
  end: "2026-11-14T00:00:00-08:00",
  prizePool: 10000,
  prizes: [4000, 2500, 1200, 800, 500, 300, 250, 200, 150, 100],
};

export function getCompetitionStart(now = new Date()) {
  const currentEnd = new Date(CURRENT_COMPETITION.end);

  // Keep the October 11 start date until this competition ends.
  if (now < currentEnd) {
    return "10-11-2026";
  }

  // Calculate future competition start dates using Pacific time.
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

  if (day < 14) {
    month -= 1;

    if (month === 0) {
      month = 12;
      year -= 1;
    }
  }

  return `${month}-14-${year}`;
}