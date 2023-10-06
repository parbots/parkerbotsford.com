"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="px-3 py-1 border-2 rounded-full border-solid border-black hover:text-white hover:bg-black dark:border-white dark:hover:text-black dark:hover:bg-white"
        >
            Toggle
        </button>
    );
};
