import { Card } from "@/types/card";
import { sampleCards } from "@/data/sampleCards";

export const ALL_STATS = [
    "strength",
    "agility",
    "intellect",
    "defense",
    "charisma",
    "luck",
] as const;

export type StatKey = (typeof ALL_STATS)[number];

export function getRandomStats(count: number): StatKey[] {
    return [...ALL_STATS].sort(() => 0.5 - Math.random()).slice(0, count);
}

export function getTotal(card: Card, keys: StatKey[]): number {
    return keys.reduce((acc, key) => acc + card.stats[key], 0);
}

export function generateRandomOpponent(): Card {
    const pool = sampleCards.filter((c) => !c.inDeck);
    return pool[Math.floor(Math.random() * pool.length)];
}
