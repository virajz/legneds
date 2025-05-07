"use client";

import { useBattleEngine } from "@/hooks/useBattleEngine";
import CardItem from "@/components/CardItem";

import { Card } from "@/types/card";
import { Trophy, XCircle, RefreshCcw, Equal } from "lucide-react";
import Link from "next/link";

export default function BattleArena({ deck }: { deck: Card[] }) {

    if (deck.length === 0) {
        return (
            <div className="p-4 text-center text-sm text-gray-400">
                No cards in your deck. Go to <strong>Collection</strong> to add cards.
                <Link href="/collection" className="text-indigo-400 underline text-sm mt-2 block">
                    Go to Collection
                </Link>
            </div>
        );
    }

    const {
        currentRound,
        statKeys,
        battleLog,
        usedCards,
        handlePlayCard,
        resetBattle,
        gameOver,
        result,
    } = useBattleEngine(deck);

    const ResultIcon =
        result === "win" ? Trophy : result === "lose" ? XCircle : Equal;

    const ResultText =
        result === "win"
            ? "You won the battle!"
            : result === "lose"
                ? "You lost the battle."
                : "It's a draw.";

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-display font-semibold text-center">Battle Arena</h1>

            {gameOver && (
                <div className="text-center text-lg font-semibold text-yellow-400 flex flex-col items-center gap-2">
                    <ResultIcon className="w-6 h-6" />
                    {ResultText}
                    <button
                        onClick={resetBattle}
                        className="px-4 py-1 bg-indigo-600 rounded cursor-pointer hover:bg-indigo-500 text-sm flex items-center gap-1"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Rematch
                    </button>
                </div>
            )}

            {!gameOver && (
                <>
                    <p className="text-center text-sm text-gray-400">Round {currentRound} / 3</p>
                    <p className="text-center text-sm mb-2">
                        Compare Stats:{" "}
                        <span className="font-bold text-indigo-400">{statKeys.join(", ")}</span>
                    </p>

                    <div className="space-y-2">
                        {deck.map((card) => (
                            <CardItem
                                key={card.id}
                                card={card}
                                onToggleDeck={() => handlePlayCard(card)}
                                deckFull={usedCards.includes(card.id)}
                                actionLabel="Play Card"
                                disabled={usedCards.includes(card.id)}
                            />
                        ))}
                    </div>
                </>
            )}

            <div className="mt-4 p-3 text-xs bg-gray-900 border border-gray-700 rounded">
                <h2 className="font-semibold text-sm mb-1">Battle Log:</h2>
                <pre className="whitespace-pre-wrap">{battleLog.join("\n")}</pre>
            </div>
        </div>
    );
}
