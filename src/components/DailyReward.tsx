"use client";

import { useState } from "react";
import { Gift } from "lucide-react";
import { toast } from "sonner";

export default function DailyReward() {
    const [hasClaimed, setHasClaimed] = useState(false);

    const handleClaim = () => {
        setHasClaimed(true);
        toast.success("You received 5 tokens!");
    };

    return (
        <div className="mt-6 p-3 rounded-xl bg-gray-900 border border-gray-700 text-sm flex justify-between items-center">
            <div className="flex items-center gap-2 text-white">
                <Gift className="w-4 h-4 text-yellow-400" />
                {hasClaimed ? (
                    <span className="text-gray-400">Reward claimed today</span>
                ) : (
                    <span>Claim your daily reward</span>
                )}
            </div>
            {!hasClaimed && (
                <button
                    onClick={handleClaim}
                    className="text-xs bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-1 rounded font-semibold cursor-pointer"
                >
                    Claim
                </button>
            )}
        </div>
    );
}
