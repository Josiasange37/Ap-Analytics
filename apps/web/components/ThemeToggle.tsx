"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/lib/store";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();

    // Sync theme with DOM
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return (
        <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
            <motion.div
                initial={false}
                animate={{
                    scale: theme === 'dark' ? 1 : 0,
                    opacity: theme === 'dark' ? 1 : 0,
                    rotate: theme === 'dark' ? 0 : 90
                }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                <Moon size={18} className="text-slate-100" />
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    scale: theme === 'light' ? 1 : 0,
                    opacity: theme === 'light' ? 1 : 0,
                    rotate: theme === 'light' ? 0 : -90
                }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                <Sun size={18} className="text-slate-600" />
            </motion.div>
        </button>
    );
}
