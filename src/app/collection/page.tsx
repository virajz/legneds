"use client";

import { useState } from "react";
import CardItem from "@/components/CardItem";
import { sampleCards } from "@/data/sampleCards";
import { Card } from "@/types/card";

export default function CollectionPage() {
    const [cards, setCards] = useState<Card[]>(sampleCards);
    const maxDeckSize = 5;
    const deckCount = cards.filter((card) => card.inDeck).length;

    const handleToggleDeck = (cardId: string) => {
        setCards((prev) =>
            prev.map((card) => {
                if (card.id !== cardId) return card;

                if (card.inDeck) {
                    return { ...card, inDeck: false };
                } else if (deckCount < maxDeckSize) {
                    return { ...card, inDeck: true };
                } else {
                    return card;
                }
            })
        );
    };

    return (
        <div className="flex flex-col h-[100dvh] overflow-hidden">
            <header className="px-4 pt-4 pb-2 bg-black">
                <h1 className="text-xl font-display font-semibold text-center mb-1">
                    My Card Collection
                </h1>
                <p className="text-center text-sm text-gray-400">
                    Deck: {deckCount} / {maxDeckSize}
                </p>
            </header>

            <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-4 bg-black">
                {cards.map((card) => (
                    <CardItem
                        key={card.id}
                        card={card}
                        onToggleDeck={handleToggleDeck}
                        deckFull={deckCount >= maxDeckSize && !card.inDeck}
                    />
                ))}
            </div>
        </div>
    );
}
