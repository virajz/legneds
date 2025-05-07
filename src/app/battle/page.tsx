import BattleArena from "@/components/BattleArena";
import { sampleCards } from "@/data/sampleCards";

export default function BattlePage() {
    const deck = sampleCards.filter((c) => c.inDeck).slice(0, 5);

    return <BattleArena deck={deck} />;
}
