"use client";

import { useState } from "react";
import { sampleCards } from "@/data/sampleCards";
import { Card } from "@/types/card";
import { Box, Coins, Sparkles } from "lucide-react";
import CardItem from "@/components/CardItem";
import { toast } from "sonner";

const PACK_OPTIONS = [
    { type: "common", label: "Common Pack", cost: 10 },
    { type: "rare", label: "Rare Pack", cost: 25 },
    { type: "epic", label: "Epic Pack", cost: 50 },
];

export default function ShopPage() {
    const [tokens, setTokens] = useState(100);
    const [openedCards, setOpenedCards] = useState<Card[]>([]);

    const openPack = (type: string, cost: number) => {
        if (tokens < cost) {
            toast.error("Not enough tokens!", {
                icon: <Coins className="size-5" />,
            });
            return;
        }

        const available = sampleCards.filter((card) => {
            if (type === "common") return card.rarity === "common" || card.rarity === "uncommon";
            if (type === "rare") return card.rarity === "rare";
            if (type === "epic") return card.rarity === "epic" || card.rarity === "legendary";
            return false;
        });

        const randomPull = available.sort(() => 0.5 - Math.random()).slice(0, 1);
        setOpenedCards(randomPull);
        setTokens((prev) => prev - cost);
    };

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-display font-semibold">Shop</h1>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <Coins className="w-4 h-4" />
                    {tokens} Tokens
                </div>
            </div>

            <div className="space-y-4">
                {PACK_OPTIONS.map((pack) => (
                    <button
                        key={pack.type}
                        onClick={() => openPack(pack.type, pack.cost)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 flex justify-between items-center text-sm hover:bg-gray-700 cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <Box className="w-5 h-5 text-indigo-400" />
                            {pack.label}
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                            <Coins className="w-4 h-4" />
                            {pack.cost}
                        </div>
                    </button>
                ))}
            </div>

            {openedCards.length > 0 && (
                <div className="mt-6 space-y-2">
                    <h2 className="text-sm font-semibold flex items-center gap-2 text-indigo-300">
                        <Sparkles className="w-4 h-4" />
                        You received:
                    </h2>
                    {openedCards.map((card) => (
                        <CardItem key={card.id} card={card} />
                    ))}
                </div>
            )}
        </div>
    );
}
