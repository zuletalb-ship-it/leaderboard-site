
export const CURRENT_COMPETITION = {
  start: "2026-09-05T00:00:00-07:00",
  end: "2026-10-11T00:00:00-07:00",
  prizePool: 4000,
  prizes: [1600, 1000, 700, 400, 300],
};

export function getCompetitionStart(now = new Date()) {
  const currentEnd = new Date(CURRENT_COMPETITION.end);

  if (now < currentEnd) {
    return CURRENT_COMPETITION.start;
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
