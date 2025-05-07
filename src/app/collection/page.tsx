"use client";

import { sampleCards } from "@/data/sampleCards";
import CardItem from "@/components/CardItem";
import { useMemo, useState } from "react";
import { Card, Rarity } from "@/types/card";

export default function CollectionPage() {
    const [deck, setDeck] = useState<Card[]>(sampleCards.filter((c) => c.inDeck));
    const [search, setSearch] = useState("");
    const [rarityFilter, setRarityFilter] = useState<Rarity | "all">("all");

    const toggleCardInDeck = (id: string) => {
        const index = deck.findIndex((c) => c.id === id);
        if (index >= 0) {
            setDeck(deck.filter((c) => c.id !== id));
        } else if (deck.length < 5) {
            const card = sampleCards.find((c) => c.id === id);
            if (card) setDeck([...deck, card]);
        }
    };

    const cardsWithDeckStatus = useMemo(
        () =>
            sampleCards.map((card) => ({
                ...card,
                inDeck: deck.some((deckCard) => deckCard.id === card.id),
            })),
        [deck]
    );

    const filtered = cardsWithDeckStatus.filter((card) => {
        const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase());
        const matchesRarity = rarityFilter === "all" || card.rarity === rarityFilter;
        return matchesSearch && matchesRarity;
    });

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-display font-bold text-center">My Card Collection</h1>
            <p className="text-center text-gray-400 text-sm">Deck: {deck.length} / 5</p>

            {/* Filters */}
            <div className="flex gap-2 items-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name"
                    className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded-md text-white"
                />
                <select
                    value={rarityFilter}
                    onChange={(e) => setRarityFilter(e.target.value as Rarity | "all")}
                    className="px-2 py-2 text-sm bg-gray-800 border border-gray-600 rounded-md text-white"
                >
                    <option value="all">All</option>
                    <option value="common">Common</option>
                    <option value="uncommon">Uncommon</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
                    <option value="mythic">Mythic</option>
                </select>
            </div>

            {/* Cards */}
            <div className="space-y-6 pt-8 overflow-y-auto max-h-[calc(100vh-240px)] pb-24">
                {filtered.map((card) => (
                    <CardItem
                        key={card.id}
                        card={card}
                        onToggleDeck={toggleCardInDeck}
                        deckFull={deck.length >= 5}
                    />
                ))}

                {filtered.length === 0 && (
                    <p className="text-center text-gray-500">No cards match your search.</p>
                )}
            </div>
        </div>
    );
}
