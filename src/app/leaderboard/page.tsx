import { dummyLeaderboard } from "@/data/leaderboard";
import { Medal } from "lucide-react";

const medalColors: Record<number, string> = {
    1: "text-yellow-500",
    2: "text-gray-300",
    3: "text-amber-600",
};

export default function LeaderboardPage() {
    const sorted = [...dummyLeaderboard].sort((a, b) => b.wins - a.wins).reverse();

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-display font-bold text-center">Leaderboard</h1>

            <ul className="space-y-3 mt-3">
                {sorted.map((player, index) => {
                    const rank = index + 1;
                    const isTopThree = rank <= 3;
                    const medalColor = medalColors[rank] ?? "";
                    const bg = isTopThree ? "bg-gray-900 border border-gray-700" : "bg-gray-800";

                    return (
                        <li
                            key={player.id}
                            className={`p-3 rounded-xl ${bg}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-lg text-white">{rank}.</span>
                                    <span className="font-semibold text-white">{player.name}</span>
                                    {isTopThree && (
                                        <Medal className={`w-4 h-4 ${medalColor}`} strokeWidth={2} />
                                    )}
                                </div>
                                <div className="text-right text-sm">
                                    <div className="font-bold text-white">{player.wins} Wins</div>
                                    <div className="text-gray-400 text-xs">
                                        {player.battles} Battles
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
