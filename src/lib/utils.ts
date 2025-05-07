import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines Tailwind classes and resolves conflicts
export function cn(...inputs: any[]) {
    return twMerge(clsx(inputs));
}
