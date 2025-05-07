"use client";

interface BattleResult {
    id: string;
    opponent: string;
    result: "Win" | "Loss";
    score: string;
    date: string;
}

const mockHistory: BattleResult[] = [
    { id: "1", opponent: "Thorgar", result: "Win", score: "2-1", date: "Today" },
    { id: "2", opponent: "Elaria", result: "Loss", score: "1-2", date: "Yesterday" },
    { id: "3", opponent: "Zarith", result: "Win", score: "3-0", date: "2d ago" },
    { id: "4", opponent: "Kaela", result: "Loss", score: "0-2", date: "3d ago" },
    { id: "5", opponent: "BramBok", result: "Win", score: "2-0", date: "5d ago" },
];

export default function RecentBattles() {
    return (
        <div className="flex-1">
            <h2 className="text-white text-lg font-semibold mb-2">Recent Battles</h2>

            <div className="rounded-xl border border-gray-700 max-h-80 bg-gray-900 overflow-y-auto divide-y divide-gray-800">
                {mockHistory.map((match) => (
                    <div key={match.id} className="p-3 text-sm flex justify-between items-center">
                        <div>
                            <div className="font-medium text-white"><span className="font-light text-gray-400">vs</span> {match.opponent}</div>
                            <div className="text-xs text-gray-400">{match.date}</div>
                        </div>
                        <div className="text-right">
                            <div
                                className={`font-semibold ${match.result === "Win" ? "text-green-400" : "text-red-400"
                                    }`}
                            >
                                {match.result}
                            </div>
                            <div className="text-xs text-gray-300">Score: {match.score}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
