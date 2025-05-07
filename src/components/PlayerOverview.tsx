"use client";

import Image from "next/image";
import { Coins, ShoppingCart } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { usePlayerData } from "@/hooks/usePlayerData";

export default function PlayerOverview() {
    const pathname = usePathname(); // ✅ always call
    const { user } = useAuth();     // ✅ always call
    const { profile, loading } = usePlayerData(user?.uid || ""); // ✅ always call with fallback

    if (!user) return null;
    if (loading) return <div className="text-white text-sm">Loading...</div>;

    const player = {
        name: profile?.alias || user.displayName || user.email || "Unnamed",
        avatar: user.photoURL || "/avatars/kaela.png",
        level: profile?.level ?? 1,
        tokens: profile?.tokens ?? 0,
    };

    const xp = {
        current: profile?.xp ?? 0,
        required: profile?.xpRequired ?? 300,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                {/* Left: Avatar + Info */}
                <div className="flex gap-3 items-center">
                    <Image
                        src={player.avatar}
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="rounded-full border border-gray-600 bg-gray-800"
                    />
                    <div className="flex flex-col">
                        <div className="text-white font-semibold leading-tight">{player.name}</div>
                        <div className="flex items-center gap-2 w-30">
                            <div className="text-xs text-gray-400 flex-shrink-0">
                                Level {player.level}
                            </div>
                            <Progress value={(xp.current / xp.required) * 100} small />
                        </div>
                    </div>
                </div>

                {/* Right: Tokens + Shop */}
                <div className="flex items-center gap-4 text-right text-sm text-gray-200">
                    <div className="text-yellow-400 font-semibold flex items-center gap-1">
                        <Coins className="size-4" /> {player.tokens}
                    </div>

                    <Link
                        href="/shop"
                        className={cn(
                            "flex flex-col items-center text-xs transition-colors",
                            pathname === "/shop"
                                ? "text-yellow-400"
                                : "text-gray-400 hover:text-white"
                        )}
                    >
                        <ShoppingCart className="size-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
