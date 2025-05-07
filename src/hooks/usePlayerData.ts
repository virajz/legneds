// src/hooks/usePlayerData.ts
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";

export function usePlayerData(playerId: string) {
    const [profile, setProfile] = useState<any>(null);
    const [battles, setBattles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!playerId) return;
        async function fetchData() {
            setLoading(true);
            const profileRef = doc(db, "players", playerId);
            const profileSnap = await getDoc(profileRef);
            if (profileSnap.exists()) {
                setProfile(profileSnap.data());
            }

            const battleRef = collection(db, "players", playerId, "battles");
            const q = query(battleRef, orderBy("date", "desc"), limit(5));
            const battleSnap = await getDocs(q);
            const history = battleSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setBattles(history);

            setLoading(false);
        }

        fetchData();
    }, [playerId]);

    return { profile, battles, loading };
}
