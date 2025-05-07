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
    name: string
    species: "orc" | "elf" | "human" | "golem" | "beast" | "undead" // we'll add more later
    rarity: Rarity
    level: number
    stats: CardStats
    inDeck: boolean
    imageUrl?: string
}
