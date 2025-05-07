import { useEffect, useState } from "react";
import { Card } from "@/types/card";
import {
    getRandomStats,
    getTotal,
    generateRandomOpponent,
} from "@/utils/battle";


const stats = ["strength", "agility", "intellect", "defense", "charisma", "luck"];

export function useBattleEngine(deck: Card[]) {
    const [usedCards, setUsedCards] = useState<string[]>([]);
    const [currentRound, setCurrentRound] = useState(1);
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [statKeys, setStatKeys] = useState<("strength" | "agility" | "intellect" | "defense" | "charisma" | "luck")[]>([]);
    const [opponentCard, setOpponentCard] = useState<Card | null>(null);
    const [playerWins, setPlayerWins] = useState(0);
    const [opponentWins, setOpponentWins] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setStatKeys(getRandomStats(2));
        setOpponentCard(generateRandomOpponent());
    }, []);

    const handlePlayCard = (card: Card) => {
        if (!opponentCard || usedCards.includes(card.id)) return;

        const playerTotal = getTotal(card, statKeys);
        const opponentTotal = getTotal(opponentCard, statKeys);

        const result = playerTotal > opponentTotal ? "Win" : playerTotal < opponentTotal ? "Lose" : "Draw";

        if (result === "Win") setPlayerWins((w) => w + 1);
        else if (result === "Lose") setOpponentWins((w) => w + 1);

        setBattleLog((prev) => [
            ...prev,
            `Round ${currentRound}: You played ${card.name} vs ${opponentCard.name}`,
            `Compared stats: ${statKeys.join(", ")}`,
            `Result: ${result}`,
            "",
        ]);

        setUsedCards((prev) => [...prev, card.id]);

        if (currentRound === 3) {
            setGameOver(true);
        } else {
            setCurrentRound((r) => r + 1);
            setStatKeys(getRandomStats(2));
        }
    };

    const resetBattle = () => {
        setUsedCards([]);
        setCurrentRound(1);
        setBattleLog([]);
        setStatKeys(getRandomStats(2));
        setOpponentCard(generateRandomOpponent());
        setPlayerWins(0);
        setOpponentWins(0);
        setGameOver(false);
    };

    const result = gameOver
        ? playerWins > opponentWins
            ? "win"
            : opponentWins > playerWins
                ? "lose"
                : "draw"
        : null;

    return {
        currentRound,
        statKeys,
        battleLog,
        usedCards,
        opponentCard,
        handlePlayCard,
        resetBattle,
        gameOver,
        result,
    };
}
