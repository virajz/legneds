'use client';

import Link from "next/link";
import { Sword, ShoppingCart, BookOpenCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import PlayerOverview from "@/components/PlayerOverview";
import DailyReward from "@/components/DailyReward";
import RecentBattles from "@/components/RecentBattles";

export default function HomePage() {
    const { user, login, loading } = useAuth();

    if (loading) {
        return <div className="p-4 text-white">Loading...</div>;
    }

    return (
        <div className="p-4 space-y-6 flex flex-col flex-1 pb-28">
            {/* Auth UI */}
            {!user ? (
                <div className="text-white text-sm">
                    <p className="mb-2">You are not signed in.</p>
                    <button
                        onClick={login}
                        className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold cursor-pointer hover:bg-yellow-300"
                    >
                        Sign in with Google
                    </button>
                </div>
            ) : (
                <>
                    <PlayerOverview />
                    <section className="space-y-4">
                        <Link
                            href="/battle"
                            className="flex items-center gap-2 px-4 justify-center bg-indigo-600 hover:bg-indigo-500 transition text-white text-center rounded-lg py-3 font-semibold cursor-pointer"
                        >
                            <Sword className="size-5" />
                            Enter Battle Arena
                        </Link>

                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                href="/collection"
                                className="flex items-center gap-2 px-4 justify-center bg-gray-800 hover:bg-gray-700 transition text-white text-center rounded-lg py-3 font-semibold cursor-pointer"
                            >
                                <BookOpenCheck className="size-5" />
                                Collection
                            </Link>
                            <Link
                                href="/shop"
                                className="flex items-center gap-2 px-4 justify-center bg-gray-800 hover:bg-gray-700 transition text-white text-center rounded-lg py-3 font-semibold cursor-pointer"
                            >
                                <ShoppingCart className="size-5" />
                                Visit Shop
                            </Link>
                        </div>
                    </section>

                    <DailyReward />
                    <RecentBattles />
                </>
            )}
        </div>
    );
}
