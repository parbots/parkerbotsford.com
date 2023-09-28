import "@styles/reset.css";
import "@styles/global.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Parker Botsford",
    description: "Software developer and IT engineer.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={jetbrains.className}>{children}</body>
        </html>
    );
}
