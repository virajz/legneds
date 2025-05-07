import Link from "next/link";
import { Sword, ShoppingCart, BookOpenCheck } from "lucide-react";
import PlayerOverview from "@/components/PlayerOverview";
import DailyReward from "@/components/DailyReward";
import RecentBattles from "@/components/RecentBattles";

export default function HomePage() {
    return (
        <div className="p-4 space-y-6 flex flex-1 flex-col">
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

            <RecentBattles />
            <DailyReward />
        </div>
    );
}
