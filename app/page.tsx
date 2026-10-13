"use client";
import { Marcellus, Urbanist } from "next/font/google";
import { motion } from "framer-motion";
import { Crown, Trophy, Timer, Zap } from "lucide-react";
import { useEffect, useState } from "react";
const luxuryFont = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const brandFont = Urbanist({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});
export default function Home() {
  const [players, setPlayers] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
const [timeLeft, setTimeLeft] = useState("");

useEffect(() => {
  function updateCountdown() {
    const now = new Date();

    
const pacificParts = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  year: "numeric",
  month: "numeric",
  day: "numeric",
}).formatToParts(now);

const parts = Object.fromEntries(
  pacificParts.map((part) => [part.type, part.value])
);

let year = Number(parts.year);
let month = Number(parts.month);

if (Number(parts.day) >= 11) {
  month++;

  if (month > 12) {
    month = 1;
    year++;
  }
}


const getPacificOffset = (year: number, month: number) => {
  const secondSundayInMarch =
    8 + ((7 - new Date(Date.UTC(year, 2, 1)).getUTCDay()) % 7);

  const firstSundayInNovember =
    1 + ((7 - new Date(Date.UTC(year, 10, 1)).getUTCDay()) % 7);

  const isDaylightSaving =
    month > 3 && month < 11
      ? true
      : month === 3
        ? 11 >= secondSundayInMarch
        : month === 11
          ? 11 < firstSundayInNovember
          : false;

  return isDaylightSaving ? "-07:00" : "-08:00";
};

const offset = getPacificOffset(year, month);

const nextEnd = new Date(
  `${year}-${String(month).padStart(2, "0")}-11T00:00:00${offset}`
);



    const difference = nextEnd.getTime() - now.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setTimeLeft(`${days}D ${hours}H ${minutes}M ${seconds}S`);
  }

  updateCountdown();

  const timer = setInterval(updateCountdown, 1000);

  return () => clearInterval(timer);
}, []);
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();

        const formatted = data.leaderboard
          .sort((a: any, b: any) => b.wagerAmount - a.wagerAmount)
          .map((player: any, index: number) => ({
            rank: index + 1,
            name: player.username,
            wagered: player.wagerAmount,
            deposited: player.deposited,
            avatar: player.avatar,
          }));

        setPlayers(formatted);
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      }
    }

    fetchLeaderboard();

    const interval = setInterval(fetchLeaderboard, 30000);

    return () => clearInterval(interval);
  }, []);
 
useEffect(() => {
  async function fetchHistory() {
    try {
      const response = await fetch("/api/history");

      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }

      const data = await response.json();
      setHistory(data.history || []);
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  }

  fetchHistory();
}, []);

  const prizes = [
  "$4,000",
  "$2,500",
  "$1,200",
  "$800",
  "$500",
  "$300",
  "$250",
  "$200",
  "$150",
  "$100",
];
  const podium = [players[1], players[0], players[2]].filter(Boolean);
  const rest = players.slice(3);

  return (
    
<main className="relative isolate min-h-screen overflow-hidden bg-[#080807] text-[#F5F0E6]">
  <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,83,0.19),transparent_48%)]" />
  <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_55%,rgba(145,105,36,0.09),transparent_42%)]" />
  <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 bg-[linear-gradient(120deg,transparent_0%,rgba(220,180,95,0.025)_50%,transparent_100%)]" />


      <section className="relative max-w-7xl mx-auto px-6 py-8">
        <nav className="flex items-center justify-between mb-16">
          <div className="text-3xl font-black tracking-tight">
            Zuleta<span className="text-[#D4AF37]">LB</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-black/50 px-5 py-3 text-sm font-bold">
            <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            LIVE WAGER RACE
          </div>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-5 py-2 text-[#F5D78E] font-bold tracking-widest mb-6 shadow-[0_0_25px_rgba(212,175,55,0.12)]">
            <Zap size={16} />
            MONTHLY COMPETITION
          </div>

         <h1 className={`${luxuryFont.className} font-normal leading-tight`}>
  <span className="flex items-center justify-center gap-3 md:gap-5">
  <img
    src="/pdlogo.svg"
    alt="PackDraw logo"
    className="h-12 w-12 md:h-20 md:w-20 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]"
  />
  <span className={`${brandFont.className} text-5xl md:text-7xl font-black tracking-tight text-[#F5F0E6]`}>
  PackDraw
</span>
</span>

  <motion.span
    className="mt-3 inline-block text-5xl md:text-8xl tracking-[0.01em] bg-gradient-to-r from-[#9B742E] via-[#FFE7A3] to-[#C69A43] bg-clip-text text-transparent"
    animate={{
      filter: [
        "drop-shadow(0 0 8px rgba(212,175,55,0.15))",
        "drop-shadow(0 0 25px rgba(212,175,55,0.5))",
        "drop-shadow(0 0 8px rgba(212,175,55,0.15))",
      ],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    WAGER RACE
  </motion.span>
</h1>

          <p className="text-zinc-400 text-lg mt-6">
            Compete, wager, and climb to the top.
            <br />
            Big rewards for the biggest grinders.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <StatCard icon={<Trophy size={38} />} label="Prize Pool" value="$10,000" />
          <StatCard icon={<Timer size={38} />} label="Ends In" value={timeLeft} />
          <StatCard icon={<Crown size={38} />} label="Top Prize" value="$4,000" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10 items-end">
          {podium.map((player) => (
           <motion.div
  key={player.rank}
  initial={{ opacity: 0, y: 45, scale: 0.94 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{
    duration: 0.65,
    delay: player.rank === 1 ? 0.15 : player.rank === 2 ? 0.3 : 0.45,
    ease: "easeOut",
  }}
  whileHover={{
    scale: 1.035,
    boxShadow:
      player.rank === 1
        ? "0 0 65px rgba(212,175,55,0.35)"
        : "0 0 35px rgba(212,175,55,0.12)",
  }}
             className={`relative overflow-hidden rounded-3xl border p-8 text-center backdrop-blur-xl ${
  player.rank === 1
    ? "border-[#D4AF37]/70 bg-gradient-to-b from-[#352911] via-[#17130C] to-[#090909] shadow-[0_0_55px_rgba(212,175,55,0.22)]"
    : player.rank === 2
    ? "border-[#B8BEC8]/50 bg-gradient-to-b from-[#25282E] via-[#131417] to-[#090909] shadow-[0_0_30px_rgba(184,190,200,0.10)]"
    : "border-[#B77B4B]/50 bg-gradient-to-b from-[#302015] via-[#17110D] to-[#090909] shadow-[0_0_30px_rgba(183,123,75,0.10)]"
}`}
            >
              <div className="text-7xl mb-4">
                {player.rank === 1 ? "👑" : player.rank === 2 ? "🥈" : "🥉"}
              </div>

              <div
                className={`text-7xl font-black ${
                  player.rank === 1
                    ? "text-yellow-300"
                    : player.rank === 2
                    ? "text-zinc-300"
                    : "text-orange-400"
                }`}
              >
                {player.rank}
              </div>

              <h2 className="text-3xl font-black mt-4">{player.name}</h2>

              <p
  className={`text-2xl font-black mt-3 ${
    player.rank === 1
      ? "text-[#F5D78E] drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]"
      : player.rank === 2
      ? "text-[#D8DEE8]"
      : "text-[#E5AE80]"
  }`}
>
  ${(player.wagered || 0).toLocaleString()}
</p>

              <motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.25 }}
  className={`mt-5 rounded-xl border px-4 py-3 font-black tracking-widest ${
    player.rank === 1
      ? "border-[#D4AF37]/70 bg-[#D4AF37]/15 text-[#F5D78E] shadow-[0_0_25px_rgba(212,175,55,0.18)]"
      : player.rank === 2
      ? "border-[#B8BEC8]/50 bg-[#B8BEC8]/10 text-[#E2E5EA]"
      : "border-[#B77B4B]/50 bg-[#B77B4B]/10 text-[#E5AE80]"
  }`}
>
  PRIZE: {prizes[player.rank - 1]}
</motion.div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-3xl border border-[#C9A45C]/40 bg-gradient-to-b from-[#17140E] to-[#090909] overflow-hidden mb-8 shadow-[0_0_45px_rgba(201,164,92,0.12)]">
          <div className="p-7 border-b border-zinc-800">
            <h2 className="text-3xl font-black tracking-wide">FULL LEADERBOARD</h2>
            <p className="text-zinc-500 mt-1">
              
            </p>
          </div>

          <table className="w-full">
            <thead className="bg-[#C9A45C]/10 text-[#E5C98B] text-sm tracking-widest">
              <tr className="text-left">
                <th className="p-5">RANK</th>
                <th className="p-5">PLAYER</th>
                <th className="p-5">WAGERED</th>
                <th className="p-5">PRIZE</th>
              </tr>
            </thead>

            <tbody>
              {rest.map((player) => (
                <tr
                  key={player.rank}
                  className="border-t border-[#C9A45C]/10 hover:bg-[#C9A45C]/10 transition-colors duration-300"
                >
                  <td className="p-5 font-bold">#{player.rank}</td>
                  <td className="p-5 font-semibold">{player.name}</td>
                  <td className="p-5 text-[#E8C878] font-black">
                    ${(player.wagered || 0).toLocaleString()}
                  </td>
                  
<td className="p-5">
  {player.rank <= 10 && (
    <span className="rounded-full border border-[#C9A45C]/40 bg-[#C9A45C]/10 px-3 py-1 text-sm font-bold text-[#F5D78E]">
      {prizes[player.rank - 1]}
    </span>
  )}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

<section className="mb-10">
  <div className="mb-6">
    <h2 className="text-3xl font-black tracking-wide flex items-center gap-3">
      <Trophy className="text-yellow-400" size={30} />
      PREVIOUS WINNERS
    </h2>
    <p className="text-zinc-400 mt-2">
      Past PackDraw competitions and their top five winners.
    </p>
  </div>

  {history.length === 0 ? (
    <div className="rounded-3xl border border-[#C9A45C]/30 bg-black/60 p-8 text-center">
      <Trophy className="mx-auto mb-4 text-[#E8C878]" size={40} />
      <p className="text-xl font-bold">No completed competitions yet</p>
      <p className="text-zinc-400 mt-2">
        Previous winners will appear here after the current competition ends.
      </p>
    </div>
  ) : (
    <div className="space-y-6">
      {history.map((competition: any) => (
        <div
          key={competition.competition_start}
          className="rounded-3xl border border-[#C9A45C]/40 bg-gradient-to-br from-[#201A10]/80 via-[#11100D]/90 to-black overflow-hidden shadow-[0_0_35px_rgba(212,175,55,0.10)]"
        >
          <div className="p-6 border-b border-zinc-800">
            <h3 className="text-xl font-black">
              Competition ending{" "}
              {new Date(competition.competition_end).toLocaleDateString(
                "en-US",
                {
                  timeZone: "America/Los_Angeles",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </h3>
            <p className="text-[#E8C878] mt-1">
              ${Number(competition.prize_pool).toLocaleString()} Prize Pool
            </p>
          </div>

          <div className="divide-y divide-zinc-800">
            {competition.players.map((player: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div>
                  <p className="font-black text-lg">
                    #{player.rank} {player.username}
                  </p>
                  <p className="text-zinc-400 text-sm">
                    ${Number(player.wagerAmount).toLocaleString()} wagered
                  </p>
                </div>

                <span className="text-[#F5D78E] font-black text-lg">
                  ${Number(player.prize).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )}
</section>

        <footer className="rounded-3xl border border-[#C9A45C]/30 bg-gradient-to-r from-[#15120C]/80 via-[#0B0A08] to-[#15120C]/80 p-6 text-center text-zinc-300 shadow-[0_0_25px_rgba(212,175,55,0.08)]">
          18+ only. Please gamble responsibly.
        </footer>
      </section>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  
return (
  <motion.div
    whileHover={{
      y: -6,
      scale: 1.02,
      boxShadow: "0 0 45px rgba(212,175,55,0.22)",
    }}
    transition={{ duration: 0.3 }}
    className="group relative overflow-hidden rounded-3xl border border-[#C9A45C]/40 bg-gradient-to-br from-[#201A10]/90 via-[#11100D]/95 to-black p-7 backdrop-blur-xl shadow-[0_0_30px_rgba(201,164,92,0.10)]"
  >
    <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#D4AF37]/10 blur-3xl transition-all duration-500 group-hover:bg-[#D4AF37]/20" />

    <div className="relative">
      <div className="mb-4 text-[#D4AF37]">{icon}</div>

      <p className="text-[#B9A77D] uppercase tracking-[0.2em] text-sm font-bold">
        {label}
      </p>

      <h2 className="mt-3 text-4xl font-black tracking-tight text-[#F5D78E] drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]">
        {value}
      </h2>
    </div>
  </motion.div>
);

}