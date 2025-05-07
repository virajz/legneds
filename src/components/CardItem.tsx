"use client";

import { Card } from "@/types/card";
import { rarityStyles } from "@/lib/rarityStyles";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
    card: Card;
    onToggleDeck: (cardId: string) => void;
    deckFull: boolean;
}

const STAT_LABELS: Record<keyof Card["stats"], string> = {
    strength: "STR",
    agility: "AGI",
    intellect: "INT",
    defense: "DEF",
    charisma: "CHA",
    luck: "LCK",
};

export default function CardItem({ card, onToggleDeck, deckFull }: Props) {
    const { border, bg, text } = rarityStyles[card.rarity];

    return (
        <div className={cn("flex gap-4 p-4 rounded-lg border relative", border, bg)}>
            {/* Image */}
            <div>
                <Image
                    src={card.imageUrl || "/temp.png"}
                    alt={card.name}
                    width={48}
                    height={48}
                    className="rounded-md object-cover border border-gray-700 aspect-[3/4]"
                />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className={cn("capitalize text-xs font-medium", text)}>{card.rarity}</span>
                        <div className="font-bold text-white">{card.name}</div>
                    </div>
                    <div className="text-xs font-semibold text-white">Lvl {card.level}</div>
                </div>

                <div className="grid grid-cols-6 gap-x-4 gap-y-1 text-xs text-gray-300">
                    {Object.entries(card.stats)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([key, value]) => (
                            <div key={key} className="flex flex-col items-center">
                                <span className="uppercase">{STAT_LABELS[key as keyof Card["stats"]]}</span>
                                <span className={cn("font-bold text-lg", text)}>{value}</span>
                            </div>
                        ))}
                </div>

                <div className="absolute right-4 -top-4 -skew-x-2 flex justify-end items-center pt-2 text-sm">
                    <button
                        onClick={() => onToggleDeck(card.id)}
                        disabled={!card.inDeck && deckFull}
                        className={cn(
                            "px-4 py-1.5 -skew-x-8 rounded inset-ring-1 inset-ring-gray-800 cursor-pointer text-xs font-semibold",
                            card.inDeck
                                ? "bg-white hover:bg-gray-200 text-black"
                                : deckFull
                                    ? "bg-gray-700 inset-ring-gray-700 text-gray-400 cursor-not-allowed"
                                    : "bg-black hover:bg-gray-900 text-white"
                        )}
                    >
                        {card.inDeck ? "Remove" : "Add to Deck"}
                    </button>
                </div>
            </div>
        </div>
    );
}
