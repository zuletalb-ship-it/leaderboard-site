export default function Home() {
  const players = [
    { rank: 1, name: "BigWins", wagered: "$12,500" },
    { rank: 2, name: "LuckyLeo", wagered: "$9,800" },
    { rank: 3, name: "SpinGod", wagered: "$7,400" },
    { rank: 4, name: "SlotsKing", wagered: "$5,100" },
    { rank: 5, name: "DiceMaster", wagered: "$4,300" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10">
          <h1 className="text-6xl font-bold mb-2">
            ZuletaLB Leaderboard
          </h1>

          <p className="text-zinc-400 text-lg">
            Weekly Wager Competition
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-zinc-400">Prize Pool</p>
              <h2 className="text-4xl font-bold">$5,000</h2>
            </div>

            <div className="text-right">
              <p className="text-zinc-400">Ends In</p>
              <h2 className="text-3xl font-bold">3D 12H</h2>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr className="text-left">
                <th className="p-5">Rank</th>
                <th className="p-5">Player</th>
                <th className="p-5">Wagered</th>
              </tr>
            </thead>

            <tbody>
              {players.map((player) => (
                <tr
                  key={player.rank}
                  className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                >
                  <td className="p-5 font-bold">
                    #{player.rank}
                  </td>

                  <td className="p-5">
                    {player.name}
                  </td>

                  <td className="p-5 text-green-400 font-semibold">
                    {player.wagered}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}