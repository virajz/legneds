import type { Rarity } from "@/types/card";

export const rarityStyles: Record<
    Rarity,
    { border: string; bg: string; text: string }
> = {
    common: {
        border: "border-gray-600",
        bg: "bg-gray-900",
        text: "text-white",
    },
    uncommon: {
        border: "border-green-500",
        bg: "bg-green-950",
        text: "text-green-300",
    },
    rare: {
        border: "border-blue-500",
        bg: "bg-blue-950",
        text: "text-blue-300",
    },
    epic: {
        border: "border-purple-600",
        bg: "bg-purple-950",
        text: "text-purple-300",
    },
    legendary: {
        border: "border-yellow-400",
        bg: "bg-yellow-900",
        text: "text-yellow-300",
    },
    mythic: {
        border: "border-rose-500",
        bg: "bg-rose-950",
        text: "text-rose-300",
    },
};
