"use client";

import { cardTemplates } from "@/lib/cardTemplates";
import { db } from "@/lib/firebase"; // your firebase.ts with Firestore initialized
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function SeedPage() {
    const [done, setDone] = useState(false);

    const handleSeed = async () => {
        for (const card of cardTemplates) {
            const ref = doc(db, "cardTemplates", card.id);
            await setDoc(ref, {
                name: card.name,
                species: card.species,
                baseStats: card.baseStats,
            });
        }
        setDone(true);
    };

    return (
        <div className="p-4 text-white">
            <h1 className="text-xl font-bold">Seed Card Templates</h1>
            <button
                onClick={handleSeed}
                className="mt-4 px-4 py-2 bg-indigo-600 rounded"
            >
                Upload to Firestore
            </button>
            {done && <p className="mt-2 text-green-400">Done!</p>}
        </div>
    );
}
