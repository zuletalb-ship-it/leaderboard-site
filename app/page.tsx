"use client";

import { motion } from "framer-motion";
import { Crown, Trophy, Timer, Flame } from "lucide-react";

export default function Home() {
  const players = [
    { rank: 1, name: "BigWins", wagered: 12500, prize: "$2,500" },
    { rank: 2, name: "LuckyLeo", wagered: 9800, prize: "$1,500" },
    { rank: 3, name: "SpinGod", wagered: 7400, prize: "$1,000" },
    { rank: 4, name: "SlotsKing", wagered: 5100, prize: "-" },
    { rank: 5, name: "DiceMaster", wagered: 4300, prize: "-" },
    { rank: 6, name: "RTPHunter", wagered: 3900, prize: "-" },
  ];

  const topThree = players.slice(0, 3);
  const rest = players.slice(3);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(147,51,234,0.35),_transparent_35%)]" />

      <section className="relative max-w-6xl mx-auto px-6 py-10">
        <nav className="flex items-center justify-between mb-16">
          <div className="text-2xl font-black tracking-widest">ZULETALB</div>
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            LIVE WAGER RACE
          </div>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 text-purple-300 mb-6">
            <Flame size={16} />
            Weekly Competition
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-5">
            ZULETALB WAGER RACE
          </h1>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Climb the leaderboard, secure your spot, and compete for weekly prizes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <StatCard icon={<Trophy />} label="Prize Pool" value="$5,000" />
          <StatCard icon={<Timer />} label="Ends In" value="3D 12H" />
          <StatCard icon={<Crown />} label="Top Prize" value="$2,500" />
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {topThree.map((player) => (
            <motion.div
              key={player.rank}
              whileHover={{ scale: 1.03 }}
              className={`rounded-3xl border p-6 bg-zinc-950/80 backdrop-blur ${
                player.rank === 1
                  ? "border-yellow-400/60 shadow-[0_0_35px_rgba(250,204,21,0.18)]"
                  : player.rank === 2
                  ? "border-zinc-300/40"
                  : "border-orange-400/40"
              }`}
            >
              <div className="text-4xl mb-4">
                {player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : "🥉"}
              </div>
              <p className="text-zinc-400">Rank #{player.rank}</p>
              <h2 className="text-3xl font-bold mt-1">{player.name}</h2>
              <p className="text-green-400 text-2xl font-bold mt-4">
                ${player.wagered.toLocaleString()}
              </p>
              <p className="text-zinc-500 mt-1">Prize: {player.prize}</p>
            </motion.div>
          ))}
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 overflow-hidden mb-10">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-2xl font-bold">Full Leaderboard</h2>
            <p className="text-zinc-500 text-sm">Updated automatically once API is connected.</p>
          </div>

          <table className="w-full">
            <thead className="bg-zinc-900 text-zinc-400">
              <tr className="text-left">
                <th className="p-5">Rank</th>
                <th className="p-5">Player</th>
                <th className="p-5">Wagered</th>
                <th className="p-5">Prize</th>
              </tr>
            </thead>

            <tbody>
              {rest.map((player) => (
                <tr key={player.rank} className="border-t border-zinc-800 hover:bg-purple-500/5">
                  <td className="p-5 font-bold">#{player.rank}</td>
                  <td className="p-5">{player.name}</td>
                  <td className="p-5 text-green-400 font-semibold">
                    ${player.wagered.toLocaleString()}
                  </td>
                  <td className="p-5 text-zinc-400">{player.prize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-3xl border border-purple-500/30 bg-purple-500/10 p-6 text-center">
          <p className="text-zinc-300">
            18+ only. Please gamble responsibly. Terms and conditions apply.
          </p>
        </div>
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
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur">
      <div className="text-purple-400 mb-3">{icon}</div>
      <p className="text-zinc-500">{label}</p>
      <h2 className="text-3xl font-black mt-1">{value}</h2>
    </div>
  );
}