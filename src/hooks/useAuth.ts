"use client";

import { useEffect, useState } from "react";
import { auth, db, provider } from "@/lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const login = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await ensurePlayerDocument(user);
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    async function ensurePlayerDocument(user: User) {
        const ref = doc(db, "players", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
            await setDoc(ref, {
                email: user.email,
                photoURL: user.photoURL,
                alias: user.displayName || "Unnamed",
                level: 1,
                xp: 0,
                tokens: 10000,
            });
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return { user, loading, login, logout };
}
