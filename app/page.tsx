"use client";

import { motion } from "framer-motion";
import { Crown, Trophy, Timer, Zap } from "lucide-react";
import { useEffect, useState } from "react";
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

  const prizes = ["$1600", "$1000", "$700", "$400", "$300"];
  const podium = [players[1], players[0], players[2]].filter(Boolean);
  const rest = players.slice(3);

  return (
    <main className="min-h-screen bg-[#03030a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(147,51,234,0.35),_transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(88,28,135,0.22),_transparent_40%)]" />

      <section className="relative max-w-7xl mx-auto px-6 py-8">
        <nav className="flex items-center justify-between mb-16">
          <div className="text-3xl font-black tracking-tight">
            Zuleta<span className="text-purple-500">LB</span>
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
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/50 bg-purple-500/10 px-5 py-2 text-purple-300 font-bold tracking-widest mb-6">
            <Zap size={16} />
            MONTHLY COMPETITION
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
            PACKDRAW
            <br />
            <span className="text-purple-500 drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]">
              WAGER RACE
            </span>
          </h1>

          <p className="text-zinc-400 text-lg mt-6">
            Compete, wager, and climb to the top.
            <br />
            Big rewards for the biggest grinders.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <StatCard icon={<Trophy size={38} />} label="Prize Pool" value="$4000" />
          <StatCard icon={<Timer size={38} />} label="Ends In" value={timeLeft} />
          <StatCard icon={<Crown size={38} />} label="Top Prize" value="$1600" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10 items-end">
          {podium.map((player) => (
            <motion.div
              key={player.rank}
              whileHover={{ scale: 1.03 }}
              className={`rounded-3xl border bg-black/60 backdrop-blur p-8 text-center ${
                player.rank === 1
                  ? "md:-translate-y-6 border-yellow-400 shadow-[0_0_45px_rgba(250,204,21,0.25)]"
                  : player.rank === 2
                  ? "border-zinc-400/60"
                  : "border-orange-500/60"
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

              <p className="text-green-400 text-2xl font-black mt-3">
                ${(player.wagered || 0).toLocaleString()}
              </p>

              <div className="mt-5 rounded-xl border border-purple-500/40 py-3 font-bold tracking-widest">
                PRIZE: {prizes[player.rank - 1]}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-3xl border border-purple-500/40 bg-black/60 overflow-hidden mb-8 shadow-[0_0_40px_rgba(147,51,234,0.12)]">
          <div className="p-7 border-b border-zinc-800">
            <h2 className="text-3xl font-black tracking-wide">FULL LEADERBOARD</h2>
            <p className="text-zinc-500 mt-1">
              
            </p>
          </div>

          <table className="w-full">
            <thead className="bg-purple-950/30 text-zinc-300 text-sm tracking-widest">
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
                  className="border-t border-zinc-900 hover:bg-purple-500/10 transition"
                >
                  <td className="p-5 font-bold">#{player.rank}</td>
                  <td className="p-5 font-semibold">{player.name}</td>
                  <td className="p-5 text-green-400 font-black">
                    ${(player.wagered || 0).toLocaleString()}
                  </td>
                  <td className="p-5">
  {player.rank === 4 && (
    <span className="rounded-full border border-purple-500/40 px-3 py-1 text-sm font-bold text-purple-300">
      $400
    </span>
  )}

  {player.rank === 5 && (
    <span className="rounded-full border border-purple-500/40 px-3 py-1 text-sm font-bold text-purple-300">
      $300
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
    <div className="rounded-3xl border border-purple-500/30 bg-black/60 p-8 text-center">
      <Trophy className="mx-auto mb-4 text-purple-400" size={40} />
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
          className="rounded-3xl border border-purple-500/40 bg-black/60 overflow-hidden"
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
            <p className="text-purple-300 mt-1">
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

                <span className="text-green-400 font-black text-lg">
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

        <footer className="rounded-3xl border border-purple-500/30 bg-black/60 p-6 text-center text-zinc-300">
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
    <div className="rounded-3xl border border-purple-500/30 bg-black/60 p-7 backdrop-blur shadow-[0_0_30px_rgba(147,51,234,0.12)]">
      <div className="text-purple-400 mb-4">{icon}</div>
      <p className="text-zinc-400 uppercase tracking-widest font-bold">{label}</p>
      <h2 className="text-4xl font-black mt-2">{value}</h2>
    </div>
  );
}