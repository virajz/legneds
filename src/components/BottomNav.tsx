"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Home,
    BookOpen,
    Sword,
    ShoppingCart,
    Trophy,
} from "lucide-react";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Collection", href: "/collection", icon: BookOpen },
    { name: "Battle", href: "/battle", icon: Sword },
    { name: "Shop", href: "/shop", icon: ShoppingCart },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 flex justify-around items-center py-2 z-50">
            {navItems.map(({ name, href, icon: Icon }) => (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                        "flex flex-col items-center text-xs transition-colors",
                        pathname === href ? "text-yellow-400" : "text-gray-400 hover:text-white"
                    )}
                >
                    <Icon className="w-5 h-5 mb-1" />
                    <span>{name}</span>
                </Link>
            ))}
        </nav>
    );
}
