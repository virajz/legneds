import "./globals.css";
import type { Metadata } from "next";
import BottomNav from "@/components/BottomNav";
import { Geologica } from "next/font/google";
import { Toaster } from "sonner";

const geologica = Geologica({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Fantasy Card Game",
    description: "A mobile-style card battle game",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={geologica.className}>
            <body className="bg-black text-white flex justify-center">
                <div className="w-full max-w-lg min-h-screen flex flex-col pb-16">
                    {children}
                    <Toaster
                        richColors
                        position="top-center"
                        closeButton
                        invert
                        duration={3000} // default for all toasts
                    />
                    <BottomNav />
                </div>
            </body>
        </html>
    );
}
