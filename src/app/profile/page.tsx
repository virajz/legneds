"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import RecentBattles from "@/components/RecentBattles";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [displayName, setDisplayName] = useState("");
    const [saving, setSaving] = useState(false);
    const [showHistory, setShowHistory] = useState(false);


    useEffect(() => {
        async function fetchAlias() {
            if (!user) return;

            const ref = doc(db, "players", user.uid);
            const snap = await getDoc(ref);

            if (snap.exists()) {
                const data = snap.data();
                setDisplayName(data.alias || user.displayName || user.email || "Unnamed");
            } else {
                // fallback if doc doesn't exist yet
                setDisplayName(user.displayName || user.email || "Unnamed");
            }
        }

        fetchAlias();
    }, [user]);

    const handleNameUpdate = async () => {
        if (!user || !displayName.trim()) return;

        setSaving(true);
        try {
            const ref = doc(db, "players", user.uid);
            await updateDoc(ref, { alias: displayName });
            toast.success("Alias updated");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update alias");
        }
        setSaving(false);
    };


    if (!user) {
        return <div className="p-4 text-white">You are not signed in.</div>;
    }

    return (
        <div className="p-4 space-y-6 pb-28">
            {/* Avatar & Name */}
            <div className="flex items-center gap-4">
                <Image
                    src={user.photoURL || "/avatars/default.png"}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-700"
                />
                <div>
                    <p className="text-white font-semibold text-lg">{user.email}</p>
                    <p className="text-sm text-gray-400">UID: {user.uid.slice(0, 10)}…</p>
                </div>
            </div>

            {/* Edit Display Name */}
            <div className="space-y-2">
                <label className="text-sm text-gray-400">Display Name</label>
                <input
                    type="text"
                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <button
                    onClick={handleNameUpdate}
                    className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-semibold mt-1 disabled:opacity-50"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Update Name"}
                </button>
            </div>

            {/* Level Up Reward */}
            <div className="mt-6 rounded-xl bg-gray-900 border border-gray-700 p-4 text-sm space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Level Progress</span>
                    <span className="text-xs text-gray-400">230 / 300 XP</span>
                </div>

                <div className="w-full h-2 bg-gray-800 rounded">
                    <div className="h-2 bg-indigo-500 rounded" style={{ width: "76%" }} />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                    Reach <span className="text-white font-semibold">Level 6</span> to unlock{" "}
                    <span className="text-yellow-400 font-semibold">+10 tokens</span>
                </p>
            </div>

            {/* Match History (simplified) */}
            <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-sm text-indigo-400 cursor-pointer hover:underline"
            >
                {showHistory ? "Hide Match History" : "View Match History"}
            </button>


            {showHistory && (
                <div className="">
                    <RecentBattles />
                </div>
            )}


            {/* Logout */}
            <button
                onClick={logout}
                className="text-red-400 hover:text-red-300 text-sm font-semibold flex cursor-pointer items-center gap-2 mt-4"
            >
                <LogOut className="w-4 h-4" />
                Log out
            </button>
        </div>
    );
}
