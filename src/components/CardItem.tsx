import { Card } from "@/types/card";

interface CardItemProps {
    card: Card;
    onToggleDeck?: (cardId: string) => void;
    deckFull?: boolean;
    actionLabel?: string;
    disabled?: boolean;
}

export default function CardItem({
    card,
    onToggleDeck,
    actionLabel,
    disabled,
}: CardItemProps) {
    const buttonLabel = actionLabel || (card.inDeck ? "Remove" : "Add to Deck");

    return (
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-lg font-semibold">{card.name}</h2>
                    <p className="text-xs text-gray-400 capitalize">{card.species}</p>
                </div>
                {onToggleDeck && (
                    <button
                        onClick={() => onToggleDeck(card.id)}
                        disabled={disabled}
                        className={`text-xs px-2 py-1 rounded cursor-pointer ${card.inDeck
                            ? "bg-red-600 hover:bg-red-500"
                            : "bg-indigo-600 hover:bg-indigo-500"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {buttonLabel}
                    </button>
                )}
            </div>

            <p className="text-sm text-gray-400 capitalize mb-2">
                Rarity: {card.rarity}
            </p>

            <div className="text-sm space-y-1">
                {Object.entries(card.stats).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between">
                        <span className="capitalize">{stat}</span>
                        <span>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
