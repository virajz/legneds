"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, BookOpen, Sword, Trophy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const navItems = [
    { href: "/", icon: Home },
    { href: "/collection", icon: BookOpen },
    { href: "/battle", icon: Sword },
    { href: "/leaderboard", icon: Trophy },
];

export default function BottomNav() {
    const pathname = usePathname();
    const { user } = useAuth();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 flex justify-around items-center py-2 z-50">
            {navItems.map(({ href, icon: Icon }) => (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                        "flex flex-col py-4 items-center transition-colors",
                        pathname === href ? "text-yellow-400" : "text-gray-400 hover:text-white"
                    )}
                >
                    <Icon className="size-6" />
                </Link>
            ))}

            {user && (
                <Link
                    href="/profile"
                    className={cn(
                        "flex flex-col items-center transition-colors",
                        pathname === "/profile" ? "text-yellow-400" : "text-gray-400 hover:text-white"
                    )}
                >
                    <Image
                        src={user.photoURL || "/avatars/default.png"}
                        alt="Profile"
                        width={24}
                        height={24}
                        className="rounded-full border border-gray-600"
                    />
                </Link>
            )}
        </nav>
    );
}
