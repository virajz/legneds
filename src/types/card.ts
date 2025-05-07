import { Timestamp } from "firebase/firestore"

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic"

export interface CardStats {
    strength: number
    agility: number
    intellect: number
    defense: number
    charisma: number
    luck: number
}

export interface Card {
    id: string
    cardId: string // e.g., "orc-1" for Orc Warrior
    name: string
    species: "orc" | "elf" | "human" | "golem" | "beast" | "undead" // we'll add more later
    rarity: Rarity
    level: number
    stats: CardStats
    inDeck: boolean
    imageUrl?: string,
    createdAt?: Timestamp
}

export const MAX_LEVELS: Record<Rarity, number> = {
    common: 5,
    uncommon: 10,
    rare: 15,
    epic: 20,
    legendary: 25,
    mythic: 30,
};

export function getMaxLevel(rarity: Rarity): number {
    return MAX_LEVELS[rarity];
}
